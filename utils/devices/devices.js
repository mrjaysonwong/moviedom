const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '500px', // general size
  tablet: '768px',
  laptop: '1200px', //adjusted general size
  laptopL: '1440px',
  desktop: '2560px',
  desktopL: '3840px',

  /* Portrait and Landscape */
  iPhoneMinWidth: '480px', //iPhone 4
  iPhoneMaxWidth: '500px', //iPhone 4

  tabletMinWidth: '1180px', //iPad Mini/Air
  tabletMaxWidth: '768px', //iPad Mini/Air
};

export const devices = {
  /* Mobile S */
  mobileSMinWidth: `(min-width: ${sizes.mobileS})`,
  mobileSMaxWidth: `(max-width: ${sizes.mobileS})`,

  /* iPhone 4 */
  iPhoneLandscape: `(min-width: ${sizes.iPhoneMinWidth}) and (max-width: ${sizes.iPhoneMaxWidth})`,

  /* iPad */
  tabletPortraitLandscape: `(min-width: ${sizes.tabletMinWidth}) and (max-width: ${sizes.tabletMaxWidth})`,

  /* Mobile M */
  mobileMMinWidth: `(min-width: ${sizes.mobileM})`,
  mobileMMaxWidth: `(max-width: ${sizes.mobileM})`,

  /* Mobile L */
  mobileLMinWidth: `(min-width: ${sizes.mobileL})`,
  mobileLMaxWidth: `(max-width: ${sizes.mobileL})`,

  /* Tablet */
  tabletMinWidth: `(min-width: ${sizes.tablet})`,
  tabletMaxWidth: `(max-width: ${sizes.tablet})`,

  /* Laptop */
  laptopMinWidth: `(min-width: ${sizes.laptop})`,
  laptopMaxWidth: `(max-width: ${sizes.laptop})`,

  /* Laptop L */
  laptopLMinWidth: `(min-width: ${sizes.laptopL})`,
  laptopLMaxWidth: `(max-width: ${sizes.laptopL})`,

  /* Desktop  */
  desktopMinWidth: `(min-width: ${sizes.desktop})`,
  desktopMaxWidth: `(max-width: ${sizes.desktop})`,
  
  /* Desktop L  */
  scrollScreen: `(max-width: ${sizes.desktopL})`, // opacity and fill
};
