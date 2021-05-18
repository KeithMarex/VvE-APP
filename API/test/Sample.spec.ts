import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests

// You could call this the test class
describe("SAMPLE unit test for requests",function(){

  // This is a single test
  it("should return json",function(done){

    // Making a get request to the api
    server
    .get("/ticket") // Get > uri
    .expect("Content-type",/json/) // Says content type
    .expect(200) // This is the HTTP response
    .end(function(err,res){ // This function has all the values that are passed
      // HTTP status should be 200
      should(res.status).equal(200);
      // Error is not in the body when there is none
      // Check if error doesn't exists (undefined)
      should(res.body.error).equal(false || undefined);
      done(); // End of test
    });
  });

  // This is a single test
  it("should add json",function(done){

    // Making a post request to the api
    server
    .post('/ticket')
    .send({title: "sample", description: "This is a sample"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      should(res.status).equal(200);
      should(res.body.error).equal(false || undefined);
      should(res.body.data).equal(30);
      done();
    });
  });

  });