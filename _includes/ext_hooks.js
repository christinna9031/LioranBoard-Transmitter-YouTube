function LBExtensionReceived(str) {
  let LioranBoardJSON;
  try {
    LioranBoardJSON = JSON.parse(str);
  } catch(e) {
    return console.log(e);
  }
  switch (LioranBoardJSON.datatype) {
    // datatype you specified.
    default:
      if (requestKeys.has(LioranBoardJSON.datatype)) {
        removeKey(LioranBoardJSON.datatype);
      } else {
        console.log(LioranBoardJSON, `Warning: Hook is missing. Extension ${LioranBoardJSON.datatype} seems to not be correctly installed.`);
      };
      break;
{% include ext_hooks/get_version.js %}
{% include ext_hooks/message_logging.js %}
//You hooks will be inserted here
/*INSERT PART 3*/
   }
}
