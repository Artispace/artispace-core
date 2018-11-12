//@flow

// getextension
const getextension = /\.[0-9a-z]+$/i;

export const getfileextensionfromname = (name: string): any =>
  name.match(getextension)[0];

export const resolveIconSvgImage = (icon: string): string => {
  switch (icon) {
    case ".docx":
      return "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/icons%2Fdoc.svg?alt=media&token=600795a8-0c56-45d7-babb-68131a6867b1";
    case ".pptx":
      return "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/icons%2Fppt.svg?alt=media&token=598e8986-fedb-4429-84af-984cf7a97dfd";
    case ".pdf":
      return "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/icons%2Fpdf.svg?alt=media&token=2ded3901-9ea4-4fad-b697-34ced1e21c23";
    default:
      return "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/icons%2Fdefault.svg?alt=media&token=01eca14a-e91c-4375-a72d-8b7dac95bb02";
  }
};
