const sizes = {
  // make breakpoint relative to broswser default font-size
  mobile: `375px`,
  tabPort: `768px`,
  tabLand: `1026`,
  bigDesktop: `1400`,
};

const mediaDevices = {
  mobile: `(min-width:${sizes.mobile})`,
  tabPort: `(min-width:${sizes.tabPort})`,
  tabLand: `(min-width:${sizes.tabLand})`,
  bigDesktop: `(min-width:${sizes.bigDesktop})`,
};

export default mediaDevices;
