import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests

describe("Ticket unit test for requests",function(){

  // This is a single test
  it("should return tickets of user",function(done){

    // Get request tickets for user
    server
    .get("/ticket")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      should(res.status).equal(200);
      done();
    });
  });

});