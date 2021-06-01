import supertest from 'supertest';
import should from 'should';
import { describe, it } from 'mocha';

// This is a reference to where the api is running
const server = supertest.agent("http://localhost:3000");

// Unit tests

describe("Ticket unit test for requests",function(){

  it("should return tickets of user",function(done){

    server
    .get("/ticket")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      should(res.status).equal(200);
      done();
    });
  });

  it("should return tickets of admin",function(done){

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