/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.proofs = (function() {

    /**
     * Namespace proofs.
     * @exports proofs
     * @namespace
     */
    var proofs = {};

    /**
     * HashOp enum.
     * @name proofs.HashOp
     * @enum {string}
     * @property {number} NO_HASH=0 NO_HASH value
     * @property {number} SHA256=1 SHA256 value
     * @property {number} SHA512=2 SHA512 value
     * @property {number} KECCAK=3 KECCAK value
     * @property {number} RIPEMD160=4 RIPEMD160 value
     * @property {number} BITCOIN=5 BITCOIN value
     */
    proofs.HashOp = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_HASH"] = 0;
        values[valuesById[1] = "SHA256"] = 1;
        values[valuesById[2] = "SHA512"] = 2;
        values[valuesById[3] = "KECCAK"] = 3;
        values[valuesById[4] = "RIPEMD160"] = 4;
        values[valuesById[5] = "BITCOIN"] = 5;
        return values;
    })();

    /**
     * LengthOp defines how to process the key and value of the LeafOp
     * to include length information. After encoding the length with the given
     * algorithm, the length will be prepended to the key and value bytes.
     * (Each one with it's own encoded length)
     * @name proofs.LengthOp
     * @enum {string}
     * @property {number} NO_PREFIX=0 NO_PREFIX value
     * @property {number} VAR_PROTO=1 VAR_PROTO value
     * @property {number} VAR_RLP=2 VAR_RLP value
     * @property {number} FIXED32_BIG=3 FIXED32_BIG value
     * @property {number} FIXED32_LITTLE=4 FIXED32_LITTLE value
     * @property {number} FIXED64_BIG=5 FIXED64_BIG value
     * @property {number} FIXED64_LITTLE=6 FIXED64_LITTLE value
     * @property {number} REQUIRE_32_BYTES=7 REQUIRE_32_BYTES value
     * @property {number} REQUIRE_64_BYTES=8 REQUIRE_64_BYTES value
     */
    proofs.LengthOp = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_PREFIX"] = 0;
        values[valuesById[1] = "VAR_PROTO"] = 1;
        values[valuesById[2] = "VAR_RLP"] = 2;
        values[valuesById[3] = "FIXED32_BIG"] = 3;
        values[valuesById[4] = "FIXED32_LITTLE"] = 4;
        values[valuesById[5] = "FIXED64_BIG"] = 5;
        values[valuesById[6] = "FIXED64_LITTLE"] = 6;
        values[valuesById[7] = "REQUIRE_32_BYTES"] = 7;
        values[valuesById[8] = "REQUIRE_64_BYTES"] = 8;
        return values;
    })();

    proofs.ExistenceProof = (function() {

        /**
         * Properties of an ExistenceProof.
         * @memberof proofs
         * @interface IExistenceProof
         * @property {Uint8Array|null} [key] ExistenceProof key
         * @property {Uint8Array|null} [value] ExistenceProof value
         * @property {proofs.ILeafOp|null} [leaf] ExistenceProof leaf
         * @property {Array.<proofs.IInnerOp>|null} [path] ExistenceProof path
         */

        /**
         * Constructs a new ExistenceProof.
         * @memberof proofs
         * @classdesc ExistenceProof takes a key and a value and a set of steps to perform on it.
         * The result of peforming all these steps will provide a "root hash", which can
         * be compared to the value in a header.
         * 
         * Since it is computationally infeasible to produce a hash collission for any of the used
         * cryptographic hash functions, if someone can provide a series of operations to transform
         * a given key and value into a root hash that matches some trusted root, these key and values
         * must be in the referenced merkle tree.
         * 
         * The only possible issue is maliablity in LeafOp, such as providing extra prefix data,
         * which should be controlled by a spec. Eg. with lengthOp as NONE,
         * prefix = FOO, key = BAR, value = CHOICE
         * and
         * prefix = F, key = OOBAR, value = CHOICE
         * would produce the same value.
         * 
         * With LengthOp this is tricker but not impossible. Which is why the "leafPrefixEqual" field
         * in the ProofSpec is valuable to prevent this mutability. And why all trees should
         * length-prefix the data before hashing it.
         * @implements IExistenceProof
         * @constructor
         * @param {proofs.IExistenceProof=} [properties] Properties to set
         */
        function ExistenceProof(properties) {
            this.path = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExistenceProof key.
         * @member {Uint8Array} key
         * @memberof proofs.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * ExistenceProof value.
         * @member {Uint8Array} value
         * @memberof proofs.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.value = $util.newBuffer([]);

        /**
         * ExistenceProof leaf.
         * @member {proofs.ILeafOp|null|undefined} leaf
         * @memberof proofs.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.leaf = null;

        /**
         * ExistenceProof path.
         * @member {Array.<proofs.IInnerOp>} path
         * @memberof proofs.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.path = $util.emptyArray;

        /**
         * Creates a new ExistenceProof instance using the specified properties.
         * @function create
         * @memberof proofs.ExistenceProof
         * @static
         * @param {proofs.IExistenceProof=} [properties] Properties to set
         * @returns {proofs.ExistenceProof} ExistenceProof instance
         */
        ExistenceProof.create = function create(properties) {
            return new ExistenceProof(properties);
        };

        /**
         * Encodes the specified ExistenceProof message. Does not implicitly {@link proofs.ExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof proofs.ExistenceProof
         * @static
         * @param {proofs.IExistenceProof} message ExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && message.hasOwnProperty("value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                $root.proofs.LeafOp.encode(message.leaf, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.path != null && message.path.length)
                for (var i = 0; i < message.path.length; ++i)
                    $root.proofs.InnerOp.encode(message.path[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ExistenceProof message, length delimited. Does not implicitly {@link proofs.ExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.ExistenceProof
         * @static
         * @param {proofs.IExistenceProof} message ExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.ExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.ExistenceProof} ExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.ExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.leaf = $root.proofs.LeafOp.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.path && message.path.length))
                        message.path = [];
                    message.path.push($root.proofs.InnerOp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.ExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.ExistenceProof} ExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExistenceProof message.
         * @function verify
         * @memberof proofs.ExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            if (message.leaf != null && message.hasOwnProperty("leaf")) {
                var error = $root.proofs.LeafOp.verify(message.leaf);
                if (error)
                    return "leaf." + error;
            }
            if (message.path != null && message.hasOwnProperty("path")) {
                if (!Array.isArray(message.path))
                    return "path: array expected";
                for (var i = 0; i < message.path.length; ++i) {
                    var error = $root.proofs.InnerOp.verify(message.path[i]);
                    if (error)
                        return "path." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.ExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.ExistenceProof} ExistenceProof
         */
        ExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.ExistenceProof)
                return object;
            var message = new $root.proofs.ExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length)
                    message.value = object.value;
            if (object.leaf != null) {
                if (typeof object.leaf !== "object")
                    throw TypeError(".proofs.ExistenceProof.leaf: object expected");
                message.leaf = $root.proofs.LeafOp.fromObject(object.leaf);
            }
            if (object.path) {
                if (!Array.isArray(object.path))
                    throw TypeError(".proofs.ExistenceProof.path: array expected");
                message.path = [];
                for (var i = 0; i < object.path.length; ++i) {
                    if (typeof object.path[i] !== "object")
                        throw TypeError(".proofs.ExistenceProof.path: object expected");
                    message.path[i] = $root.proofs.InnerOp.fromObject(object.path[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.ExistenceProof
         * @static
         * @param {proofs.ExistenceProof} message ExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.path = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
                object.leaf = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                object.leaf = $root.proofs.LeafOp.toObject(message.leaf, options);
            if (message.path && message.path.length) {
                object.path = [];
                for (var j = 0; j < message.path.length; ++j)
                    object.path[j] = $root.proofs.InnerOp.toObject(message.path[j], options);
            }
            return object;
        };

        /**
         * Converts this ExistenceProof to JSON.
         * @function toJSON
         * @memberof proofs.ExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExistenceProof;
    })();

    proofs.NonExistenceProof = (function() {

        /**
         * Properties of a NonExistenceProof.
         * @memberof proofs
         * @interface INonExistenceProof
         * @property {Uint8Array|null} [key] NonExistenceProof key
         * @property {proofs.IExistenceProof|null} [left] NonExistenceProof left
         * @property {proofs.IExistenceProof|null} [right] NonExistenceProof right
         */

        /**
         * Constructs a new NonExistenceProof.
         * @memberof proofs
         * @classdesc Represents a NonExistenceProof.
         * @implements INonExistenceProof
         * @constructor
         * @param {proofs.INonExistenceProof=} [properties] Properties to set
         */
        function NonExistenceProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NonExistenceProof key.
         * @member {Uint8Array} key
         * @memberof proofs.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * NonExistenceProof left.
         * @member {proofs.IExistenceProof|null|undefined} left
         * @memberof proofs.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.left = null;

        /**
         * NonExistenceProof right.
         * @member {proofs.IExistenceProof|null|undefined} right
         * @memberof proofs.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.right = null;

        /**
         * Creates a new NonExistenceProof instance using the specified properties.
         * @function create
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {proofs.INonExistenceProof=} [properties] Properties to set
         * @returns {proofs.NonExistenceProof} NonExistenceProof instance
         */
        NonExistenceProof.create = function create(properties) {
            return new NonExistenceProof(properties);
        };

        /**
         * Encodes the specified NonExistenceProof message. Does not implicitly {@link proofs.NonExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {proofs.INonExistenceProof} message NonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NonExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.left != null && message.hasOwnProperty("left"))
                $root.proofs.ExistenceProof.encode(message.left, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.right != null && message.hasOwnProperty("right"))
                $root.proofs.ExistenceProof.encode(message.right, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified NonExistenceProof message, length delimited. Does not implicitly {@link proofs.NonExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {proofs.INonExistenceProof} message NonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NonExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NonExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.NonExistenceProof} NonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NonExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.NonExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.left = $root.proofs.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.right = $root.proofs.ExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NonExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.NonExistenceProof} NonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NonExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NonExistenceProof message.
         * @function verify
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NonExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.left != null && message.hasOwnProperty("left")) {
                var error = $root.proofs.ExistenceProof.verify(message.left);
                if (error)
                    return "left." + error;
            }
            if (message.right != null && message.hasOwnProperty("right")) {
                var error = $root.proofs.ExistenceProof.verify(message.right);
                if (error)
                    return "right." + error;
            }
            return null;
        };

        /**
         * Creates a NonExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.NonExistenceProof} NonExistenceProof
         */
        NonExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.NonExistenceProof)
                return object;
            var message = new $root.proofs.NonExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.left != null) {
                if (typeof object.left !== "object")
                    throw TypeError(".proofs.NonExistenceProof.left: object expected");
                message.left = $root.proofs.ExistenceProof.fromObject(object.left);
            }
            if (object.right != null) {
                if (typeof object.right !== "object")
                    throw TypeError(".proofs.NonExistenceProof.right: object expected");
                message.right = $root.proofs.ExistenceProof.fromObject(object.right);
            }
            return message;
        };

        /**
         * Creates a plain object from a NonExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.NonExistenceProof
         * @static
         * @param {proofs.NonExistenceProof} message NonExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NonExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                object.left = null;
                object.right = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.left != null && message.hasOwnProperty("left"))
                object.left = $root.proofs.ExistenceProof.toObject(message.left, options);
            if (message.right != null && message.hasOwnProperty("right"))
                object.right = $root.proofs.ExistenceProof.toObject(message.right, options);
            return object;
        };

        /**
         * Converts this NonExistenceProof to JSON.
         * @function toJSON
         * @memberof proofs.NonExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NonExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NonExistenceProof;
    })();

    proofs.CommitmentProof = (function() {

        /**
         * Properties of a CommitmentProof.
         * @memberof proofs
         * @interface ICommitmentProof
         * @property {proofs.IExistenceProof|null} [exist] CommitmentProof exist
         * @property {proofs.INonExistenceProof|null} [nonexist] CommitmentProof nonexist
         * @property {proofs.IBatchProof|null} [batch] CommitmentProof batch
         */

        /**
         * Constructs a new CommitmentProof.
         * @memberof proofs
         * @classdesc Represents a CommitmentProof.
         * @implements ICommitmentProof
         * @constructor
         * @param {proofs.ICommitmentProof=} [properties] Properties to set
         */
        function CommitmentProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommitmentProof exist.
         * @member {proofs.IExistenceProof|null|undefined} exist
         * @memberof proofs.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.exist = null;

        /**
         * CommitmentProof nonexist.
         * @member {proofs.INonExistenceProof|null|undefined} nonexist
         * @memberof proofs.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.nonexist = null;

        /**
         * CommitmentProof batch.
         * @member {proofs.IBatchProof|null|undefined} batch
         * @memberof proofs.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.batch = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * CommitmentProof proof.
         * @member {"exist"|"nonexist"|"batch"|undefined} proof
         * @memberof proofs.CommitmentProof
         * @instance
         */
        Object.defineProperty(CommitmentProof.prototype, "proof", {
            get: $util.oneOfGetter($oneOfFields = ["exist", "nonexist", "batch"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CommitmentProof instance using the specified properties.
         * @function create
         * @memberof proofs.CommitmentProof
         * @static
         * @param {proofs.ICommitmentProof=} [properties] Properties to set
         * @returns {proofs.CommitmentProof} CommitmentProof instance
         */
        CommitmentProof.create = function create(properties) {
            return new CommitmentProof(properties);
        };

        /**
         * Encodes the specified CommitmentProof message. Does not implicitly {@link proofs.CommitmentProof.verify|verify} messages.
         * @function encode
         * @memberof proofs.CommitmentProof
         * @static
         * @param {proofs.ICommitmentProof} message CommitmentProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommitmentProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.exist != null && message.hasOwnProperty("exist"))
                $root.proofs.ExistenceProof.encode(message.exist, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.nonexist != null && message.hasOwnProperty("nonexist"))
                $root.proofs.NonExistenceProof.encode(message.nonexist, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.batch != null && message.hasOwnProperty("batch"))
                $root.proofs.BatchProof.encode(message.batch, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CommitmentProof message, length delimited. Does not implicitly {@link proofs.CommitmentProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.CommitmentProof
         * @static
         * @param {proofs.ICommitmentProof} message CommitmentProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommitmentProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommitmentProof message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.CommitmentProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.CommitmentProof} CommitmentProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommitmentProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.CommitmentProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.exist = $root.proofs.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = $root.proofs.NonExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.batch = $root.proofs.BatchProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommitmentProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.CommitmentProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.CommitmentProof} CommitmentProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommitmentProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommitmentProof message.
         * @function verify
         * @memberof proofs.CommitmentProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommitmentProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                properties.proof = 1;
                {
                    var error = $root.proofs.ExistenceProof.verify(message.exist);
                    if (error)
                        return "exist." + error;
                }
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.proofs.NonExistenceProof.verify(message.nonexist);
                    if (error)
                        return "nonexist." + error;
                }
            }
            if (message.batch != null && message.hasOwnProperty("batch")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.proofs.BatchProof.verify(message.batch);
                    if (error)
                        return "batch." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CommitmentProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.CommitmentProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.CommitmentProof} CommitmentProof
         */
        CommitmentProof.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.CommitmentProof)
                return object;
            var message = new $root.proofs.CommitmentProof();
            if (object.exist != null) {
                if (typeof object.exist !== "object")
                    throw TypeError(".proofs.CommitmentProof.exist: object expected");
                message.exist = $root.proofs.ExistenceProof.fromObject(object.exist);
            }
            if (object.nonexist != null) {
                if (typeof object.nonexist !== "object")
                    throw TypeError(".proofs.CommitmentProof.nonexist: object expected");
                message.nonexist = $root.proofs.NonExistenceProof.fromObject(object.nonexist);
            }
            if (object.batch != null) {
                if (typeof object.batch !== "object")
                    throw TypeError(".proofs.CommitmentProof.batch: object expected");
                message.batch = $root.proofs.BatchProof.fromObject(object.batch);
            }
            return message;
        };

        /**
         * Creates a plain object from a CommitmentProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.CommitmentProof
         * @static
         * @param {proofs.CommitmentProof} message CommitmentProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommitmentProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                object.exist = $root.proofs.ExistenceProof.toObject(message.exist, options);
                if (options.oneofs)
                    object.proof = "exist";
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                object.nonexist = $root.proofs.NonExistenceProof.toObject(message.nonexist, options);
                if (options.oneofs)
                    object.proof = "nonexist";
            }
            if (message.batch != null && message.hasOwnProperty("batch")) {
                object.batch = $root.proofs.BatchProof.toObject(message.batch, options);
                if (options.oneofs)
                    object.proof = "batch";
            }
            return object;
        };

        /**
         * Converts this CommitmentProof to JSON.
         * @function toJSON
         * @memberof proofs.CommitmentProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommitmentProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommitmentProof;
    })();

    proofs.BatchProof = (function() {

        /**
         * Properties of a BatchProof.
         * @memberof proofs
         * @interface IBatchProof
         * @property {Array.<proofs.ICommitmentProof>|null} [proofs] BatchProof proofs
         */

        /**
         * Constructs a new BatchProof.
         * @memberof proofs
         * @classdesc Represents a BatchProof.
         * @implements IBatchProof
         * @constructor
         * @param {proofs.IBatchProof=} [properties] Properties to set
         */
        function BatchProof(properties) {
            this.proofs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BatchProof proofs.
         * @member {Array.<proofs.ICommitmentProof>} proofs
         * @memberof proofs.BatchProof
         * @instance
         */
        BatchProof.prototype.proofs = $util.emptyArray;

        /**
         * Creates a new BatchProof instance using the specified properties.
         * @function create
         * @memberof proofs.BatchProof
         * @static
         * @param {proofs.IBatchProof=} [properties] Properties to set
         * @returns {proofs.BatchProof} BatchProof instance
         */
        BatchProof.create = function create(properties) {
            return new BatchProof(properties);
        };

        /**
         * Encodes the specified BatchProof message. Does not implicitly {@link proofs.BatchProof.verify|verify} messages.
         * @function encode
         * @memberof proofs.BatchProof
         * @static
         * @param {proofs.IBatchProof} message BatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.proofs != null && message.proofs.length)
                for (var i = 0; i < message.proofs.length; ++i)
                    $root.proofs.CommitmentProof.encode(message.proofs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BatchProof message, length delimited. Does not implicitly {@link proofs.BatchProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.BatchProof
         * @static
         * @param {proofs.IBatchProof} message BatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BatchProof message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.BatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.BatchProof} BatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.BatchProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.proofs && message.proofs.length))
                        message.proofs = [];
                    message.proofs.push($root.proofs.CommitmentProof.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BatchProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.BatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.BatchProof} BatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BatchProof message.
         * @function verify
         * @memberof proofs.BatchProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BatchProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.proofs != null && message.hasOwnProperty("proofs")) {
                if (!Array.isArray(message.proofs))
                    return "proofs: array expected";
                for (var i = 0; i < message.proofs.length; ++i) {
                    var error = $root.proofs.CommitmentProof.verify(message.proofs[i]);
                    if (error)
                        return "proofs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BatchProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.BatchProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.BatchProof} BatchProof
         */
        BatchProof.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.BatchProof)
                return object;
            var message = new $root.proofs.BatchProof();
            if (object.proofs) {
                if (!Array.isArray(object.proofs))
                    throw TypeError(".proofs.BatchProof.proofs: array expected");
                message.proofs = [];
                for (var i = 0; i < object.proofs.length; ++i) {
                    if (typeof object.proofs[i] !== "object")
                        throw TypeError(".proofs.BatchProof.proofs: object expected");
                    message.proofs[i] = $root.proofs.CommitmentProof.fromObject(object.proofs[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BatchProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.BatchProof
         * @static
         * @param {proofs.BatchProof} message BatchProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BatchProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.proofs = [];
            if (message.proofs && message.proofs.length) {
                object.proofs = [];
                for (var j = 0; j < message.proofs.length; ++j)
                    object.proofs[j] = $root.proofs.CommitmentProof.toObject(message.proofs[j], options);
            }
            return object;
        };

        /**
         * Converts this BatchProof to JSON.
         * @function toJSON
         * @memberof proofs.BatchProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BatchProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BatchProof;
    })();

    proofs.LeafOp = (function() {

        /**
         * Properties of a LeafOp.
         * @memberof proofs
         * @interface ILeafOp
         * @property {proofs.HashOp|null} [hash] LeafOp hash
         * @property {proofs.HashOp|null} [prehashKey] LeafOp prehashKey
         * @property {proofs.HashOp|null} [prehashValue] LeafOp prehashValue
         * @property {proofs.LengthOp|null} [length] LeafOp length
         * @property {Uint8Array|null} [prefix] LeafOp prefix
         */

        /**
         * Constructs a new LeafOp.
         * @memberof proofs
         * @classdesc LeafOp represents the raw key-value data we wish to prove, and
         * must be flexible to represent the internal transformation from
         * the original key-value pairs into the basis hash, for many existing
         * merkle trees.
         * 
         * key and value are passed in. So that the signature of this operation is:
         * leafOp(key, value) -> output
         * 
         * To process this, first prehash the keys and values if needed (ANY means no hash in this case):
         * hkey = prehashKey(key)
         * hvalue = prehashValue(value)
         * 
         * Then combine the bytes, and hash it
         * output = hash(prefix || length(hkey) || hkey || length(hvalue) || hvalue)
         * @implements ILeafOp
         * @constructor
         * @param {proofs.ILeafOp=} [properties] Properties to set
         */
        function LeafOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeafOp hash.
         * @member {proofs.HashOp} hash
         * @memberof proofs.LeafOp
         * @instance
         */
        LeafOp.prototype.hash = 0;

        /**
         * LeafOp prehashKey.
         * @member {proofs.HashOp} prehashKey
         * @memberof proofs.LeafOp
         * @instance
         */
        LeafOp.prototype.prehashKey = 0;

        /**
         * LeafOp prehashValue.
         * @member {proofs.HashOp} prehashValue
         * @memberof proofs.LeafOp
         * @instance
         */
        LeafOp.prototype.prehashValue = 0;

        /**
         * LeafOp length.
         * @member {proofs.LengthOp} length
         * @memberof proofs.LeafOp
         * @instance
         */
        LeafOp.prototype.length = 0;

        /**
         * LeafOp prefix.
         * @member {Uint8Array} prefix
         * @memberof proofs.LeafOp
         * @instance
         */
        LeafOp.prototype.prefix = $util.newBuffer([]);

        /**
         * Creates a new LeafOp instance using the specified properties.
         * @function create
         * @memberof proofs.LeafOp
         * @static
         * @param {proofs.ILeafOp=} [properties] Properties to set
         * @returns {proofs.LeafOp} LeafOp instance
         */
        LeafOp.create = function create(properties) {
            return new LeafOp(properties);
        };

        /**
         * Encodes the specified LeafOp message. Does not implicitly {@link proofs.LeafOp.verify|verify} messages.
         * @function encode
         * @memberof proofs.LeafOp
         * @static
         * @param {proofs.ILeafOp} message LeafOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeafOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hash);
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.prehashKey);
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.prehashValue);
            if (message.length != null && message.hasOwnProperty("length"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.length);
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.prefix);
            return writer;
        };

        /**
         * Encodes the specified LeafOp message, length delimited. Does not implicitly {@link proofs.LeafOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.LeafOp
         * @static
         * @param {proofs.ILeafOp} message LeafOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeafOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeafOp message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.LeafOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.LeafOp} LeafOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeafOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.LeafOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prehashKey = reader.int32();
                    break;
                case 3:
                    message.prehashValue = reader.int32();
                    break;
                case 4:
                    message.length = reader.int32();
                    break;
                case 5:
                    message.prefix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeafOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.LeafOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.LeafOp} LeafOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeafOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeafOp message.
         * @function verify
         * @memberof proofs.LeafOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeafOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                switch (message.hash) {
                default:
                    return "hash: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                switch (message.prehashKey) {
                default:
                    return "prehashKey: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                switch (message.prehashValue) {
                default:
                    return "prehashValue: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.length != null && message.hasOwnProperty("length"))
                switch (message.length) {
                default:
                    return "length: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            return null;
        };

        /**
         * Creates a LeafOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.LeafOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.LeafOp} LeafOp
         */
        LeafOp.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.LeafOp)
                return object;
            var message = new $root.proofs.LeafOp();
            switch (object.hash) {
            case "NO_HASH":
            case 0:
                message.hash = 0;
                break;
            case "SHA256":
            case 1:
                message.hash = 1;
                break;
            case "SHA512":
            case 2:
                message.hash = 2;
                break;
            case "KECCAK":
            case 3:
                message.hash = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.hash = 4;
                break;
            case "BITCOIN":
            case 5:
                message.hash = 5;
                break;
            }
            switch (object.prehashKey) {
            case "NO_HASH":
            case 0:
                message.prehashKey = 0;
                break;
            case "SHA256":
            case 1:
                message.prehashKey = 1;
                break;
            case "SHA512":
            case 2:
                message.prehashKey = 2;
                break;
            case "KECCAK":
            case 3:
                message.prehashKey = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.prehashKey = 4;
                break;
            case "BITCOIN":
            case 5:
                message.prehashKey = 5;
                break;
            }
            switch (object.prehashValue) {
            case "NO_HASH":
            case 0:
                message.prehashValue = 0;
                break;
            case "SHA256":
            case 1:
                message.prehashValue = 1;
                break;
            case "SHA512":
            case 2:
                message.prehashValue = 2;
                break;
            case "KECCAK":
            case 3:
                message.prehashValue = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.prehashValue = 4;
                break;
            case "BITCOIN":
            case 5:
                message.prehashValue = 5;
                break;
            }
            switch (object.length) {
            case "NO_PREFIX":
            case 0:
                message.length = 0;
                break;
            case "VAR_PROTO":
            case 1:
                message.length = 1;
                break;
            case "VAR_RLP":
            case 2:
                message.length = 2;
                break;
            case "FIXED32_BIG":
            case 3:
                message.length = 3;
                break;
            case "FIXED32_LITTLE":
            case 4:
                message.length = 4;
                break;
            case "FIXED64_BIG":
            case 5:
                message.length = 5;
                break;
            case "FIXED64_LITTLE":
            case 6:
                message.length = 6;
                break;
            case "REQUIRE_32_BYTES":
            case 7:
                message.length = 7;
                break;
            case "REQUIRE_64_BYTES":
            case 8:
                message.length = 8;
                break;
            }
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length)
                    message.prefix = object.prefix;
            return message;
        };

        /**
         * Creates a plain object from a LeafOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.LeafOp
         * @static
         * @param {proofs.LeafOp} message LeafOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeafOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hash = options.enums === String ? "NO_HASH" : 0;
                object.prehashKey = options.enums === String ? "NO_HASH" : 0;
                object.prehashValue = options.enums === String ? "NO_HASH" : 0;
                object.length = options.enums === String ? "NO_PREFIX" : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.enums === String ? $root.proofs.HashOp[message.hash] : message.hash;
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                object.prehashKey = options.enums === String ? $root.proofs.HashOp[message.prehashKey] : message.prehashKey;
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                object.prehashValue = options.enums === String ? $root.proofs.HashOp[message.prehashValue] : message.prehashValue;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = options.enums === String ? $root.proofs.LengthOp[message.length] : message.length;
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            return object;
        };

        /**
         * Converts this LeafOp to JSON.
         * @function toJSON
         * @memberof proofs.LeafOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeafOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeafOp;
    })();

    proofs.InnerOp = (function() {

        /**
         * Properties of an InnerOp.
         * @memberof proofs
         * @interface IInnerOp
         * @property {proofs.HashOp|null} [hash] InnerOp hash
         * @property {Uint8Array|null} [prefix] InnerOp prefix
         * @property {Uint8Array|null} [suffix] InnerOp suffix
         */

        /**
         * Constructs a new InnerOp.
         * @memberof proofs
         * @classdesc InnerOp represents a merkle-proof step that is not a leaf.
         * It represents concatenating two children and hashing them to provide the next result.
         * 
         * The result of the previous step is passed in, so the signature of this op is:
         * innerOp(child) -> output
         * 
         * The result of applying InnerOp should be:
         * output = op.hash(op.prefix || child || op.suffix)
         * 
         * where the || operator is concatenation of binary data,
         * and child is the result of hashing all the tree below this step.
         * 
         * Any special data, like prepending child with the length, or prepending the entire operation with
         * some value to differentiate from leaf nodes, should be included in prefix and suffix.
         * If either of prefix or suffix is empty, we just treat it as an empty string
         * @implements IInnerOp
         * @constructor
         * @param {proofs.IInnerOp=} [properties] Properties to set
         */
        function InnerOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InnerOp hash.
         * @member {proofs.HashOp} hash
         * @memberof proofs.InnerOp
         * @instance
         */
        InnerOp.prototype.hash = 0;

        /**
         * InnerOp prefix.
         * @member {Uint8Array} prefix
         * @memberof proofs.InnerOp
         * @instance
         */
        InnerOp.prototype.prefix = $util.newBuffer([]);

        /**
         * InnerOp suffix.
         * @member {Uint8Array} suffix
         * @memberof proofs.InnerOp
         * @instance
         */
        InnerOp.prototype.suffix = $util.newBuffer([]);

        /**
         * Creates a new InnerOp instance using the specified properties.
         * @function create
         * @memberof proofs.InnerOp
         * @static
         * @param {proofs.IInnerOp=} [properties] Properties to set
         * @returns {proofs.InnerOp} InnerOp instance
         */
        InnerOp.create = function create(properties) {
            return new InnerOp(properties);
        };

        /**
         * Encodes the specified InnerOp message. Does not implicitly {@link proofs.InnerOp.verify|verify} messages.
         * @function encode
         * @memberof proofs.InnerOp
         * @static
         * @param {proofs.IInnerOp} message InnerOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hash);
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.prefix);
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.suffix);
            return writer;
        };

        /**
         * Encodes the specified InnerOp message, length delimited. Does not implicitly {@link proofs.InnerOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.InnerOp
         * @static
         * @param {proofs.IInnerOp} message InnerOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InnerOp message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.InnerOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.InnerOp} InnerOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.InnerOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prefix = reader.bytes();
                    break;
                case 3:
                    message.suffix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InnerOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.InnerOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.InnerOp} InnerOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InnerOp message.
         * @function verify
         * @memberof proofs.InnerOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InnerOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                switch (message.hash) {
                default:
                    return "hash: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                if (!(message.suffix && typeof message.suffix.length === "number" || $util.isString(message.suffix)))
                    return "suffix: buffer expected";
            return null;
        };

        /**
         * Creates an InnerOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.InnerOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.InnerOp} InnerOp
         */
        InnerOp.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.InnerOp)
                return object;
            var message = new $root.proofs.InnerOp();
            switch (object.hash) {
            case "NO_HASH":
            case 0:
                message.hash = 0;
                break;
            case "SHA256":
            case 1:
                message.hash = 1;
                break;
            case "SHA512":
            case 2:
                message.hash = 2;
                break;
            case "KECCAK":
            case 3:
                message.hash = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.hash = 4;
                break;
            case "BITCOIN":
            case 5:
                message.hash = 5;
                break;
            }
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length)
                    message.prefix = object.prefix;
            if (object.suffix != null)
                if (typeof object.suffix === "string")
                    $util.base64.decode(object.suffix, message.suffix = $util.newBuffer($util.base64.length(object.suffix)), 0);
                else if (object.suffix.length)
                    message.suffix = object.suffix;
            return message;
        };

        /**
         * Creates a plain object from an InnerOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.InnerOp
         * @static
         * @param {proofs.InnerOp} message InnerOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InnerOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hash = options.enums === String ? "NO_HASH" : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
                if (options.bytes === String)
                    object.suffix = "";
                else {
                    object.suffix = [];
                    if (options.bytes !== Array)
                        object.suffix = $util.newBuffer(object.suffix);
                }
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.enums === String ? $root.proofs.HashOp[message.hash] : message.hash;
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                object.suffix = options.bytes === String ? $util.base64.encode(message.suffix, 0, message.suffix.length) : options.bytes === Array ? Array.prototype.slice.call(message.suffix) : message.suffix;
            return object;
        };

        /**
         * Converts this InnerOp to JSON.
         * @function toJSON
         * @memberof proofs.InnerOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InnerOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InnerOp;
    })();

    proofs.ProofSpec = (function() {

        /**
         * Properties of a ProofSpec.
         * @memberof proofs
         * @interface IProofSpec
         * @property {proofs.ILeafOp|null} [leafSpec] ProofSpec leafSpec
         * @property {proofs.IInnerSpec|null} [innerSpec] ProofSpec innerSpec
         */

        /**
         * Constructs a new ProofSpec.
         * @memberof proofs
         * @classdesc ProofSpec defines what the expected parameters are for a given proof type.
         * This can be stored in the client and used to validate any incoming proofs.
         * 
         * verify(ProofSpec, Proof) -> Proof | Error
         * 
         * As demonstrated in tests, if we don't fix the algorithm used to calculate the
         * LeafHash for a given tree, there are many possible key-value pairs that can
         * generate a given hash (by interpretting the preimage differently).
         * We need this for proper security, requires client knows a priori what
         * tree format server uses. But not in code, rather a configuration object.
         * @implements IProofSpec
         * @constructor
         * @param {proofs.IProofSpec=} [properties] Properties to set
         */
        function ProofSpec(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProofSpec leafSpec.
         * @member {proofs.ILeafOp|null|undefined} leafSpec
         * @memberof proofs.ProofSpec
         * @instance
         */
        ProofSpec.prototype.leafSpec = null;

        /**
         * ProofSpec innerSpec.
         * @member {proofs.IInnerSpec|null|undefined} innerSpec
         * @memberof proofs.ProofSpec
         * @instance
         */
        ProofSpec.prototype.innerSpec = null;

        /**
         * Creates a new ProofSpec instance using the specified properties.
         * @function create
         * @memberof proofs.ProofSpec
         * @static
         * @param {proofs.IProofSpec=} [properties] Properties to set
         * @returns {proofs.ProofSpec} ProofSpec instance
         */
        ProofSpec.create = function create(properties) {
            return new ProofSpec(properties);
        };

        /**
         * Encodes the specified ProofSpec message. Does not implicitly {@link proofs.ProofSpec.verify|verify} messages.
         * @function encode
         * @memberof proofs.ProofSpec
         * @static
         * @param {proofs.IProofSpec} message ProofSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProofSpec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec"))
                $root.proofs.LeafOp.encode(message.leafSpec, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec"))
                $root.proofs.InnerSpec.encode(message.innerSpec, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ProofSpec message, length delimited. Does not implicitly {@link proofs.ProofSpec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.ProofSpec
         * @static
         * @param {proofs.IProofSpec} message ProofSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProofSpec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ProofSpec message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.ProofSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.ProofSpec} ProofSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProofSpec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.ProofSpec();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.leafSpec = $root.proofs.LeafOp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.innerSpec = $root.proofs.InnerSpec.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ProofSpec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.ProofSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.ProofSpec} ProofSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProofSpec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ProofSpec message.
         * @function verify
         * @memberof proofs.ProofSpec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ProofSpec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec")) {
                var error = $root.proofs.LeafOp.verify(message.leafSpec);
                if (error)
                    return "leafSpec." + error;
            }
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec")) {
                var error = $root.proofs.InnerSpec.verify(message.innerSpec);
                if (error)
                    return "innerSpec." + error;
            }
            return null;
        };

        /**
         * Creates a ProofSpec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.ProofSpec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.ProofSpec} ProofSpec
         */
        ProofSpec.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.ProofSpec)
                return object;
            var message = new $root.proofs.ProofSpec();
            if (object.leafSpec != null) {
                if (typeof object.leafSpec !== "object")
                    throw TypeError(".proofs.ProofSpec.leafSpec: object expected");
                message.leafSpec = $root.proofs.LeafOp.fromObject(object.leafSpec);
            }
            if (object.innerSpec != null) {
                if (typeof object.innerSpec !== "object")
                    throw TypeError(".proofs.ProofSpec.innerSpec: object expected");
                message.innerSpec = $root.proofs.InnerSpec.fromObject(object.innerSpec);
            }
            return message;
        };

        /**
         * Creates a plain object from a ProofSpec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.ProofSpec
         * @static
         * @param {proofs.ProofSpec} message ProofSpec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProofSpec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.leafSpec = null;
                object.innerSpec = null;
            }
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec"))
                object.leafSpec = $root.proofs.LeafOp.toObject(message.leafSpec, options);
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec"))
                object.innerSpec = $root.proofs.InnerSpec.toObject(message.innerSpec, options);
            return object;
        };

        /**
         * Converts this ProofSpec to JSON.
         * @function toJSON
         * @memberof proofs.ProofSpec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProofSpec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ProofSpec;
    })();

    proofs.InnerSpec = (function() {

        /**
         * Properties of an InnerSpec.
         * @memberof proofs
         * @interface IInnerSpec
         * @property {Array.<number>|null} [childOrder] InnerSpec childOrder
         * @property {number|null} [childSize] InnerSpec childSize
         * @property {number|null} [minPrefixLength] InnerSpec minPrefixLength
         * @property {number|null} [maxPrefixLength] InnerSpec maxPrefixLength
         * @property {Uint8Array|null} [emptyChild] InnerSpec emptyChild
         */

        /**
         * Constructs a new InnerSpec.
         * @memberof proofs
         * @classdesc Represents an InnerSpec.
         * @implements IInnerSpec
         * @constructor
         * @param {proofs.IInnerSpec=} [properties] Properties to set
         */
        function InnerSpec(properties) {
            this.childOrder = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InnerSpec childOrder.
         * @member {Array.<number>} childOrder
         * @memberof proofs.InnerSpec
         * @instance
         */
        InnerSpec.prototype.childOrder = $util.emptyArray;

        /**
         * InnerSpec childSize.
         * @member {number} childSize
         * @memberof proofs.InnerSpec
         * @instance
         */
        InnerSpec.prototype.childSize = 0;

        /**
         * InnerSpec minPrefixLength.
         * @member {number} minPrefixLength
         * @memberof proofs.InnerSpec
         * @instance
         */
        InnerSpec.prototype.minPrefixLength = 0;

        /**
         * InnerSpec maxPrefixLength.
         * @member {number} maxPrefixLength
         * @memberof proofs.InnerSpec
         * @instance
         */
        InnerSpec.prototype.maxPrefixLength = 0;

        /**
         * InnerSpec emptyChild.
         * @member {Uint8Array} emptyChild
         * @memberof proofs.InnerSpec
         * @instance
         */
        InnerSpec.prototype.emptyChild = $util.newBuffer([]);

        /**
         * Creates a new InnerSpec instance using the specified properties.
         * @function create
         * @memberof proofs.InnerSpec
         * @static
         * @param {proofs.IInnerSpec=} [properties] Properties to set
         * @returns {proofs.InnerSpec} InnerSpec instance
         */
        InnerSpec.create = function create(properties) {
            return new InnerSpec(properties);
        };

        /**
         * Encodes the specified InnerSpec message. Does not implicitly {@link proofs.InnerSpec.verify|verify} messages.
         * @function encode
         * @memberof proofs.InnerSpec
         * @static
         * @param {proofs.IInnerSpec} message InnerSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerSpec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.childOrder != null && message.childOrder.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.childOrder.length; ++i)
                    writer.int32(message.childOrder[i]);
                writer.ldelim();
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.childSize);
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minPrefixLength);
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxPrefixLength);
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.emptyChild);
            return writer;
        };

        /**
         * Encodes the specified InnerSpec message, length delimited. Does not implicitly {@link proofs.InnerSpec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof proofs.InnerSpec
         * @static
         * @param {proofs.IInnerSpec} message InnerSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerSpec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InnerSpec message from the specified reader or buffer.
         * @function decode
         * @memberof proofs.InnerSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {proofs.InnerSpec} InnerSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerSpec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proofs.InnerSpec();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.childOrder && message.childOrder.length))
                        message.childOrder = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.childOrder.push(reader.int32());
                    } else
                        message.childOrder.push(reader.int32());
                    break;
                case 2:
                    message.childSize = reader.int32();
                    break;
                case 3:
                    message.minPrefixLength = reader.int32();
                    break;
                case 4:
                    message.maxPrefixLength = reader.int32();
                    break;
                case 5:
                    message.emptyChild = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InnerSpec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof proofs.InnerSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {proofs.InnerSpec} InnerSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerSpec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InnerSpec message.
         * @function verify
         * @memberof proofs.InnerSpec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InnerSpec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.childOrder != null && message.hasOwnProperty("childOrder")) {
                if (!Array.isArray(message.childOrder))
                    return "childOrder: array expected";
                for (var i = 0; i < message.childOrder.length; ++i)
                    if (!$util.isInteger(message.childOrder[i]))
                        return "childOrder: integer[] expected";
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                if (!$util.isInteger(message.childSize))
                    return "childSize: integer expected";
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                if (!$util.isInteger(message.minPrefixLength))
                    return "minPrefixLength: integer expected";
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                if (!$util.isInteger(message.maxPrefixLength))
                    return "maxPrefixLength: integer expected";
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                if (!(message.emptyChild && typeof message.emptyChild.length === "number" || $util.isString(message.emptyChild)))
                    return "emptyChild: buffer expected";
            return null;
        };

        /**
         * Creates an InnerSpec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof proofs.InnerSpec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {proofs.InnerSpec} InnerSpec
         */
        InnerSpec.fromObject = function fromObject(object) {
            if (object instanceof $root.proofs.InnerSpec)
                return object;
            var message = new $root.proofs.InnerSpec();
            if (object.childOrder) {
                if (!Array.isArray(object.childOrder))
                    throw TypeError(".proofs.InnerSpec.childOrder: array expected");
                message.childOrder = [];
                for (var i = 0; i < object.childOrder.length; ++i)
                    message.childOrder[i] = object.childOrder[i] | 0;
            }
            if (object.childSize != null)
                message.childSize = object.childSize | 0;
            if (object.minPrefixLength != null)
                message.minPrefixLength = object.minPrefixLength | 0;
            if (object.maxPrefixLength != null)
                message.maxPrefixLength = object.maxPrefixLength | 0;
            if (object.emptyChild != null)
                if (typeof object.emptyChild === "string")
                    $util.base64.decode(object.emptyChild, message.emptyChild = $util.newBuffer($util.base64.length(object.emptyChild)), 0);
                else if (object.emptyChild.length)
                    message.emptyChild = object.emptyChild;
            return message;
        };

        /**
         * Creates a plain object from an InnerSpec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof proofs.InnerSpec
         * @static
         * @param {proofs.InnerSpec} message InnerSpec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InnerSpec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.childOrder = [];
            if (options.defaults) {
                object.childSize = 0;
                object.minPrefixLength = 0;
                object.maxPrefixLength = 0;
                if (options.bytes === String)
                    object.emptyChild = "";
                else {
                    object.emptyChild = [];
                    if (options.bytes !== Array)
                        object.emptyChild = $util.newBuffer(object.emptyChild);
                }
            }
            if (message.childOrder && message.childOrder.length) {
                object.childOrder = [];
                for (var j = 0; j < message.childOrder.length; ++j)
                    object.childOrder[j] = message.childOrder[j];
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                object.childSize = message.childSize;
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                object.minPrefixLength = message.minPrefixLength;
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                object.maxPrefixLength = message.maxPrefixLength;
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                object.emptyChild = options.bytes === String ? $util.base64.encode(message.emptyChild, 0, message.emptyChild.length) : options.bytes === Array ? Array.prototype.slice.call(message.emptyChild) : message.emptyChild;
            return object;
        };

        /**
         * Converts this InnerSpec to JSON.
         * @function toJSON
         * @memberof proofs.InnerSpec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InnerSpec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InnerSpec;
    })();

    return proofs;
})();

module.exports = $root;
