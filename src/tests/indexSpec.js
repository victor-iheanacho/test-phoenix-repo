import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

chai.use(chaiHttp);
const { expect } = chai;

const endPoint = '/api/v1';

describe('GET /', () => {
  it('should show a welcome message for the home route', (done) => {
    chai.request(app)
      .get('/')
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET /', () => {
  it('should show a welcome message for the home route', (done) => {
    chai.request(app)
      .get(`${endPoint}`)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
