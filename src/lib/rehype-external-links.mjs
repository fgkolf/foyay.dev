const isExternal = (href, site) =>
  /^https?:\/\//.test(href) && new URL(href).origin !== new URL(site).origin;

export default function rehypeExternalLinks({ site }) {
  return (tree) => {
    const visit = (node) => {
      const href = node.properties?.href;
      if (node.tagName === "a" && typeof href === "string" && isExternal(href, site)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "nofollow"];
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
