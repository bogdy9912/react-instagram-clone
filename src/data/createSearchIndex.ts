const createSearchIndex = (username: string) => {
    const cleanUsername = new Set([
      ...username.split("."),
      ...username.split("-"),
      ...username.split("_"),
    ]);
  
    const searchableUsername = [...cleanUsername].join();
  
    const searchIndex = [];
  
    for (let i = 0; i < searchableUsername.length; ++i) {
      for (let j = i+1; j <= searchableUsername.length; ++j) {
        searchIndex.push(searchableUsername.substring(i, j).toLowerCase());
      }
    }
  
    return searchIndex;
  };


  export default createSearchIndex;