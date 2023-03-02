import path from "path";
import fs from "fs";

import { globSync } from "glob";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

import { sortByIndex } from "@/utils/array";
import type { Frontmatter } from "@/types/frontmatter";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "data");

export const getAllFrontmatter = (fromPath: string) => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = globSync(`${PATH}/**/*.mdx`);

  return paths.map((filePath) => {
    // Get page
    const source = fs.readFileSync(path.join(filePath), "utf8");
    // Get frontmatter data
    const { data } = matter(source);

    return {
      ...(data as Frontmatter), album: path.basename(filePath, ".mdx"),
    }
  }).sort(sortByIndex);
};

// Convert MDX data to Frontmatter type
export const getMdxByAlbum = async (basePath: string, album: string) => {
  const mdxPath = path.join(DATA_PATH, basePath, `${album}.mdx`);
  if (!fs.existsSync(mdxPath)) return;

  const source = fs.readFileSync(mdxPath, "utf8");
  // No idea how anything below this works
  const { frontmatter, code } = await bundleMDX({ source });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      album,
    } as Frontmatter,
    code,
  };
};