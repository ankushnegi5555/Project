import IVersionableDocument from '../versionable/IVersionableDocument';
export default interface IProductModel extends IVersionableDocument {
  originalId: string;
  name: string;
  price: number;
  description: string;
  company: string;
  availability: boolean;
}
