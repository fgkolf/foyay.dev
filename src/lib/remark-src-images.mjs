import path from "node:path";

// Astro treats "/"-prefixed markdown images as public/ files; making /src/ paths
// file-relative routes them through the image pipeline instead.
export function toRelativeImagePath(url, filePath, root) {
  if (!url.startsWith("/src/")) return url;
  const target = path.join(root, url);
  const relative = path
    .relative(path.dirname(filePath), target)
    .split(path.sep)
    .join("/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

export default function remarkSrcImages({ root }) {
  return (tree, file) => {
    if (!file.path) return;
    const visit = (node) => {
      if (node.type === "image") {
        node.url = toRelativeImagePath(node.url, file.path, root);
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
