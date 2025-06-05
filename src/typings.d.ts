// Allow TypeScript to import SCSS files
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// Declare CSS variable types
declare module 'csstype' {
  interface Properties {
    '--primary-color'?: string;
  }
}