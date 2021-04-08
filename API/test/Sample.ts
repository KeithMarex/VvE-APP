import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests

describe("SAMPLE unit test",function(){

    it("should return home page",function(done){

      // calling home page api
      server
      .get("/")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.error.should.equal(false);
        done();
      });
    });

  });