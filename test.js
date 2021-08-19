var assert = require('assert');
var QRLP = require('./index.js').QRLPROTO_SHA256;

var CURRENT_PROTOS = 31;

describe('QRLPROTO_SHA256', function() {
  describe('-> length', function() {
    it('should contain ' + CURRENT_PROTOS + ' hashes', function() {
      assert.equal(QRLP.length, CURRENT_PROTOS);
    });
    it('should not contain 0 hashes', function() {
      assert.notEqual(QRLP.length, 0);
    });
  });
  describe('-> structure', function() {
    var versions = 0;
    var protoSha256 = 0;
    var objectSha256 = 0;
    var memoryHash = 0;
    QRLP.forEach(function (element) {
      if (element.version.length > 0) {
        versions += 1;
      };
      if (element.protoSha256.length === 64) {
        protoSha256 += 1;
      };
      if (element.objectSha256.length === 64) {
        objectSha256 += 1;
      };
      if (element.memoryHash) {
        if (element.memoryHash.length === 64) {
          memoryHash +=1;
        }
      }
    });
    it('each element has a version string', function() {
      assert.equal(versions, CURRENT_PROTOS);
    });
    it('each element has a valid length proto SHA256 checksum', function() {
      assert.equal(protoSha256, CURRENT_PROTOS);
    });
    it('each element has a valid length object SHA256 checksum', function() {
      assert.equal(objectSha256, CURRENT_PROTOS);
    });
    it('each element has a valid length memoryhash SHA256 checksum', function() {
      assert.equal(memoryHash, 7);
    });
  });
});
