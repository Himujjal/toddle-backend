import { addUser, IUserDBDoc } from '../../src/models/User';

describe('test neDB User model', () => {
  it('should return a new doc after adding one', done => {
    addUser({ email: '', password: '', name: '' }, (error, document) => {
      const doc: IUserDBDoc = document as IUserDBDoc;
      expect(doc._id.length).toBeGreaterThan(0);
      expect(doc.email).toEqual('');
      expect(doc.password).toEqual('');
      expect(doc.name).toEqual('');

      done();
    });
  });
});
