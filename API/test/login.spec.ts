import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests
describe("Login unit test for requests",function(){

  // This is a single test
  it("should login user with tokens",function(done){

    // Making a post request to the api
    server
    .post("/login")
    .send({ email: 'test@test.com', password: 'test' })
    .expect("Content-type",/json/) // Says content type
    .expect(200)
    .end( function(err,res) {
      should(res.status).equal(200);
      should.exist(res.cookies['access-token']);
      should.exist(res.cookies['refresh-token']);
      done();
    });
  });

});