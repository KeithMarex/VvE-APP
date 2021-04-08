import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests

describe("SAMPLE unit test for requests",function(){

    it("should return nothgin",function(done){

      // Making a request to the api
      server
      .get("/ticket")
      .expect("Content-type",/json/)
      .expect(200) // This is the HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        should(res.status).equal(200);
        // Error key should be false.
        should(res.body.error).equal(false || undefined);
        done();
      });
    });

  });