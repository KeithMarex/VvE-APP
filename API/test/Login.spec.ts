import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests
describe("Login unit test for requests",function(){

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

  it("should not login user with incorrect email",function(done){

    // Making a post request to the api
    server
    .post("/login")
    .send({ email: 'norealemail', password: 'test' })
    .expect("Content-type",/json/) // Says content type
    .expect(500)
    .end( function(err,res) {
      should(res.status).equal(500);
      should.not.exist(res.cookies['access-token']);
      should.not.exist(res.cookies['refresh-token']);
      done();
    });
  });

  it("should not login user with incorrect password",function(done){

    // Making a post request to the api
    server
    .post("/login")
    .send({ email: 'test@test.com', password: 'wrongpassword' })
    .expect("Content-type",/json/) // Says content type
    .expect(401)
    .end( function(err,res) {
      should(res.status).equal(401);
      should.not.exist(res.cookies['access-token']);
      should.not.exist(res.cookies['refresh-token']);
      should.equal(res.message, 'Password incorrect')
      done();
    });
  });

});