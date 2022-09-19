export default function queryString(paramsObject) {
  const searchParams = new URLSearchParams();
  Object.keys(paramsObject).forEach((key) => {
    const value = paramsObject[key];
    // not undefined and not null, and if array not an empty array
    if (value !== undefined && value !== null && (value.constructor !== Array || value.length > 0)) {
      searchParams.append(key, paramsObject[key]);
    }
  });
  const query = searchParams.toString();
  return query === '' ? query : `?${query}`;
}
