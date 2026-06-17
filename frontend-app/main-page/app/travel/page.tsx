import { promises as fs } from "node:fs";
import path from "node:path";
import { type TravelPhoto, travelPhotos } from "@/data/portfolio";
import PhotographyGallery from "@/components/PhotographyGallery";
import SiteTopBar from "@/components/SiteTopBar";

const navItems = [{ label: "Photography", href: "/travel" }, { label: "Blog", href: "/blog" }];
const supportedImageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function normalizePath(value: string) {
  let next = value.trim().replace(/\\/g, "/");
  if (next.startsWith("/public/")) {
    next = next.replace(/^\/public\//, "/");
  }
  if (!next.startsWith("http://") && !next.startsWith("https://") && !next.startsWith("/")) {
    next = `/${next}`;
  }
  return next;
}

function makeImageLookupKey(value: string) {
  return normalizePath(value).toLowerCase();
}

function isRemoteSource(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

type PhotographyCatalogPhoto = TravelPhoto & {
  src: string;
};

function isPhotoLike(value: unknown): value is PhotographyCatalogPhoto {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.src === "string" &&
    item.src.trim().length > 0 &&
    typeof item.title === "string" &&
    typeof item.location === "string" &&
    typeof item.date === "string" &&
    typeof item.caption === "string"
  );
}

function getFallbackPhotoFromFileName(fileName: string): TravelPhoto {
  return {
    title: fileName.replace(path.extname(fileName), "").replace(/[-_]/g, " "),
    location: "Photography",
    date: "Untitled",
    caption: "Photograph from my travels.",
    src: `/images/${fileName}`
  };
}

async function loadPhotographyCatalog(): Promise<PhotographyCatalogPhoto[]> {
  const catalogPath = path.join(process.cwd(), "content", "photography.json");
  try {
    const fileData = await fs.readFile(catalogPath, "utf-8");
    const parsed = JSON.parse(fileData);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPhotoLike).map((item) => ({
      ...item,
      src: normalizePath(item.src)
    }));
  } catch {
    return [];
  }
}

async function loadLocalPhotographsWithMetadata(): Promise<TravelPhoto[]> {
  const [imageEntries, catalogEntries] = await Promise.all([
    fs.readdir(path.join(process.cwd(), "public", "images")),
    loadPhotographyCatalog()
  ]);

  const localImageSources = imageEntries
    .filter((name) => supportedImageExts.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `/images/${name}`);

  const localImageMap = new Map<string, string>();
  for (const src of localImageSources) {
    localImageMap.set(makeImageLookupKey(src), src);
  }

  const usedLocalSourceSet = new Set<string>();
  const photosFromCatalog = catalogEntries
    .map((item) => {
      const normalizedSource = normalizePath(item.src);
      const key = makeImageLookupKey(normalizedSource);
      const isRemote = isRemoteSource(normalizedSource);

      if (!isRemote && key.startsWith("/images/")) {
        const matchedLocalSource = localImageMap.get(key);
        if (matchedLocalSource) {
          usedLocalSourceSet.add(matchedLocalSource);
          return { ...item, src: matchedLocalSource };
        }
      }

      return { ...item, src: normalizedSource };
    })
    .filter((photo, index, allPhotos) => {
      const key = makeImageLookupKey(photo.src);
      return allPhotos.findIndex((entry) => makeImageLookupKey(entry.src) === key) === index;
    }) as TravelPhoto[];

  const fallbackLocalPhotos = localImageSources
    .filter((src) => !usedLocalSourceSet.has(src))
    .map((src) => getFallbackPhotoFromFileName(src.replace("/images/", "")));

  const combinedPhotos = [...photosFromCatalog, ...fallbackLocalPhotos];

  return combinedPhotos;
}

export default async function TravelPage() {
  const localPhotographs = await loadLocalPhotographsWithMetadata();
  const allPhotos: TravelPhoto[] = localPhotographs.length > 0 ? localPhotographs : travelPhotos;

  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={navItems} />

      <main id="top">
        <section className="section-shell">
          <p className="section-kicker">Photography</p>
          <h1>Photography</h1>
          <p className="section-lead">
            A small visual archive of places, details, and moments from my travels.
          </p>
          <PhotographyGallery photos={allPhotos} />
        </section>
      </main>
    </div>
  );
}
