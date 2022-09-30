const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '500px', //adjusted general size
  tablet: '768px',
  laptop: '1200px', //adjusted general size
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  mobileSMinWidth: `(min-width: ${sizes.mobileS})`,
  mobileSMaxWidth: `(max-width: ${sizes.mobileS})`,

  mobileMMinWidth: `(min-width: ${sizes.mobileM})`,
  mobileMMaxWidth: `(max-width: ${sizes.mobileM})`,

  mobileLMinWidth: `(min-width: ${sizes.mobileL})`,
  mobileLMaxWidth: `(max-width: ${sizes.mobileL})`,

  tabletMinWidth: `(min-width: ${sizes.tablet})`,
  tabletMaxWidth: `(max-width: ${sizes.tablet})`,

  laptopMinWidth: `(min-width: ${sizes.laptop})`,
  laptopMaxWidth: `(max-width: ${sizes.laptop})`,

  laptopLMinWidth: `(min-width: ${sizes.laptopL})`,
  laptopLMaxWidth: `(max-width: ${sizes.laptopL})`,

  desktopMinWidth: `(min-width: ${sizes.desktop})`,
  desktopMaxWidth: `(max-width: ${sizes.desktop})`,
};
