import 'dotenv/config'
import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/

// This is a reference to where the api is running
const server = supertest.agent(`http://localhost:${process.env.PORT}`);

// Unit tests

// You could call this the test class
describe("User unit test for requests",function(){

  // This is a single test
  it("should return an array of users from certain organization",function(done){

    server
    .get("/user")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      should(res.status).equal(200);
      should(res.body.error).equal(false || undefined);
      done();
    });
  });

  it("should return an user",function(done){

    server
    .get("/user/60a50b31747907c7fef56077")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      should(res.status).equal(200);
      should(res.body.error).equal(false || undefined);
      done();
    });
  });
  it("should login admin with tokens",function(done){

    // Making a post request to the api
    server
    .post("/login")
    .send({ email: 'admin@test.com', password: 'test' })
    .expect("Content-type",/json/) // Says content type
    .expect(200)
    .end( function(err,res) {
      should(res.status).equal(200);
      should.exist(res.cookies['access-token']);
      should.exist(res.cookies['refresh-token']);
      done();
    });
  });

    // This is a single test
  it("should return admin users from certain organization",function(done){

    server
    .get("/user/organization")
    .expect("Content-type",/json/)
    .expect(200) // This is the HTTP response
    .end(function(err,res){ // This function has all the values that are passed
      should(res.status).equal(200);
      should(res.body.error).equal(false || undefined);
      done(); // End of test
    });
  });


});