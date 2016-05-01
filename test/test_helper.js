const jsdom = require('jsdom');
const supertestChai = require('supertest-chai');
const chai = require('chai');

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

chai.should();
chai.use(supertestChai.httpAsserts);

global.document = doc;
global.window = win;
