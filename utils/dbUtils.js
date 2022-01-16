export const grpahCMSImageLoader = ({ src }) => src;

export const dataForTable = (row) => {
    // console.log(DN)
    return {
        ...row
    };
  }


//   export const dataForTable = (managedDN, commonName, resource, serverName, keyStoreLocation, csrLocation, endPointDependancy, validTo, environment, sfGroup,itServiceInstance, thumbPrint) => {
//     // console.log(DN)
//     return {
//         managedDN,
//         commonName,
//         resource,
//         serverName,
//         keyStoreLocation,
//         csrLocation,
//         endPointDependancy,
//         validTo,
//         environment,
//         sfGroup,
//         itServiceInstance,
//         thumbPrint
//     };
//   }