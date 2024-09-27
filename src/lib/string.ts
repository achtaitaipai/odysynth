export const camelCaseToTitleCase = (input: string) =>
  input
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

export const isStringNumber = (str:string)=>{
  
  return !isNaN(Number(str))
}