const URL = process.env.URL
export const grpahCMSImageLoader = ({ src }) => src;

export const dataForTable = (row) => {
    // console.log(DN)
    return {
        ...row
    };
  }

  export const getQuizes = async () => { 
    const res = await fetch(`${URL}/api/quizes/`)
    const data = await res.json()
    console.log({data})
    if (data.success) {
      return data.data
    }
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