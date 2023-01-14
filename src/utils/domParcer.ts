const parserHTMLFromString = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc;
};

export { parserHTMLFromString };
