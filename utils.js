export const grpahCMSImageLoader = ({ src }) => src;

export const dataForTable = (Server, DN, CN, KeyStore_Location, EP_Dependancy, Valid_Upto, Env, SF_Group, ITSI, Thumbprint) => {
    // console.log(DN)
    return {
      Server,
      DN,
      CN,
      KeyStore_Location,
      EP_Dependancy,
      Valid_Upto,
      Env,
      SF_Group,
      ITSI,
      Thumbprint
    };
  }