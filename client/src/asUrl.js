/**
 * Returns the given url/path appended to the rootUrl
 * In development: no root url
 * In production: root url is equivalent to env.production => VITE_API_BASE
 * @param {string} - the url of the resource you are looking for without a root url
 * @return {string} - complete url
 *
 * @example
 *
 *  addUrl("/api/user")
 *
 */
export default (url) => {
    const rootUrl = import.meta.env.VITE_API_BASE || "";
    console.log(rootUrl, url);
    return rootUrl + url;
};
