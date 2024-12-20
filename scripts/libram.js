"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
  return function() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __commonJS = function(cb, mod) {
  return function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
};
var __export = function(target, all2) {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = function(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  );
}, __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// kolmafia-polyfill.js
var kolmafia, console, init_kolmafia_polyfill = __esm({
  "kolmafia-polyfill.js": function() {
    "use strict";
    kolmafia = require("kolmafia"), console = {
      log: kolmafia.print
    };
  }
});

// node_modules/html-entities/lib/named-references.js
var require_named_references = __commonJS({
  "node_modules/html-entities/lib/named-references.js": function(exports2) {
    "use strict";
    init_kolmafia_polyfill();
    Object.defineProperty(exports2, "__esModule", {
      value: !0
    });
    exports2.bodyRegExps = {
      xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
      html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
      html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
    };
    exports2.namedReferences = {
      xml: {
        entities: {
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&apos;": "'",
          "&amp;": "&"
        },
        characters: {
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&apos;",
          "&": "&amp;"
        }
      },
      html4: {
        entities: {
          "&apos;": "'",
          "&nbsp": "\xA0",
          "&nbsp;": "\xA0",
          "&iexcl": "\xA1",
          "&iexcl;": "\xA1",
          "&cent": "\xA2",
          "&cent;": "\xA2",
          "&pound": "\xA3",
          "&pound;": "\xA3",
          "&curren": "\xA4",
          "&curren;": "\xA4",
          "&yen": "\xA5",
          "&yen;": "\xA5",
          "&brvbar": "\xA6",
          "&brvbar;": "\xA6",
          "&sect": "\xA7",
          "&sect;": "\xA7",
          "&uml": "\xA8",
          "&uml;": "\xA8",
          "&copy": "\xA9",
          "&copy;": "\xA9",
          "&ordf": "\xAA",
          "&ordf;": "\xAA",
          "&laquo": "\xAB",
          "&laquo;": "\xAB",
          "&not": "\xAC",
          "&not;": "\xAC",
          "&shy": "\xAD",
          "&shy;": "\xAD",
          "&reg": "\xAE",
          "&reg;": "\xAE",
          "&macr": "\xAF",
          "&macr;": "\xAF",
          "&deg": "\xB0",
          "&deg;": "\xB0",
          "&plusmn": "\xB1",
          "&plusmn;": "\xB1",
          "&sup2": "\xB2",
          "&sup2;": "\xB2",
          "&sup3": "\xB3",
          "&sup3;": "\xB3",
          "&acute": "\xB4",
          "&acute;": "\xB4",
          "&micro": "\xB5",
          "&micro;": "\xB5",
          "&para": "\xB6",
          "&para;": "\xB6",
          "&middot": "\xB7",
          "&middot;": "\xB7",
          "&cedil": "\xB8",
          "&cedil;": "\xB8",
          "&sup1": "\xB9",
          "&sup1;": "\xB9",
          "&ordm": "\xBA",
          "&ordm;": "\xBA",
          "&raquo": "\xBB",
          "&raquo;": "\xBB",
          "&frac14": "\xBC",
          "&frac14;": "\xBC",
          "&frac12": "\xBD",
          "&frac12;": "\xBD",
          "&frac34": "\xBE",
          "&frac34;": "\xBE",
          "&iquest": "\xBF",
          "&iquest;": "\xBF",
          "&Agrave": "\xC0",
          "&Agrave;": "\xC0",
          "&Aacute": "\xC1",
          "&Aacute;": "\xC1",
          "&Acirc": "\xC2",
          "&Acirc;": "\xC2",
          "&Atilde": "\xC3",
          "&Atilde;": "\xC3",
          "&Auml": "\xC4",
          "&Auml;": "\xC4",
          "&Aring": "\xC5",
          "&Aring;": "\xC5",
          "&AElig": "\xC6",
          "&AElig;": "\xC6",
          "&Ccedil": "\xC7",
          "&Ccedil;": "\xC7",
          "&Egrave": "\xC8",
          "&Egrave;": "\xC8",
          "&Eacute": "\xC9",
          "&Eacute;": "\xC9",
          "&Ecirc": "\xCA",
          "&Ecirc;": "\xCA",
          "&Euml": "\xCB",
          "&Euml;": "\xCB",
          "&Igrave": "\xCC",
          "&Igrave;": "\xCC",
          "&Iacute": "\xCD",
          "&Iacute;": "\xCD",
          "&Icirc": "\xCE",
          "&Icirc;": "\xCE",
          "&Iuml": "\xCF",
          "&Iuml;": "\xCF",
          "&ETH": "\xD0",
          "&ETH;": "\xD0",
          "&Ntilde": "\xD1",
          "&Ntilde;": "\xD1",
          "&Ograve": "\xD2",
          "&Ograve;": "\xD2",
          "&Oacute": "\xD3",
          "&Oacute;": "\xD3",
          "&Ocirc": "\xD4",
          "&Ocirc;": "\xD4",
          "&Otilde": "\xD5",
          "&Otilde;": "\xD5",
          "&Ouml": "\xD6",
          "&Ouml;": "\xD6",
          "&times": "\xD7",
          "&times;": "\xD7",
          "&Oslash": "\xD8",
          "&Oslash;": "\xD8",
          "&Ugrave": "\xD9",
          "&Ugrave;": "\xD9",
          "&Uacute": "\xDA",
          "&Uacute;": "\xDA",
          "&Ucirc": "\xDB",
          "&Ucirc;": "\xDB",
          "&Uuml": "\xDC",
          "&Uuml;": "\xDC",
          "&Yacute": "\xDD",
          "&Yacute;": "\xDD",
          "&THORN": "\xDE",
          "&THORN;": "\xDE",
          "&szlig": "\xDF",
          "&szlig;": "\xDF",
          "&agrave": "\xE0",
          "&agrave;": "\xE0",
          "&aacute": "\xE1",
          "&aacute;": "\xE1",
          "&acirc": "\xE2",
          "&acirc;": "\xE2",
          "&atilde": "\xE3",
          "&atilde;": "\xE3",
          "&auml": "\xE4",
          "&auml;": "\xE4",
          "&aring": "\xE5",
          "&aring;": "\xE5",
          "&aelig": "\xE6",
          "&aelig;": "\xE6",
          "&ccedil": "\xE7",
          "&ccedil;": "\xE7",
          "&egrave": "\xE8",
          "&egrave;": "\xE8",
          "&eacute": "\xE9",
          "&eacute;": "\xE9",
          "&ecirc": "\xEA",
          "&ecirc;": "\xEA",
          "&euml": "\xEB",
          "&euml;": "\xEB",
          "&igrave": "\xEC",
          "&igrave;": "\xEC",
          "&iacute": "\xED",
          "&iacute;": "\xED",
          "&icirc": "\xEE",
          "&icirc;": "\xEE",
          "&iuml": "\xEF",
          "&iuml;": "\xEF",
          "&eth": "\xF0",
          "&eth;": "\xF0",
          "&ntilde": "\xF1",
          "&ntilde;": "\xF1",
          "&ograve": "\xF2",
          "&ograve;": "\xF2",
          "&oacute": "\xF3",
          "&oacute;": "\xF3",
          "&ocirc": "\xF4",
          "&ocirc;": "\xF4",
          "&otilde": "\xF5",
          "&otilde;": "\xF5",
          "&ouml": "\xF6",
          "&ouml;": "\xF6",
          "&divide": "\xF7",
          "&divide;": "\xF7",
          "&oslash": "\xF8",
          "&oslash;": "\xF8",
          "&ugrave": "\xF9",
          "&ugrave;": "\xF9",
          "&uacute": "\xFA",
          "&uacute;": "\xFA",
          "&ucirc": "\xFB",
          "&ucirc;": "\xFB",
          "&uuml": "\xFC",
          "&uuml;": "\xFC",
          "&yacute": "\xFD",
          "&yacute;": "\xFD",
          "&thorn": "\xFE",
          "&thorn;": "\xFE",
          "&yuml": "\xFF",
          "&yuml;": "\xFF",
          "&quot": '"',
          "&quot;": '"',
          "&amp": "&",
          "&amp;": "&",
          "&lt": "<",
          "&lt;": "<",
          "&gt": ">",
          "&gt;": ">",
          "&OElig;": "\u0152",
          "&oelig;": "\u0153",
          "&Scaron;": "\u0160",
          "&scaron;": "\u0161",
          "&Yuml;": "\u0178",
          "&circ;": "\u02C6",
          "&tilde;": "\u02DC",
          "&ensp;": "\u2002",
          "&emsp;": "\u2003",
          "&thinsp;": "\u2009",
          "&zwnj;": "\u200C",
          "&zwj;": "\u200D",
          "&lrm;": "\u200E",
          "&rlm;": "\u200F",
          "&ndash;": "\u2013",
          "&mdash;": "\u2014",
          "&lsquo;": "\u2018",
          "&rsquo;": "\u2019",
          "&sbquo;": "\u201A",
          "&ldquo;": "\u201C",
          "&rdquo;": "\u201D",
          "&bdquo;": "\u201E",
          "&dagger;": "\u2020",
          "&Dagger;": "\u2021",
          "&permil;": "\u2030",
          "&lsaquo;": "\u2039",
          "&rsaquo;": "\u203A",
          "&euro;": "\u20AC",
          "&fnof;": "\u0192",
          "&Alpha;": "\u0391",
          "&Beta;": "\u0392",
          "&Gamma;": "\u0393",
          "&Delta;": "\u0394",
          "&Epsilon;": "\u0395",
          "&Zeta;": "\u0396",
          "&Eta;": "\u0397",
          "&Theta;": "\u0398",
          "&Iota;": "\u0399",
          "&Kappa;": "\u039A",
          "&Lambda;": "\u039B",
          "&Mu;": "\u039C",
          "&Nu;": "\u039D",
          "&Xi;": "\u039E",
          "&Omicron;": "\u039F",
          "&Pi;": "\u03A0",
          "&Rho;": "\u03A1",
          "&Sigma;": "\u03A3",
          "&Tau;": "\u03A4",
          "&Upsilon;": "\u03A5",
          "&Phi;": "\u03A6",
          "&Chi;": "\u03A7",
          "&Psi;": "\u03A8",
          "&Omega;": "\u03A9",
          "&alpha;": "\u03B1",
          "&beta;": "\u03B2",
          "&gamma;": "\u03B3",
          "&delta;": "\u03B4",
          "&epsilon;": "\u03B5",
          "&zeta;": "\u03B6",
          "&eta;": "\u03B7",
          "&theta;": "\u03B8",
          "&iota;": "\u03B9",
          "&kappa;": "\u03BA",
          "&lambda;": "\u03BB",
          "&mu;": "\u03BC",
          "&nu;": "\u03BD",
          "&xi;": "\u03BE",
          "&omicron;": "\u03BF",
          "&pi;": "\u03C0",
          "&rho;": "\u03C1",
          "&sigmaf;": "\u03C2",
          "&sigma;": "\u03C3",
          "&tau;": "\u03C4",
          "&upsilon;": "\u03C5",
          "&phi;": "\u03C6",
          "&chi;": "\u03C7",
          "&psi;": "\u03C8",
          "&omega;": "\u03C9",
          "&thetasym;": "\u03D1",
          "&upsih;": "\u03D2",
          "&piv;": "\u03D6",
          "&bull;": "\u2022",
          "&hellip;": "\u2026",
          "&prime;": "\u2032",
          "&Prime;": "\u2033",
          "&oline;": "\u203E",
          "&frasl;": "\u2044",
          "&weierp;": "\u2118",
          "&image;": "\u2111",
          "&real;": "\u211C",
          "&trade;": "\u2122",
          "&alefsym;": "\u2135",
          "&larr;": "\u2190",
          "&uarr;": "\u2191",
          "&rarr;": "\u2192",
          "&darr;": "\u2193",
          "&harr;": "\u2194",
          "&crarr;": "\u21B5",
          "&lArr;": "\u21D0",
          "&uArr;": "\u21D1",
          "&rArr;": "\u21D2",
          "&dArr;": "\u21D3",
          "&hArr;": "\u21D4",
          "&forall;": "\u2200",
          "&part;": "\u2202",
          "&exist;": "\u2203",
          "&empty;": "\u2205",
          "&nabla;": "\u2207",
          "&isin;": "\u2208",
          "&notin;": "\u2209",
          "&ni;": "\u220B",
          "&prod;": "\u220F",
          "&sum;": "\u2211",
          "&minus;": "\u2212",
          "&lowast;": "\u2217",
          "&radic;": "\u221A",
          "&prop;": "\u221D",
          "&infin;": "\u221E",
          "&ang;": "\u2220",
          "&and;": "\u2227",
          "&or;": "\u2228",
          "&cap;": "\u2229",
          "&cup;": "\u222A",
          "&int;": "\u222B",
          "&there4;": "\u2234",
          "&sim;": "\u223C",
          "&cong;": "\u2245",
          "&asymp;": "\u2248",
          "&ne;": "\u2260",
          "&equiv;": "\u2261",
          "&le;": "\u2264",
          "&ge;": "\u2265",
          "&sub;": "\u2282",
          "&sup;": "\u2283",
          "&nsub;": "\u2284",
          "&sube;": "\u2286",
          "&supe;": "\u2287",
          "&oplus;": "\u2295",
          "&otimes;": "\u2297",
          "&perp;": "\u22A5",
          "&sdot;": "\u22C5",
          "&lceil;": "\u2308",
          "&rceil;": "\u2309",
          "&lfloor;": "\u230A",
          "&rfloor;": "\u230B",
          "&lang;": "\u2329",
          "&rang;": "\u232A",
          "&loz;": "\u25CA",
          "&spades;": "\u2660",
          "&clubs;": "\u2663",
          "&hearts;": "\u2665",
          "&diams;": "\u2666"
        },
        characters: {
          "'": "&apos;",
          "\xA0": "&nbsp;",
          "\xA1": "&iexcl;",
          "\xA2": "&cent;",
          "\xA3": "&pound;",
          "\xA4": "&curren;",
          "\xA5": "&yen;",
          "\xA6": "&brvbar;",
          "\xA7": "&sect;",
          "\xA8": "&uml;",
          "\xA9": "&copy;",
          \u00AA: "&ordf;",
          "\xAB": "&laquo;",
          "\xAC": "&not;",
          "\xAD": "&shy;",
          "\xAE": "&reg;",
          "\xAF": "&macr;",
          "\xB0": "&deg;",
          "\xB1": "&plusmn;",
          "\xB2": "&sup2;",
          "\xB3": "&sup3;",
          "\xB4": "&acute;",
          \u00B5: "&micro;",
          "\xB6": "&para;",
          "\xB7": "&middot;",
          "\xB8": "&cedil;",
          "\xB9": "&sup1;",
          \u00BA: "&ordm;",
          "\xBB": "&raquo;",
          "\xBC": "&frac14;",
          "\xBD": "&frac12;",
          "\xBE": "&frac34;",
          "\xBF": "&iquest;",
          \u00C0: "&Agrave;",
          \u00C1: "&Aacute;",
          \u00C2: "&Acirc;",
          \u00C3: "&Atilde;",
          \u00C4: "&Auml;",
          \u00C5: "&Aring;",
          \u00C6: "&AElig;",
          \u00C7: "&Ccedil;",
          \u00C8: "&Egrave;",
          \u00C9: "&Eacute;",
          \u00CA: "&Ecirc;",
          \u00CB: "&Euml;",
          \u00CC: "&Igrave;",
          \u00CD: "&Iacute;",
          \u00CE: "&Icirc;",
          \u00CF: "&Iuml;",
          \u00D0: "&ETH;",
          \u00D1: "&Ntilde;",
          \u00D2: "&Ograve;",
          \u00D3: "&Oacute;",
          \u00D4: "&Ocirc;",
          \u00D5: "&Otilde;",
          \u00D6: "&Ouml;",
          "\xD7": "&times;",
          \u00D8: "&Oslash;",
          \u00D9: "&Ugrave;",
          \u00DA: "&Uacute;",
          \u00DB: "&Ucirc;",
          \u00DC: "&Uuml;",
          \u00DD: "&Yacute;",
          \u00DE: "&THORN;",
          \u00DF: "&szlig;",
          \u00E0: "&agrave;",
          \u00E1: "&aacute;",
          \u00E2: "&acirc;",
          \u00E3: "&atilde;",
          \u00E4: "&auml;",
          \u00E5: "&aring;",
          \u00E6: "&aelig;",
          \u00E7: "&ccedil;",
          \u00E8: "&egrave;",
          \u00E9: "&eacute;",
          \u00EA: "&ecirc;",
          \u00EB: "&euml;",
          \u00EC: "&igrave;",
          \u00ED: "&iacute;",
          \u00EE: "&icirc;",
          \u00EF: "&iuml;",
          \u00F0: "&eth;",
          \u00F1: "&ntilde;",
          \u00F2: "&ograve;",
          \u00F3: "&oacute;",
          \u00F4: "&ocirc;",
          \u00F5: "&otilde;",
          \u00F6: "&ouml;",
          "\xF7": "&divide;",
          \u00F8: "&oslash;",
          \u00F9: "&ugrave;",
          \u00FA: "&uacute;",
          \u00FB: "&ucirc;",
          \u00FC: "&uuml;",
          \u00FD: "&yacute;",
          \u00FE: "&thorn;",
          \u00FF: "&yuml;",
          '"': "&quot;",
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          \u0152: "&OElig;",
          \u0153: "&oelig;",
          \u0160: "&Scaron;",
          \u0161: "&scaron;",
          \u0178: "&Yuml;",
          "\u02C6": "&circ;",
          "\u02DC": "&tilde;",
          "\u2002": "&ensp;",
          "\u2003": "&emsp;",
          "\u2009": "&thinsp;",
          "\u200C": "&zwnj;",
          "\u200D": "&zwj;",
          "\u200E": "&lrm;",
          "\u200F": "&rlm;",
          "\u2013": "&ndash;",
          "\u2014": "&mdash;",
          "\u2018": "&lsquo;",
          "\u2019": "&rsquo;",
          "\u201A": "&sbquo;",
          "\u201C": "&ldquo;",
          "\u201D": "&rdquo;",
          "\u201E": "&bdquo;",
          "\u2020": "&dagger;",
          "\u2021": "&Dagger;",
          "\u2030": "&permil;",
          "\u2039": "&lsaquo;",
          "\u203A": "&rsaquo;",
          "\u20AC": "&euro;",
          \u0192: "&fnof;",
          \u0391: "&Alpha;",
          \u0392: "&Beta;",
          \u0393: "&Gamma;",
          \u0394: "&Delta;",
          \u0395: "&Epsilon;",
          \u0396: "&Zeta;",
          \u0397: "&Eta;",
          \u0398: "&Theta;",
          \u0399: "&Iota;",
          \u039A: "&Kappa;",
          \u039B: "&Lambda;",
          \u039C: "&Mu;",
          \u039D: "&Nu;",
          \u039E: "&Xi;",
          \u039F: "&Omicron;",
          \u03A0: "&Pi;",
          \u03A1: "&Rho;",
          \u03A3: "&Sigma;",
          \u03A4: "&Tau;",
          \u03A5: "&Upsilon;",
          \u03A6: "&Phi;",
          \u03A7: "&Chi;",
          \u03A8: "&Psi;",
          \u03A9: "&Omega;",
          \u03B1: "&alpha;",
          \u03B2: "&beta;",
          \u03B3: "&gamma;",
          \u03B4: "&delta;",
          \u03B5: "&epsilon;",
          \u03B6: "&zeta;",
          \u03B7: "&eta;",
          \u03B8: "&theta;",
          \u03B9: "&iota;",
          \u03BA: "&kappa;",
          \u03BB: "&lambda;",
          \u03BC: "&mu;",
          \u03BD: "&nu;",
          \u03BE: "&xi;",
          \u03BF: "&omicron;",
          \u03C0: "&pi;",
          \u03C1: "&rho;",
          \u03C2: "&sigmaf;",
          \u03C3: "&sigma;",
          \u03C4: "&tau;",
          \u03C5: "&upsilon;",
          \u03C6: "&phi;",
          \u03C7: "&chi;",
          \u03C8: "&psi;",
          \u03C9: "&omega;",
          \u03D1: "&thetasym;",
          \u03D2: "&upsih;",
          \u03D6: "&piv;",
          "\u2022": "&bull;",
          "\u2026": "&hellip;",
          "\u2032": "&prime;",
          "\u2033": "&Prime;",
          "\u203E": "&oline;",
          "\u2044": "&frasl;",
          "\u2118": "&weierp;",
          \u2111: "&image;",
          \u211C: "&real;",
          "\u2122": "&trade;",
          \u2135: "&alefsym;",
          "\u2190": "&larr;",
          "\u2191": "&uarr;",
          "\u2192": "&rarr;",
          "\u2193": "&darr;",
          "\u2194": "&harr;",
          "\u21B5": "&crarr;",
          "\u21D0": "&lArr;",
          "\u21D1": "&uArr;",
          "\u21D2": "&rArr;",
          "\u21D3": "&dArr;",
          "\u21D4": "&hArr;",
          "\u2200": "&forall;",
          "\u2202": "&part;",
          "\u2203": "&exist;",
          "\u2205": "&empty;",
          "\u2207": "&nabla;",
          "\u2208": "&isin;",
          "\u2209": "&notin;",
          "\u220B": "&ni;",
          "\u220F": "&prod;",
          "\u2211": "&sum;",
          "\u2212": "&minus;",
          "\u2217": "&lowast;",
          "\u221A": "&radic;",
          "\u221D": "&prop;",
          "\u221E": "&infin;",
          "\u2220": "&ang;",
          "\u2227": "&and;",
          "\u2228": "&or;",
          "\u2229": "&cap;",
          "\u222A": "&cup;",
          "\u222B": "&int;",
          "\u2234": "&there4;",
          "\u223C": "&sim;",
          "\u2245": "&cong;",
          "\u2248": "&asymp;",
          "\u2260": "&ne;",
          "\u2261": "&equiv;",
          "\u2264": "&le;",
          "\u2265": "&ge;",
          "\u2282": "&sub;",
          "\u2283": "&sup;",
          "\u2284": "&nsub;",
          "\u2286": "&sube;",
          "\u2287": "&supe;",
          "\u2295": "&oplus;",
          "\u2297": "&otimes;",
          "\u22A5": "&perp;",
          "\u22C5": "&sdot;",
          "\u2308": "&lceil;",
          "\u2309": "&rceil;",
          "\u230A": "&lfloor;",
          "\u230B": "&rfloor;",
          "\u2329": "&lang;",
          "\u232A": "&rang;",
          "\u25CA": "&loz;",
          "\u2660": "&spades;",
          "\u2663": "&clubs;",
          "\u2665": "&hearts;",
          "\u2666": "&diams;"
        }
      },
      html5: {
        entities: {
          "&AElig": "\xC6",
          "&AElig;": "\xC6",
          "&AMP": "&",
          "&AMP;": "&",
          "&Aacute": "\xC1",
          "&Aacute;": "\xC1",
          "&Abreve;": "\u0102",
          "&Acirc": "\xC2",
          "&Acirc;": "\xC2",
          "&Acy;": "\u0410",
          "&Afr;": "\uD835\uDD04",
          "&Agrave": "\xC0",
          "&Agrave;": "\xC0",
          "&Alpha;": "\u0391",
          "&Amacr;": "\u0100",
          "&And;": "\u2A53",
          "&Aogon;": "\u0104",
          "&Aopf;": "\uD835\uDD38",
          "&ApplyFunction;": "\u2061",
          "&Aring": "\xC5",
          "&Aring;": "\xC5",
          "&Ascr;": "\uD835\uDC9C",
          "&Assign;": "\u2254",
          "&Atilde": "\xC3",
          "&Atilde;": "\xC3",
          "&Auml": "\xC4",
          "&Auml;": "\xC4",
          "&Backslash;": "\u2216",
          "&Barv;": "\u2AE7",
          "&Barwed;": "\u2306",
          "&Bcy;": "\u0411",
          "&Because;": "\u2235",
          "&Bernoullis;": "\u212C",
          "&Beta;": "\u0392",
          "&Bfr;": "\uD835\uDD05",
          "&Bopf;": "\uD835\uDD39",
          "&Breve;": "\u02D8",
          "&Bscr;": "\u212C",
          "&Bumpeq;": "\u224E",
          "&CHcy;": "\u0427",
          "&COPY": "\xA9",
          "&COPY;": "\xA9",
          "&Cacute;": "\u0106",
          "&Cap;": "\u22D2",
          "&CapitalDifferentialD;": "\u2145",
          "&Cayleys;": "\u212D",
          "&Ccaron;": "\u010C",
          "&Ccedil": "\xC7",
          "&Ccedil;": "\xC7",
          "&Ccirc;": "\u0108",
          "&Cconint;": "\u2230",
          "&Cdot;": "\u010A",
          "&Cedilla;": "\xB8",
          "&CenterDot;": "\xB7",
          "&Cfr;": "\u212D",
          "&Chi;": "\u03A7",
          "&CircleDot;": "\u2299",
          "&CircleMinus;": "\u2296",
          "&CirclePlus;": "\u2295",
          "&CircleTimes;": "\u2297",
          "&ClockwiseContourIntegral;": "\u2232",
          "&CloseCurlyDoubleQuote;": "\u201D",
          "&CloseCurlyQuote;": "\u2019",
          "&Colon;": "\u2237",
          "&Colone;": "\u2A74",
          "&Congruent;": "\u2261",
          "&Conint;": "\u222F",
          "&ContourIntegral;": "\u222E",
          "&Copf;": "\u2102",
          "&Coproduct;": "\u2210",
          "&CounterClockwiseContourIntegral;": "\u2233",
          "&Cross;": "\u2A2F",
          "&Cscr;": "\uD835\uDC9E",
          "&Cup;": "\u22D3",
          "&CupCap;": "\u224D",
          "&DD;": "\u2145",
          "&DDotrahd;": "\u2911",
          "&DJcy;": "\u0402",
          "&DScy;": "\u0405",
          "&DZcy;": "\u040F",
          "&Dagger;": "\u2021",
          "&Darr;": "\u21A1",
          "&Dashv;": "\u2AE4",
          "&Dcaron;": "\u010E",
          "&Dcy;": "\u0414",
          "&Del;": "\u2207",
          "&Delta;": "\u0394",
          "&Dfr;": "\uD835\uDD07",
          "&DiacriticalAcute;": "\xB4",
          "&DiacriticalDot;": "\u02D9",
          "&DiacriticalDoubleAcute;": "\u02DD",
          "&DiacriticalGrave;": "`",
          "&DiacriticalTilde;": "\u02DC",
          "&Diamond;": "\u22C4",
          "&DifferentialD;": "\u2146",
          "&Dopf;": "\uD835\uDD3B",
          "&Dot;": "\xA8",
          "&DotDot;": "\u20DC",
          "&DotEqual;": "\u2250",
          "&DoubleContourIntegral;": "\u222F",
          "&DoubleDot;": "\xA8",
          "&DoubleDownArrow;": "\u21D3",
          "&DoubleLeftArrow;": "\u21D0",
          "&DoubleLeftRightArrow;": "\u21D4",
          "&DoubleLeftTee;": "\u2AE4",
          "&DoubleLongLeftArrow;": "\u27F8",
          "&DoubleLongLeftRightArrow;": "\u27FA",
          "&DoubleLongRightArrow;": "\u27F9",
          "&DoubleRightArrow;": "\u21D2",
          "&DoubleRightTee;": "\u22A8",
          "&DoubleUpArrow;": "\u21D1",
          "&DoubleUpDownArrow;": "\u21D5",
          "&DoubleVerticalBar;": "\u2225",
          "&DownArrow;": "\u2193",
          "&DownArrowBar;": "\u2913",
          "&DownArrowUpArrow;": "\u21F5",
          "&DownBreve;": "\u0311",
          "&DownLeftRightVector;": "\u2950",
          "&DownLeftTeeVector;": "\u295E",
          "&DownLeftVector;": "\u21BD",
          "&DownLeftVectorBar;": "\u2956",
          "&DownRightTeeVector;": "\u295F",
          "&DownRightVector;": "\u21C1",
          "&DownRightVectorBar;": "\u2957",
          "&DownTee;": "\u22A4",
          "&DownTeeArrow;": "\u21A7",
          "&Downarrow;": "\u21D3",
          "&Dscr;": "\uD835\uDC9F",
          "&Dstrok;": "\u0110",
          "&ENG;": "\u014A",
          "&ETH": "\xD0",
          "&ETH;": "\xD0",
          "&Eacute": "\xC9",
          "&Eacute;": "\xC9",
          "&Ecaron;": "\u011A",
          "&Ecirc": "\xCA",
          "&Ecirc;": "\xCA",
          "&Ecy;": "\u042D",
          "&Edot;": "\u0116",
          "&Efr;": "\uD835\uDD08",
          "&Egrave": "\xC8",
          "&Egrave;": "\xC8",
          "&Element;": "\u2208",
          "&Emacr;": "\u0112",
          "&EmptySmallSquare;": "\u25FB",
          "&EmptyVerySmallSquare;": "\u25AB",
          "&Eogon;": "\u0118",
          "&Eopf;": "\uD835\uDD3C",
          "&Epsilon;": "\u0395",
          "&Equal;": "\u2A75",
          "&EqualTilde;": "\u2242",
          "&Equilibrium;": "\u21CC",
          "&Escr;": "\u2130",
          "&Esim;": "\u2A73",
          "&Eta;": "\u0397",
          "&Euml": "\xCB",
          "&Euml;": "\xCB",
          "&Exists;": "\u2203",
          "&ExponentialE;": "\u2147",
          "&Fcy;": "\u0424",
          "&Ffr;": "\uD835\uDD09",
          "&FilledSmallSquare;": "\u25FC",
          "&FilledVerySmallSquare;": "\u25AA",
          "&Fopf;": "\uD835\uDD3D",
          "&ForAll;": "\u2200",
          "&Fouriertrf;": "\u2131",
          "&Fscr;": "\u2131",
          "&GJcy;": "\u0403",
          "&GT": ">",
          "&GT;": ">",
          "&Gamma;": "\u0393",
          "&Gammad;": "\u03DC",
          "&Gbreve;": "\u011E",
          "&Gcedil;": "\u0122",
          "&Gcirc;": "\u011C",
          "&Gcy;": "\u0413",
          "&Gdot;": "\u0120",
          "&Gfr;": "\uD835\uDD0A",
          "&Gg;": "\u22D9",
          "&Gopf;": "\uD835\uDD3E",
          "&GreaterEqual;": "\u2265",
          "&GreaterEqualLess;": "\u22DB",
          "&GreaterFullEqual;": "\u2267",
          "&GreaterGreater;": "\u2AA2",
          "&GreaterLess;": "\u2277",
          "&GreaterSlantEqual;": "\u2A7E",
          "&GreaterTilde;": "\u2273",
          "&Gscr;": "\uD835\uDCA2",
          "&Gt;": "\u226B",
          "&HARDcy;": "\u042A",
          "&Hacek;": "\u02C7",
          "&Hat;": "^",
          "&Hcirc;": "\u0124",
          "&Hfr;": "\u210C",
          "&HilbertSpace;": "\u210B",
          "&Hopf;": "\u210D",
          "&HorizontalLine;": "\u2500",
          "&Hscr;": "\u210B",
          "&Hstrok;": "\u0126",
          "&HumpDownHump;": "\u224E",
          "&HumpEqual;": "\u224F",
          "&IEcy;": "\u0415",
          "&IJlig;": "\u0132",
          "&IOcy;": "\u0401",
          "&Iacute": "\xCD",
          "&Iacute;": "\xCD",
          "&Icirc": "\xCE",
          "&Icirc;": "\xCE",
          "&Icy;": "\u0418",
          "&Idot;": "\u0130",
          "&Ifr;": "\u2111",
          "&Igrave": "\xCC",
          "&Igrave;": "\xCC",
          "&Im;": "\u2111",
          "&Imacr;": "\u012A",
          "&ImaginaryI;": "\u2148",
          "&Implies;": "\u21D2",
          "&Int;": "\u222C",
          "&Integral;": "\u222B",
          "&Intersection;": "\u22C2",
          "&InvisibleComma;": "\u2063",
          "&InvisibleTimes;": "\u2062",
          "&Iogon;": "\u012E",
          "&Iopf;": "\uD835\uDD40",
          "&Iota;": "\u0399",
          "&Iscr;": "\u2110",
          "&Itilde;": "\u0128",
          "&Iukcy;": "\u0406",
          "&Iuml": "\xCF",
          "&Iuml;": "\xCF",
          "&Jcirc;": "\u0134",
          "&Jcy;": "\u0419",
          "&Jfr;": "\uD835\uDD0D",
          "&Jopf;": "\uD835\uDD41",
          "&Jscr;": "\uD835\uDCA5",
          "&Jsercy;": "\u0408",
          "&Jukcy;": "\u0404",
          "&KHcy;": "\u0425",
          "&KJcy;": "\u040C",
          "&Kappa;": "\u039A",
          "&Kcedil;": "\u0136",
          "&Kcy;": "\u041A",
          "&Kfr;": "\uD835\uDD0E",
          "&Kopf;": "\uD835\uDD42",
          "&Kscr;": "\uD835\uDCA6",
          "&LJcy;": "\u0409",
          "&LT": "<",
          "&LT;": "<",
          "&Lacute;": "\u0139",
          "&Lambda;": "\u039B",
          "&Lang;": "\u27EA",
          "&Laplacetrf;": "\u2112",
          "&Larr;": "\u219E",
          "&Lcaron;": "\u013D",
          "&Lcedil;": "\u013B",
          "&Lcy;": "\u041B",
          "&LeftAngleBracket;": "\u27E8",
          "&LeftArrow;": "\u2190",
          "&LeftArrowBar;": "\u21E4",
          "&LeftArrowRightArrow;": "\u21C6",
          "&LeftCeiling;": "\u2308",
          "&LeftDoubleBracket;": "\u27E6",
          "&LeftDownTeeVector;": "\u2961",
          "&LeftDownVector;": "\u21C3",
          "&LeftDownVectorBar;": "\u2959",
          "&LeftFloor;": "\u230A",
          "&LeftRightArrow;": "\u2194",
          "&LeftRightVector;": "\u294E",
          "&LeftTee;": "\u22A3",
          "&LeftTeeArrow;": "\u21A4",
          "&LeftTeeVector;": "\u295A",
          "&LeftTriangle;": "\u22B2",
          "&LeftTriangleBar;": "\u29CF",
          "&LeftTriangleEqual;": "\u22B4",
          "&LeftUpDownVector;": "\u2951",
          "&LeftUpTeeVector;": "\u2960",
          "&LeftUpVector;": "\u21BF",
          "&LeftUpVectorBar;": "\u2958",
          "&LeftVector;": "\u21BC",
          "&LeftVectorBar;": "\u2952",
          "&Leftarrow;": "\u21D0",
          "&Leftrightarrow;": "\u21D4",
          "&LessEqualGreater;": "\u22DA",
          "&LessFullEqual;": "\u2266",
          "&LessGreater;": "\u2276",
          "&LessLess;": "\u2AA1",
          "&LessSlantEqual;": "\u2A7D",
          "&LessTilde;": "\u2272",
          "&Lfr;": "\uD835\uDD0F",
          "&Ll;": "\u22D8",
          "&Lleftarrow;": "\u21DA",
          "&Lmidot;": "\u013F",
          "&LongLeftArrow;": "\u27F5",
          "&LongLeftRightArrow;": "\u27F7",
          "&LongRightArrow;": "\u27F6",
          "&Longleftarrow;": "\u27F8",
          "&Longleftrightarrow;": "\u27FA",
          "&Longrightarrow;": "\u27F9",
          "&Lopf;": "\uD835\uDD43",
          "&LowerLeftArrow;": "\u2199",
          "&LowerRightArrow;": "\u2198",
          "&Lscr;": "\u2112",
          "&Lsh;": "\u21B0",
          "&Lstrok;": "\u0141",
          "&Lt;": "\u226A",
          "&Map;": "\u2905",
          "&Mcy;": "\u041C",
          "&MediumSpace;": "\u205F",
          "&Mellintrf;": "\u2133",
          "&Mfr;": "\uD835\uDD10",
          "&MinusPlus;": "\u2213",
          "&Mopf;": "\uD835\uDD44",
          "&Mscr;": "\u2133",
          "&Mu;": "\u039C",
          "&NJcy;": "\u040A",
          "&Nacute;": "\u0143",
          "&Ncaron;": "\u0147",
          "&Ncedil;": "\u0145",
          "&Ncy;": "\u041D",
          "&NegativeMediumSpace;": "\u200B",
          "&NegativeThickSpace;": "\u200B",
          "&NegativeThinSpace;": "\u200B",
          "&NegativeVeryThinSpace;": "\u200B",
          "&NestedGreaterGreater;": "\u226B",
          "&NestedLessLess;": "\u226A",
          "&NewLine;": "\n",
          "&Nfr;": "\uD835\uDD11",
          "&NoBreak;": "\u2060",
          "&NonBreakingSpace;": "\xA0",
          "&Nopf;": "\u2115",
          "&Not;": "\u2AEC",
          "&NotCongruent;": "\u2262",
          "&NotCupCap;": "\u226D",
          "&NotDoubleVerticalBar;": "\u2226",
          "&NotElement;": "\u2209",
          "&NotEqual;": "\u2260",
          "&NotEqualTilde;": "\u2242\u0338",
          "&NotExists;": "\u2204",
          "&NotGreater;": "\u226F",
          "&NotGreaterEqual;": "\u2271",
          "&NotGreaterFullEqual;": "\u2267\u0338",
          "&NotGreaterGreater;": "\u226B\u0338",
          "&NotGreaterLess;": "\u2279",
          "&NotGreaterSlantEqual;": "\u2A7E\u0338",
          "&NotGreaterTilde;": "\u2275",
          "&NotHumpDownHump;": "\u224E\u0338",
          "&NotHumpEqual;": "\u224F\u0338",
          "&NotLeftTriangle;": "\u22EA",
          "&NotLeftTriangleBar;": "\u29CF\u0338",
          "&NotLeftTriangleEqual;": "\u22EC",
          "&NotLess;": "\u226E",
          "&NotLessEqual;": "\u2270",
          "&NotLessGreater;": "\u2278",
          "&NotLessLess;": "\u226A\u0338",
          "&NotLessSlantEqual;": "\u2A7D\u0338",
          "&NotLessTilde;": "\u2274",
          "&NotNestedGreaterGreater;": "\u2AA2\u0338",
          "&NotNestedLessLess;": "\u2AA1\u0338",
          "&NotPrecedes;": "\u2280",
          "&NotPrecedesEqual;": "\u2AAF\u0338",
          "&NotPrecedesSlantEqual;": "\u22E0",
          "&NotReverseElement;": "\u220C",
          "&NotRightTriangle;": "\u22EB",
          "&NotRightTriangleBar;": "\u29D0\u0338",
          "&NotRightTriangleEqual;": "\u22ED",
          "&NotSquareSubset;": "\u228F\u0338",
          "&NotSquareSubsetEqual;": "\u22E2",
          "&NotSquareSuperset;": "\u2290\u0338",
          "&NotSquareSupersetEqual;": "\u22E3",
          "&NotSubset;": "\u2282\u20D2",
          "&NotSubsetEqual;": "\u2288",
          "&NotSucceeds;": "\u2281",
          "&NotSucceedsEqual;": "\u2AB0\u0338",
          "&NotSucceedsSlantEqual;": "\u22E1",
          "&NotSucceedsTilde;": "\u227F\u0338",
          "&NotSuperset;": "\u2283\u20D2",
          "&NotSupersetEqual;": "\u2289",
          "&NotTilde;": "\u2241",
          "&NotTildeEqual;": "\u2244",
          "&NotTildeFullEqual;": "\u2247",
          "&NotTildeTilde;": "\u2249",
          "&NotVerticalBar;": "\u2224",
          "&Nscr;": "\uD835\uDCA9",
          "&Ntilde": "\xD1",
          "&Ntilde;": "\xD1",
          "&Nu;": "\u039D",
          "&OElig;": "\u0152",
          "&Oacute": "\xD3",
          "&Oacute;": "\xD3",
          "&Ocirc": "\xD4",
          "&Ocirc;": "\xD4",
          "&Ocy;": "\u041E",
          "&Odblac;": "\u0150",
          "&Ofr;": "\uD835\uDD12",
          "&Ograve": "\xD2",
          "&Ograve;": "\xD2",
          "&Omacr;": "\u014C",
          "&Omega;": "\u03A9",
          "&Omicron;": "\u039F",
          "&Oopf;": "\uD835\uDD46",
          "&OpenCurlyDoubleQuote;": "\u201C",
          "&OpenCurlyQuote;": "\u2018",
          "&Or;": "\u2A54",
          "&Oscr;": "\uD835\uDCAA",
          "&Oslash": "\xD8",
          "&Oslash;": "\xD8",
          "&Otilde": "\xD5",
          "&Otilde;": "\xD5",
          "&Otimes;": "\u2A37",
          "&Ouml": "\xD6",
          "&Ouml;": "\xD6",
          "&OverBar;": "\u203E",
          "&OverBrace;": "\u23DE",
          "&OverBracket;": "\u23B4",
          "&OverParenthesis;": "\u23DC",
          "&PartialD;": "\u2202",
          "&Pcy;": "\u041F",
          "&Pfr;": "\uD835\uDD13",
          "&Phi;": "\u03A6",
          "&Pi;": "\u03A0",
          "&PlusMinus;": "\xB1",
          "&Poincareplane;": "\u210C",
          "&Popf;": "\u2119",
          "&Pr;": "\u2ABB",
          "&Precedes;": "\u227A",
          "&PrecedesEqual;": "\u2AAF",
          "&PrecedesSlantEqual;": "\u227C",
          "&PrecedesTilde;": "\u227E",
          "&Prime;": "\u2033",
          "&Product;": "\u220F",
          "&Proportion;": "\u2237",
          "&Proportional;": "\u221D",
          "&Pscr;": "\uD835\uDCAB",
          "&Psi;": "\u03A8",
          "&QUOT": '"',
          "&QUOT;": '"',
          "&Qfr;": "\uD835\uDD14",
          "&Qopf;": "\u211A",
          "&Qscr;": "\uD835\uDCAC",
          "&RBarr;": "\u2910",
          "&REG": "\xAE",
          "&REG;": "\xAE",
          "&Racute;": "\u0154",
          "&Rang;": "\u27EB",
          "&Rarr;": "\u21A0",
          "&Rarrtl;": "\u2916",
          "&Rcaron;": "\u0158",
          "&Rcedil;": "\u0156",
          "&Rcy;": "\u0420",
          "&Re;": "\u211C",
          "&ReverseElement;": "\u220B",
          "&ReverseEquilibrium;": "\u21CB",
          "&ReverseUpEquilibrium;": "\u296F",
          "&Rfr;": "\u211C",
          "&Rho;": "\u03A1",
          "&RightAngleBracket;": "\u27E9",
          "&RightArrow;": "\u2192",
          "&RightArrowBar;": "\u21E5",
          "&RightArrowLeftArrow;": "\u21C4",
          "&RightCeiling;": "\u2309",
          "&RightDoubleBracket;": "\u27E7",
          "&RightDownTeeVector;": "\u295D",
          "&RightDownVector;": "\u21C2",
          "&RightDownVectorBar;": "\u2955",
          "&RightFloor;": "\u230B",
          "&RightTee;": "\u22A2",
          "&RightTeeArrow;": "\u21A6",
          "&RightTeeVector;": "\u295B",
          "&RightTriangle;": "\u22B3",
          "&RightTriangleBar;": "\u29D0",
          "&RightTriangleEqual;": "\u22B5",
          "&RightUpDownVector;": "\u294F",
          "&RightUpTeeVector;": "\u295C",
          "&RightUpVector;": "\u21BE",
          "&RightUpVectorBar;": "\u2954",
          "&RightVector;": "\u21C0",
          "&RightVectorBar;": "\u2953",
          "&Rightarrow;": "\u21D2",
          "&Ropf;": "\u211D",
          "&RoundImplies;": "\u2970",
          "&Rrightarrow;": "\u21DB",
          "&Rscr;": "\u211B",
          "&Rsh;": "\u21B1",
          "&RuleDelayed;": "\u29F4",
          "&SHCHcy;": "\u0429",
          "&SHcy;": "\u0428",
          "&SOFTcy;": "\u042C",
          "&Sacute;": "\u015A",
          "&Sc;": "\u2ABC",
          "&Scaron;": "\u0160",
          "&Scedil;": "\u015E",
          "&Scirc;": "\u015C",
          "&Scy;": "\u0421",
          "&Sfr;": "\uD835\uDD16",
          "&ShortDownArrow;": "\u2193",
          "&ShortLeftArrow;": "\u2190",
          "&ShortRightArrow;": "\u2192",
          "&ShortUpArrow;": "\u2191",
          "&Sigma;": "\u03A3",
          "&SmallCircle;": "\u2218",
          "&Sopf;": "\uD835\uDD4A",
          "&Sqrt;": "\u221A",
          "&Square;": "\u25A1",
          "&SquareIntersection;": "\u2293",
          "&SquareSubset;": "\u228F",
          "&SquareSubsetEqual;": "\u2291",
          "&SquareSuperset;": "\u2290",
          "&SquareSupersetEqual;": "\u2292",
          "&SquareUnion;": "\u2294",
          "&Sscr;": "\uD835\uDCAE",
          "&Star;": "\u22C6",
          "&Sub;": "\u22D0",
          "&Subset;": "\u22D0",
          "&SubsetEqual;": "\u2286",
          "&Succeeds;": "\u227B",
          "&SucceedsEqual;": "\u2AB0",
          "&SucceedsSlantEqual;": "\u227D",
          "&SucceedsTilde;": "\u227F",
          "&SuchThat;": "\u220B",
          "&Sum;": "\u2211",
          "&Sup;": "\u22D1",
          "&Superset;": "\u2283",
          "&SupersetEqual;": "\u2287",
          "&Supset;": "\u22D1",
          "&THORN": "\xDE",
          "&THORN;": "\xDE",
          "&TRADE;": "\u2122",
          "&TSHcy;": "\u040B",
          "&TScy;": "\u0426",
          "&Tab;": "	",
          "&Tau;": "\u03A4",
          "&Tcaron;": "\u0164",
          "&Tcedil;": "\u0162",
          "&Tcy;": "\u0422",
          "&Tfr;": "\uD835\uDD17",
          "&Therefore;": "\u2234",
          "&Theta;": "\u0398",
          "&ThickSpace;": "\u205F\u200A",
          "&ThinSpace;": "\u2009",
          "&Tilde;": "\u223C",
          "&TildeEqual;": "\u2243",
          "&TildeFullEqual;": "\u2245",
          "&TildeTilde;": "\u2248",
          "&Topf;": "\uD835\uDD4B",
          "&TripleDot;": "\u20DB",
          "&Tscr;": "\uD835\uDCAF",
          "&Tstrok;": "\u0166",
          "&Uacute": "\xDA",
          "&Uacute;": "\xDA",
          "&Uarr;": "\u219F",
          "&Uarrocir;": "\u2949",
          "&Ubrcy;": "\u040E",
          "&Ubreve;": "\u016C",
          "&Ucirc": "\xDB",
          "&Ucirc;": "\xDB",
          "&Ucy;": "\u0423",
          "&Udblac;": "\u0170",
          "&Ufr;": "\uD835\uDD18",
          "&Ugrave": "\xD9",
          "&Ugrave;": "\xD9",
          "&Umacr;": "\u016A",
          "&UnderBar;": "_",
          "&UnderBrace;": "\u23DF",
          "&UnderBracket;": "\u23B5",
          "&UnderParenthesis;": "\u23DD",
          "&Union;": "\u22C3",
          "&UnionPlus;": "\u228E",
          "&Uogon;": "\u0172",
          "&Uopf;": "\uD835\uDD4C",
          "&UpArrow;": "\u2191",
          "&UpArrowBar;": "\u2912",
          "&UpArrowDownArrow;": "\u21C5",
          "&UpDownArrow;": "\u2195",
          "&UpEquilibrium;": "\u296E",
          "&UpTee;": "\u22A5",
          "&UpTeeArrow;": "\u21A5",
          "&Uparrow;": "\u21D1",
          "&Updownarrow;": "\u21D5",
          "&UpperLeftArrow;": "\u2196",
          "&UpperRightArrow;": "\u2197",
          "&Upsi;": "\u03D2",
          "&Upsilon;": "\u03A5",
          "&Uring;": "\u016E",
          "&Uscr;": "\uD835\uDCB0",
          "&Utilde;": "\u0168",
          "&Uuml": "\xDC",
          "&Uuml;": "\xDC",
          "&VDash;": "\u22AB",
          "&Vbar;": "\u2AEB",
          "&Vcy;": "\u0412",
          "&Vdash;": "\u22A9",
          "&Vdashl;": "\u2AE6",
          "&Vee;": "\u22C1",
          "&Verbar;": "\u2016",
          "&Vert;": "\u2016",
          "&VerticalBar;": "\u2223",
          "&VerticalLine;": "|",
          "&VerticalSeparator;": "\u2758",
          "&VerticalTilde;": "\u2240",
          "&VeryThinSpace;": "\u200A",
          "&Vfr;": "\uD835\uDD19",
          "&Vopf;": "\uD835\uDD4D",
          "&Vscr;": "\uD835\uDCB1",
          "&Vvdash;": "\u22AA",
          "&Wcirc;": "\u0174",
          "&Wedge;": "\u22C0",
          "&Wfr;": "\uD835\uDD1A",
          "&Wopf;": "\uD835\uDD4E",
          "&Wscr;": "\uD835\uDCB2",
          "&Xfr;": "\uD835\uDD1B",
          "&Xi;": "\u039E",
          "&Xopf;": "\uD835\uDD4F",
          "&Xscr;": "\uD835\uDCB3",
          "&YAcy;": "\u042F",
          "&YIcy;": "\u0407",
          "&YUcy;": "\u042E",
          "&Yacute": "\xDD",
          "&Yacute;": "\xDD",
          "&Ycirc;": "\u0176",
          "&Ycy;": "\u042B",
          "&Yfr;": "\uD835\uDD1C",
          "&Yopf;": "\uD835\uDD50",
          "&Yscr;": "\uD835\uDCB4",
          "&Yuml;": "\u0178",
          "&ZHcy;": "\u0416",
          "&Zacute;": "\u0179",
          "&Zcaron;": "\u017D",
          "&Zcy;": "\u0417",
          "&Zdot;": "\u017B",
          "&ZeroWidthSpace;": "\u200B",
          "&Zeta;": "\u0396",
          "&Zfr;": "\u2128",
          "&Zopf;": "\u2124",
          "&Zscr;": "\uD835\uDCB5",
          "&aacute": "\xE1",
          "&aacute;": "\xE1",
          "&abreve;": "\u0103",
          "&ac;": "\u223E",
          "&acE;": "\u223E\u0333",
          "&acd;": "\u223F",
          "&acirc": "\xE2",
          "&acirc;": "\xE2",
          "&acute": "\xB4",
          "&acute;": "\xB4",
          "&acy;": "\u0430",
          "&aelig": "\xE6",
          "&aelig;": "\xE6",
          "&af;": "\u2061",
          "&afr;": "\uD835\uDD1E",
          "&agrave": "\xE0",
          "&agrave;": "\xE0",
          "&alefsym;": "\u2135",
          "&aleph;": "\u2135",
          "&alpha;": "\u03B1",
          "&amacr;": "\u0101",
          "&amalg;": "\u2A3F",
          "&amp": "&",
          "&amp;": "&",
          "&and;": "\u2227",
          "&andand;": "\u2A55",
          "&andd;": "\u2A5C",
          "&andslope;": "\u2A58",
          "&andv;": "\u2A5A",
          "&ang;": "\u2220",
          "&ange;": "\u29A4",
          "&angle;": "\u2220",
          "&angmsd;": "\u2221",
          "&angmsdaa;": "\u29A8",
          "&angmsdab;": "\u29A9",
          "&angmsdac;": "\u29AA",
          "&angmsdad;": "\u29AB",
          "&angmsdae;": "\u29AC",
          "&angmsdaf;": "\u29AD",
          "&angmsdag;": "\u29AE",
          "&angmsdah;": "\u29AF",
          "&angrt;": "\u221F",
          "&angrtvb;": "\u22BE",
          "&angrtvbd;": "\u299D",
          "&angsph;": "\u2222",
          "&angst;": "\xC5",
          "&angzarr;": "\u237C",
          "&aogon;": "\u0105",
          "&aopf;": "\uD835\uDD52",
          "&ap;": "\u2248",
          "&apE;": "\u2A70",
          "&apacir;": "\u2A6F",
          "&ape;": "\u224A",
          "&apid;": "\u224B",
          "&apos;": "'",
          "&approx;": "\u2248",
          "&approxeq;": "\u224A",
          "&aring": "\xE5",
          "&aring;": "\xE5",
          "&ascr;": "\uD835\uDCB6",
          "&ast;": "*",
          "&asymp;": "\u2248",
          "&asympeq;": "\u224D",
          "&atilde": "\xE3",
          "&atilde;": "\xE3",
          "&auml": "\xE4",
          "&auml;": "\xE4",
          "&awconint;": "\u2233",
          "&awint;": "\u2A11",
          "&bNot;": "\u2AED",
          "&backcong;": "\u224C",
          "&backepsilon;": "\u03F6",
          "&backprime;": "\u2035",
          "&backsim;": "\u223D",
          "&backsimeq;": "\u22CD",
          "&barvee;": "\u22BD",
          "&barwed;": "\u2305",
          "&barwedge;": "\u2305",
          "&bbrk;": "\u23B5",
          "&bbrktbrk;": "\u23B6",
          "&bcong;": "\u224C",
          "&bcy;": "\u0431",
          "&bdquo;": "\u201E",
          "&becaus;": "\u2235",
          "&because;": "\u2235",
          "&bemptyv;": "\u29B0",
          "&bepsi;": "\u03F6",
          "&bernou;": "\u212C",
          "&beta;": "\u03B2",
          "&beth;": "\u2136",
          "&between;": "\u226C",
          "&bfr;": "\uD835\uDD1F",
          "&bigcap;": "\u22C2",
          "&bigcirc;": "\u25EF",
          "&bigcup;": "\u22C3",
          "&bigodot;": "\u2A00",
          "&bigoplus;": "\u2A01",
          "&bigotimes;": "\u2A02",
          "&bigsqcup;": "\u2A06",
          "&bigstar;": "\u2605",
          "&bigtriangledown;": "\u25BD",
          "&bigtriangleup;": "\u25B3",
          "&biguplus;": "\u2A04",
          "&bigvee;": "\u22C1",
          "&bigwedge;": "\u22C0",
          "&bkarow;": "\u290D",
          "&blacklozenge;": "\u29EB",
          "&blacksquare;": "\u25AA",
          "&blacktriangle;": "\u25B4",
          "&blacktriangledown;": "\u25BE",
          "&blacktriangleleft;": "\u25C2",
          "&blacktriangleright;": "\u25B8",
          "&blank;": "\u2423",
          "&blk12;": "\u2592",
          "&blk14;": "\u2591",
          "&blk34;": "\u2593",
          "&block;": "\u2588",
          "&bne;": "=\u20E5",
          "&bnequiv;": "\u2261\u20E5",
          "&bnot;": "\u2310",
          "&bopf;": "\uD835\uDD53",
          "&bot;": "\u22A5",
          "&bottom;": "\u22A5",
          "&bowtie;": "\u22C8",
          "&boxDL;": "\u2557",
          "&boxDR;": "\u2554",
          "&boxDl;": "\u2556",
          "&boxDr;": "\u2553",
          "&boxH;": "\u2550",
          "&boxHD;": "\u2566",
          "&boxHU;": "\u2569",
          "&boxHd;": "\u2564",
          "&boxHu;": "\u2567",
          "&boxUL;": "\u255D",
          "&boxUR;": "\u255A",
          "&boxUl;": "\u255C",
          "&boxUr;": "\u2559",
          "&boxV;": "\u2551",
          "&boxVH;": "\u256C",
          "&boxVL;": "\u2563",
          "&boxVR;": "\u2560",
          "&boxVh;": "\u256B",
          "&boxVl;": "\u2562",
          "&boxVr;": "\u255F",
          "&boxbox;": "\u29C9",
          "&boxdL;": "\u2555",
          "&boxdR;": "\u2552",
          "&boxdl;": "\u2510",
          "&boxdr;": "\u250C",
          "&boxh;": "\u2500",
          "&boxhD;": "\u2565",
          "&boxhU;": "\u2568",
          "&boxhd;": "\u252C",
          "&boxhu;": "\u2534",
          "&boxminus;": "\u229F",
          "&boxplus;": "\u229E",
          "&boxtimes;": "\u22A0",
          "&boxuL;": "\u255B",
          "&boxuR;": "\u2558",
          "&boxul;": "\u2518",
          "&boxur;": "\u2514",
          "&boxv;": "\u2502",
          "&boxvH;": "\u256A",
          "&boxvL;": "\u2561",
          "&boxvR;": "\u255E",
          "&boxvh;": "\u253C",
          "&boxvl;": "\u2524",
          "&boxvr;": "\u251C",
          "&bprime;": "\u2035",
          "&breve;": "\u02D8",
          "&brvbar": "\xA6",
          "&brvbar;": "\xA6",
          "&bscr;": "\uD835\uDCB7",
          "&bsemi;": "\u204F",
          "&bsim;": "\u223D",
          "&bsime;": "\u22CD",
          "&bsol;": "\\",
          "&bsolb;": "\u29C5",
          "&bsolhsub;": "\u27C8",
          "&bull;": "\u2022",
          "&bullet;": "\u2022",
          "&bump;": "\u224E",
          "&bumpE;": "\u2AAE",
          "&bumpe;": "\u224F",
          "&bumpeq;": "\u224F",
          "&cacute;": "\u0107",
          "&cap;": "\u2229",
          "&capand;": "\u2A44",
          "&capbrcup;": "\u2A49",
          "&capcap;": "\u2A4B",
          "&capcup;": "\u2A47",
          "&capdot;": "\u2A40",
          "&caps;": "\u2229\uFE00",
          "&caret;": "\u2041",
          "&caron;": "\u02C7",
          "&ccaps;": "\u2A4D",
          "&ccaron;": "\u010D",
          "&ccedil": "\xE7",
          "&ccedil;": "\xE7",
          "&ccirc;": "\u0109",
          "&ccups;": "\u2A4C",
          "&ccupssm;": "\u2A50",
          "&cdot;": "\u010B",
          "&cedil": "\xB8",
          "&cedil;": "\xB8",
          "&cemptyv;": "\u29B2",
          "&cent": "\xA2",
          "&cent;": "\xA2",
          "&centerdot;": "\xB7",
          "&cfr;": "\uD835\uDD20",
          "&chcy;": "\u0447",
          "&check;": "\u2713",
          "&checkmark;": "\u2713",
          "&chi;": "\u03C7",
          "&cir;": "\u25CB",
          "&cirE;": "\u29C3",
          "&circ;": "\u02C6",
          "&circeq;": "\u2257",
          "&circlearrowleft;": "\u21BA",
          "&circlearrowright;": "\u21BB",
          "&circledR;": "\xAE",
          "&circledS;": "\u24C8",
          "&circledast;": "\u229B",
          "&circledcirc;": "\u229A",
          "&circleddash;": "\u229D",
          "&cire;": "\u2257",
          "&cirfnint;": "\u2A10",
          "&cirmid;": "\u2AEF",
          "&cirscir;": "\u29C2",
          "&clubs;": "\u2663",
          "&clubsuit;": "\u2663",
          "&colon;": ":",
          "&colone;": "\u2254",
          "&coloneq;": "\u2254",
          "&comma;": ",",
          "&commat;": "@",
          "&comp;": "\u2201",
          "&compfn;": "\u2218",
          "&complement;": "\u2201",
          "&complexes;": "\u2102",
          "&cong;": "\u2245",
          "&congdot;": "\u2A6D",
          "&conint;": "\u222E",
          "&copf;": "\uD835\uDD54",
          "&coprod;": "\u2210",
          "&copy": "\xA9",
          "&copy;": "\xA9",
          "&copysr;": "\u2117",
          "&crarr;": "\u21B5",
          "&cross;": "\u2717",
          "&cscr;": "\uD835\uDCB8",
          "&csub;": "\u2ACF",
          "&csube;": "\u2AD1",
          "&csup;": "\u2AD0",
          "&csupe;": "\u2AD2",
          "&ctdot;": "\u22EF",
          "&cudarrl;": "\u2938",
          "&cudarrr;": "\u2935",
          "&cuepr;": "\u22DE",
          "&cuesc;": "\u22DF",
          "&cularr;": "\u21B6",
          "&cularrp;": "\u293D",
          "&cup;": "\u222A",
          "&cupbrcap;": "\u2A48",
          "&cupcap;": "\u2A46",
          "&cupcup;": "\u2A4A",
          "&cupdot;": "\u228D",
          "&cupor;": "\u2A45",
          "&cups;": "\u222A\uFE00",
          "&curarr;": "\u21B7",
          "&curarrm;": "\u293C",
          "&curlyeqprec;": "\u22DE",
          "&curlyeqsucc;": "\u22DF",
          "&curlyvee;": "\u22CE",
          "&curlywedge;": "\u22CF",
          "&curren": "\xA4",
          "&curren;": "\xA4",
          "&curvearrowleft;": "\u21B6",
          "&curvearrowright;": "\u21B7",
          "&cuvee;": "\u22CE",
          "&cuwed;": "\u22CF",
          "&cwconint;": "\u2232",
          "&cwint;": "\u2231",
          "&cylcty;": "\u232D",
          "&dArr;": "\u21D3",
          "&dHar;": "\u2965",
          "&dagger;": "\u2020",
          "&daleth;": "\u2138",
          "&darr;": "\u2193",
          "&dash;": "\u2010",
          "&dashv;": "\u22A3",
          "&dbkarow;": "\u290F",
          "&dblac;": "\u02DD",
          "&dcaron;": "\u010F",
          "&dcy;": "\u0434",
          "&dd;": "\u2146",
          "&ddagger;": "\u2021",
          "&ddarr;": "\u21CA",
          "&ddotseq;": "\u2A77",
          "&deg": "\xB0",
          "&deg;": "\xB0",
          "&delta;": "\u03B4",
          "&demptyv;": "\u29B1",
          "&dfisht;": "\u297F",
          "&dfr;": "\uD835\uDD21",
          "&dharl;": "\u21C3",
          "&dharr;": "\u21C2",
          "&diam;": "\u22C4",
          "&diamond;": "\u22C4",
          "&diamondsuit;": "\u2666",
          "&diams;": "\u2666",
          "&die;": "\xA8",
          "&digamma;": "\u03DD",
          "&disin;": "\u22F2",
          "&div;": "\xF7",
          "&divide": "\xF7",
          "&divide;": "\xF7",
          "&divideontimes;": "\u22C7",
          "&divonx;": "\u22C7",
          "&djcy;": "\u0452",
          "&dlcorn;": "\u231E",
          "&dlcrop;": "\u230D",
          "&dollar;": "$",
          "&dopf;": "\uD835\uDD55",
          "&dot;": "\u02D9",
          "&doteq;": "\u2250",
          "&doteqdot;": "\u2251",
          "&dotminus;": "\u2238",
          "&dotplus;": "\u2214",
          "&dotsquare;": "\u22A1",
          "&doublebarwedge;": "\u2306",
          "&downarrow;": "\u2193",
          "&downdownarrows;": "\u21CA",
          "&downharpoonleft;": "\u21C3",
          "&downharpoonright;": "\u21C2",
          "&drbkarow;": "\u2910",
          "&drcorn;": "\u231F",
          "&drcrop;": "\u230C",
          "&dscr;": "\uD835\uDCB9",
          "&dscy;": "\u0455",
          "&dsol;": "\u29F6",
          "&dstrok;": "\u0111",
          "&dtdot;": "\u22F1",
          "&dtri;": "\u25BF",
          "&dtrif;": "\u25BE",
          "&duarr;": "\u21F5",
          "&duhar;": "\u296F",
          "&dwangle;": "\u29A6",
          "&dzcy;": "\u045F",
          "&dzigrarr;": "\u27FF",
          "&eDDot;": "\u2A77",
          "&eDot;": "\u2251",
          "&eacute": "\xE9",
          "&eacute;": "\xE9",
          "&easter;": "\u2A6E",
          "&ecaron;": "\u011B",
          "&ecir;": "\u2256",
          "&ecirc": "\xEA",
          "&ecirc;": "\xEA",
          "&ecolon;": "\u2255",
          "&ecy;": "\u044D",
          "&edot;": "\u0117",
          "&ee;": "\u2147",
          "&efDot;": "\u2252",
          "&efr;": "\uD835\uDD22",
          "&eg;": "\u2A9A",
          "&egrave": "\xE8",
          "&egrave;": "\xE8",
          "&egs;": "\u2A96",
          "&egsdot;": "\u2A98",
          "&el;": "\u2A99",
          "&elinters;": "\u23E7",
          "&ell;": "\u2113",
          "&els;": "\u2A95",
          "&elsdot;": "\u2A97",
          "&emacr;": "\u0113",
          "&empty;": "\u2205",
          "&emptyset;": "\u2205",
          "&emptyv;": "\u2205",
          "&emsp13;": "\u2004",
          "&emsp14;": "\u2005",
          "&emsp;": "\u2003",
          "&eng;": "\u014B",
          "&ensp;": "\u2002",
          "&eogon;": "\u0119",
          "&eopf;": "\uD835\uDD56",
          "&epar;": "\u22D5",
          "&eparsl;": "\u29E3",
          "&eplus;": "\u2A71",
          "&epsi;": "\u03B5",
          "&epsilon;": "\u03B5",
          "&epsiv;": "\u03F5",
          "&eqcirc;": "\u2256",
          "&eqcolon;": "\u2255",
          "&eqsim;": "\u2242",
          "&eqslantgtr;": "\u2A96",
          "&eqslantless;": "\u2A95",
          "&equals;": "=",
          "&equest;": "\u225F",
          "&equiv;": "\u2261",
          "&equivDD;": "\u2A78",
          "&eqvparsl;": "\u29E5",
          "&erDot;": "\u2253",
          "&erarr;": "\u2971",
          "&escr;": "\u212F",
          "&esdot;": "\u2250",
          "&esim;": "\u2242",
          "&eta;": "\u03B7",
          "&eth": "\xF0",
          "&eth;": "\xF0",
          "&euml": "\xEB",
          "&euml;": "\xEB",
          "&euro;": "\u20AC",
          "&excl;": "!",
          "&exist;": "\u2203",
          "&expectation;": "\u2130",
          "&exponentiale;": "\u2147",
          "&fallingdotseq;": "\u2252",
          "&fcy;": "\u0444",
          "&female;": "\u2640",
          "&ffilig;": "\uFB03",
          "&fflig;": "\uFB00",
          "&ffllig;": "\uFB04",
          "&ffr;": "\uD835\uDD23",
          "&filig;": "\uFB01",
          "&fjlig;": "fj",
          "&flat;": "\u266D",
          "&fllig;": "\uFB02",
          "&fltns;": "\u25B1",
          "&fnof;": "\u0192",
          "&fopf;": "\uD835\uDD57",
          "&forall;": "\u2200",
          "&fork;": "\u22D4",
          "&forkv;": "\u2AD9",
          "&fpartint;": "\u2A0D",
          "&frac12": "\xBD",
          "&frac12;": "\xBD",
          "&frac13;": "\u2153",
          "&frac14": "\xBC",
          "&frac14;": "\xBC",
          "&frac15;": "\u2155",
          "&frac16;": "\u2159",
          "&frac18;": "\u215B",
          "&frac23;": "\u2154",
          "&frac25;": "\u2156",
          "&frac34": "\xBE",
          "&frac34;": "\xBE",
          "&frac35;": "\u2157",
          "&frac38;": "\u215C",
          "&frac45;": "\u2158",
          "&frac56;": "\u215A",
          "&frac58;": "\u215D",
          "&frac78;": "\u215E",
          "&frasl;": "\u2044",
          "&frown;": "\u2322",
          "&fscr;": "\uD835\uDCBB",
          "&gE;": "\u2267",
          "&gEl;": "\u2A8C",
          "&gacute;": "\u01F5",
          "&gamma;": "\u03B3",
          "&gammad;": "\u03DD",
          "&gap;": "\u2A86",
          "&gbreve;": "\u011F",
          "&gcirc;": "\u011D",
          "&gcy;": "\u0433",
          "&gdot;": "\u0121",
          "&ge;": "\u2265",
          "&gel;": "\u22DB",
          "&geq;": "\u2265",
          "&geqq;": "\u2267",
          "&geqslant;": "\u2A7E",
          "&ges;": "\u2A7E",
          "&gescc;": "\u2AA9",
          "&gesdot;": "\u2A80",
          "&gesdoto;": "\u2A82",
          "&gesdotol;": "\u2A84",
          "&gesl;": "\u22DB\uFE00",
          "&gesles;": "\u2A94",
          "&gfr;": "\uD835\uDD24",
          "&gg;": "\u226B",
          "&ggg;": "\u22D9",
          "&gimel;": "\u2137",
          "&gjcy;": "\u0453",
          "&gl;": "\u2277",
          "&glE;": "\u2A92",
          "&gla;": "\u2AA5",
          "&glj;": "\u2AA4",
          "&gnE;": "\u2269",
          "&gnap;": "\u2A8A",
          "&gnapprox;": "\u2A8A",
          "&gne;": "\u2A88",
          "&gneq;": "\u2A88",
          "&gneqq;": "\u2269",
          "&gnsim;": "\u22E7",
          "&gopf;": "\uD835\uDD58",
          "&grave;": "`",
          "&gscr;": "\u210A",
          "&gsim;": "\u2273",
          "&gsime;": "\u2A8E",
          "&gsiml;": "\u2A90",
          "&gt": ">",
          "&gt;": ">",
          "&gtcc;": "\u2AA7",
          "&gtcir;": "\u2A7A",
          "&gtdot;": "\u22D7",
          "&gtlPar;": "\u2995",
          "&gtquest;": "\u2A7C",
          "&gtrapprox;": "\u2A86",
          "&gtrarr;": "\u2978",
          "&gtrdot;": "\u22D7",
          "&gtreqless;": "\u22DB",
          "&gtreqqless;": "\u2A8C",
          "&gtrless;": "\u2277",
          "&gtrsim;": "\u2273",
          "&gvertneqq;": "\u2269\uFE00",
          "&gvnE;": "\u2269\uFE00",
          "&hArr;": "\u21D4",
          "&hairsp;": "\u200A",
          "&half;": "\xBD",
          "&hamilt;": "\u210B",
          "&hardcy;": "\u044A",
          "&harr;": "\u2194",
          "&harrcir;": "\u2948",
          "&harrw;": "\u21AD",
          "&hbar;": "\u210F",
          "&hcirc;": "\u0125",
          "&hearts;": "\u2665",
          "&heartsuit;": "\u2665",
          "&hellip;": "\u2026",
          "&hercon;": "\u22B9",
          "&hfr;": "\uD835\uDD25",
          "&hksearow;": "\u2925",
          "&hkswarow;": "\u2926",
          "&hoarr;": "\u21FF",
          "&homtht;": "\u223B",
          "&hookleftarrow;": "\u21A9",
          "&hookrightarrow;": "\u21AA",
          "&hopf;": "\uD835\uDD59",
          "&horbar;": "\u2015",
          "&hscr;": "\uD835\uDCBD",
          "&hslash;": "\u210F",
          "&hstrok;": "\u0127",
          "&hybull;": "\u2043",
          "&hyphen;": "\u2010",
          "&iacute": "\xED",
          "&iacute;": "\xED",
          "&ic;": "\u2063",
          "&icirc": "\xEE",
          "&icirc;": "\xEE",
          "&icy;": "\u0438",
          "&iecy;": "\u0435",
          "&iexcl": "\xA1",
          "&iexcl;": "\xA1",
          "&iff;": "\u21D4",
          "&ifr;": "\uD835\uDD26",
          "&igrave": "\xEC",
          "&igrave;": "\xEC",
          "&ii;": "\u2148",
          "&iiiint;": "\u2A0C",
          "&iiint;": "\u222D",
          "&iinfin;": "\u29DC",
          "&iiota;": "\u2129",
          "&ijlig;": "\u0133",
          "&imacr;": "\u012B",
          "&image;": "\u2111",
          "&imagline;": "\u2110",
          "&imagpart;": "\u2111",
          "&imath;": "\u0131",
          "&imof;": "\u22B7",
          "&imped;": "\u01B5",
          "&in;": "\u2208",
          "&incare;": "\u2105",
          "&infin;": "\u221E",
          "&infintie;": "\u29DD",
          "&inodot;": "\u0131",
          "&int;": "\u222B",
          "&intcal;": "\u22BA",
          "&integers;": "\u2124",
          "&intercal;": "\u22BA",
          "&intlarhk;": "\u2A17",
          "&intprod;": "\u2A3C",
          "&iocy;": "\u0451",
          "&iogon;": "\u012F",
          "&iopf;": "\uD835\uDD5A",
          "&iota;": "\u03B9",
          "&iprod;": "\u2A3C",
          "&iquest": "\xBF",
          "&iquest;": "\xBF",
          "&iscr;": "\uD835\uDCBE",
          "&isin;": "\u2208",
          "&isinE;": "\u22F9",
          "&isindot;": "\u22F5",
          "&isins;": "\u22F4",
          "&isinsv;": "\u22F3",
          "&isinv;": "\u2208",
          "&it;": "\u2062",
          "&itilde;": "\u0129",
          "&iukcy;": "\u0456",
          "&iuml": "\xEF",
          "&iuml;": "\xEF",
          "&jcirc;": "\u0135",
          "&jcy;": "\u0439",
          "&jfr;": "\uD835\uDD27",
          "&jmath;": "\u0237",
          "&jopf;": "\uD835\uDD5B",
          "&jscr;": "\uD835\uDCBF",
          "&jsercy;": "\u0458",
          "&jukcy;": "\u0454",
          "&kappa;": "\u03BA",
          "&kappav;": "\u03F0",
          "&kcedil;": "\u0137",
          "&kcy;": "\u043A",
          "&kfr;": "\uD835\uDD28",
          "&kgreen;": "\u0138",
          "&khcy;": "\u0445",
          "&kjcy;": "\u045C",
          "&kopf;": "\uD835\uDD5C",
          "&kscr;": "\uD835\uDCC0",
          "&lAarr;": "\u21DA",
          "&lArr;": "\u21D0",
          "&lAtail;": "\u291B",
          "&lBarr;": "\u290E",
          "&lE;": "\u2266",
          "&lEg;": "\u2A8B",
          "&lHar;": "\u2962",
          "&lacute;": "\u013A",
          "&laemptyv;": "\u29B4",
          "&lagran;": "\u2112",
          "&lambda;": "\u03BB",
          "&lang;": "\u27E8",
          "&langd;": "\u2991",
          "&langle;": "\u27E8",
          "&lap;": "\u2A85",
          "&laquo": "\xAB",
          "&laquo;": "\xAB",
          "&larr;": "\u2190",
          "&larrb;": "\u21E4",
          "&larrbfs;": "\u291F",
          "&larrfs;": "\u291D",
          "&larrhk;": "\u21A9",
          "&larrlp;": "\u21AB",
          "&larrpl;": "\u2939",
          "&larrsim;": "\u2973",
          "&larrtl;": "\u21A2",
          "&lat;": "\u2AAB",
          "&latail;": "\u2919",
          "&late;": "\u2AAD",
          "&lates;": "\u2AAD\uFE00",
          "&lbarr;": "\u290C",
          "&lbbrk;": "\u2772",
          "&lbrace;": "{",
          "&lbrack;": "[",
          "&lbrke;": "\u298B",
          "&lbrksld;": "\u298F",
          "&lbrkslu;": "\u298D",
          "&lcaron;": "\u013E",
          "&lcedil;": "\u013C",
          "&lceil;": "\u2308",
          "&lcub;": "{",
          "&lcy;": "\u043B",
          "&ldca;": "\u2936",
          "&ldquo;": "\u201C",
          "&ldquor;": "\u201E",
          "&ldrdhar;": "\u2967",
          "&ldrushar;": "\u294B",
          "&ldsh;": "\u21B2",
          "&le;": "\u2264",
          "&leftarrow;": "\u2190",
          "&leftarrowtail;": "\u21A2",
          "&leftharpoondown;": "\u21BD",
          "&leftharpoonup;": "\u21BC",
          "&leftleftarrows;": "\u21C7",
          "&leftrightarrow;": "\u2194",
          "&leftrightarrows;": "\u21C6",
          "&leftrightharpoons;": "\u21CB",
          "&leftrightsquigarrow;": "\u21AD",
          "&leftthreetimes;": "\u22CB",
          "&leg;": "\u22DA",
          "&leq;": "\u2264",
          "&leqq;": "\u2266",
          "&leqslant;": "\u2A7D",
          "&les;": "\u2A7D",
          "&lescc;": "\u2AA8",
          "&lesdot;": "\u2A7F",
          "&lesdoto;": "\u2A81",
          "&lesdotor;": "\u2A83",
          "&lesg;": "\u22DA\uFE00",
          "&lesges;": "\u2A93",
          "&lessapprox;": "\u2A85",
          "&lessdot;": "\u22D6",
          "&lesseqgtr;": "\u22DA",
          "&lesseqqgtr;": "\u2A8B",
          "&lessgtr;": "\u2276",
          "&lesssim;": "\u2272",
          "&lfisht;": "\u297C",
          "&lfloor;": "\u230A",
          "&lfr;": "\uD835\uDD29",
          "&lg;": "\u2276",
          "&lgE;": "\u2A91",
          "&lhard;": "\u21BD",
          "&lharu;": "\u21BC",
          "&lharul;": "\u296A",
          "&lhblk;": "\u2584",
          "&ljcy;": "\u0459",
          "&ll;": "\u226A",
          "&llarr;": "\u21C7",
          "&llcorner;": "\u231E",
          "&llhard;": "\u296B",
          "&lltri;": "\u25FA",
          "&lmidot;": "\u0140",
          "&lmoust;": "\u23B0",
          "&lmoustache;": "\u23B0",
          "&lnE;": "\u2268",
          "&lnap;": "\u2A89",
          "&lnapprox;": "\u2A89",
          "&lne;": "\u2A87",
          "&lneq;": "\u2A87",
          "&lneqq;": "\u2268",
          "&lnsim;": "\u22E6",
          "&loang;": "\u27EC",
          "&loarr;": "\u21FD",
          "&lobrk;": "\u27E6",
          "&longleftarrow;": "\u27F5",
          "&longleftrightarrow;": "\u27F7",
          "&longmapsto;": "\u27FC",
          "&longrightarrow;": "\u27F6",
          "&looparrowleft;": "\u21AB",
          "&looparrowright;": "\u21AC",
          "&lopar;": "\u2985",
          "&lopf;": "\uD835\uDD5D",
          "&loplus;": "\u2A2D",
          "&lotimes;": "\u2A34",
          "&lowast;": "\u2217",
          "&lowbar;": "_",
          "&loz;": "\u25CA",
          "&lozenge;": "\u25CA",
          "&lozf;": "\u29EB",
          "&lpar;": "(",
          "&lparlt;": "\u2993",
          "&lrarr;": "\u21C6",
          "&lrcorner;": "\u231F",
          "&lrhar;": "\u21CB",
          "&lrhard;": "\u296D",
          "&lrm;": "\u200E",
          "&lrtri;": "\u22BF",
          "&lsaquo;": "\u2039",
          "&lscr;": "\uD835\uDCC1",
          "&lsh;": "\u21B0",
          "&lsim;": "\u2272",
          "&lsime;": "\u2A8D",
          "&lsimg;": "\u2A8F",
          "&lsqb;": "[",
          "&lsquo;": "\u2018",
          "&lsquor;": "\u201A",
          "&lstrok;": "\u0142",
          "&lt": "<",
          "&lt;": "<",
          "&ltcc;": "\u2AA6",
          "&ltcir;": "\u2A79",
          "&ltdot;": "\u22D6",
          "&lthree;": "\u22CB",
          "&ltimes;": "\u22C9",
          "&ltlarr;": "\u2976",
          "&ltquest;": "\u2A7B",
          "&ltrPar;": "\u2996",
          "&ltri;": "\u25C3",
          "&ltrie;": "\u22B4",
          "&ltrif;": "\u25C2",
          "&lurdshar;": "\u294A",
          "&luruhar;": "\u2966",
          "&lvertneqq;": "\u2268\uFE00",
          "&lvnE;": "\u2268\uFE00",
          "&mDDot;": "\u223A",
          "&macr": "\xAF",
          "&macr;": "\xAF",
          "&male;": "\u2642",
          "&malt;": "\u2720",
          "&maltese;": "\u2720",
          "&map;": "\u21A6",
          "&mapsto;": "\u21A6",
          "&mapstodown;": "\u21A7",
          "&mapstoleft;": "\u21A4",
          "&mapstoup;": "\u21A5",
          "&marker;": "\u25AE",
          "&mcomma;": "\u2A29",
          "&mcy;": "\u043C",
          "&mdash;": "\u2014",
          "&measuredangle;": "\u2221",
          "&mfr;": "\uD835\uDD2A",
          "&mho;": "\u2127",
          "&micro": "\xB5",
          "&micro;": "\xB5",
          "&mid;": "\u2223",
          "&midast;": "*",
          "&midcir;": "\u2AF0",
          "&middot": "\xB7",
          "&middot;": "\xB7",
          "&minus;": "\u2212",
          "&minusb;": "\u229F",
          "&minusd;": "\u2238",
          "&minusdu;": "\u2A2A",
          "&mlcp;": "\u2ADB",
          "&mldr;": "\u2026",
          "&mnplus;": "\u2213",
          "&models;": "\u22A7",
          "&mopf;": "\uD835\uDD5E",
          "&mp;": "\u2213",
          "&mscr;": "\uD835\uDCC2",
          "&mstpos;": "\u223E",
          "&mu;": "\u03BC",
          "&multimap;": "\u22B8",
          "&mumap;": "\u22B8",
          "&nGg;": "\u22D9\u0338",
          "&nGt;": "\u226B\u20D2",
          "&nGtv;": "\u226B\u0338",
          "&nLeftarrow;": "\u21CD",
          "&nLeftrightarrow;": "\u21CE",
          "&nLl;": "\u22D8\u0338",
          "&nLt;": "\u226A\u20D2",
          "&nLtv;": "\u226A\u0338",
          "&nRightarrow;": "\u21CF",
          "&nVDash;": "\u22AF",
          "&nVdash;": "\u22AE",
          "&nabla;": "\u2207",
          "&nacute;": "\u0144",
          "&nang;": "\u2220\u20D2",
          "&nap;": "\u2249",
          "&napE;": "\u2A70\u0338",
          "&napid;": "\u224B\u0338",
          "&napos;": "\u0149",
          "&napprox;": "\u2249",
          "&natur;": "\u266E",
          "&natural;": "\u266E",
          "&naturals;": "\u2115",
          "&nbsp": "\xA0",
          "&nbsp;": "\xA0",
          "&nbump;": "\u224E\u0338",
          "&nbumpe;": "\u224F\u0338",
          "&ncap;": "\u2A43",
          "&ncaron;": "\u0148",
          "&ncedil;": "\u0146",
          "&ncong;": "\u2247",
          "&ncongdot;": "\u2A6D\u0338",
          "&ncup;": "\u2A42",
          "&ncy;": "\u043D",
          "&ndash;": "\u2013",
          "&ne;": "\u2260",
          "&neArr;": "\u21D7",
          "&nearhk;": "\u2924",
          "&nearr;": "\u2197",
          "&nearrow;": "\u2197",
          "&nedot;": "\u2250\u0338",
          "&nequiv;": "\u2262",
          "&nesear;": "\u2928",
          "&nesim;": "\u2242\u0338",
          "&nexist;": "\u2204",
          "&nexists;": "\u2204",
          "&nfr;": "\uD835\uDD2B",
          "&ngE;": "\u2267\u0338",
          "&nge;": "\u2271",
          "&ngeq;": "\u2271",
          "&ngeqq;": "\u2267\u0338",
          "&ngeqslant;": "\u2A7E\u0338",
          "&nges;": "\u2A7E\u0338",
          "&ngsim;": "\u2275",
          "&ngt;": "\u226F",
          "&ngtr;": "\u226F",
          "&nhArr;": "\u21CE",
          "&nharr;": "\u21AE",
          "&nhpar;": "\u2AF2",
          "&ni;": "\u220B",
          "&nis;": "\u22FC",
          "&nisd;": "\u22FA",
          "&niv;": "\u220B",
          "&njcy;": "\u045A",
          "&nlArr;": "\u21CD",
          "&nlE;": "\u2266\u0338",
          "&nlarr;": "\u219A",
          "&nldr;": "\u2025",
          "&nle;": "\u2270",
          "&nleftarrow;": "\u219A",
          "&nleftrightarrow;": "\u21AE",
          "&nleq;": "\u2270",
          "&nleqq;": "\u2266\u0338",
          "&nleqslant;": "\u2A7D\u0338",
          "&nles;": "\u2A7D\u0338",
          "&nless;": "\u226E",
          "&nlsim;": "\u2274",
          "&nlt;": "\u226E",
          "&nltri;": "\u22EA",
          "&nltrie;": "\u22EC",
          "&nmid;": "\u2224",
          "&nopf;": "\uD835\uDD5F",
          "&not": "\xAC",
          "&not;": "\xAC",
          "&notin;": "\u2209",
          "&notinE;": "\u22F9\u0338",
          "&notindot;": "\u22F5\u0338",
          "&notinva;": "\u2209",
          "&notinvb;": "\u22F7",
          "&notinvc;": "\u22F6",
          "&notni;": "\u220C",
          "&notniva;": "\u220C",
          "&notnivb;": "\u22FE",
          "&notnivc;": "\u22FD",
          "&npar;": "\u2226",
          "&nparallel;": "\u2226",
          "&nparsl;": "\u2AFD\u20E5",
          "&npart;": "\u2202\u0338",
          "&npolint;": "\u2A14",
          "&npr;": "\u2280",
          "&nprcue;": "\u22E0",
          "&npre;": "\u2AAF\u0338",
          "&nprec;": "\u2280",
          "&npreceq;": "\u2AAF\u0338",
          "&nrArr;": "\u21CF",
          "&nrarr;": "\u219B",
          "&nrarrc;": "\u2933\u0338",
          "&nrarrw;": "\u219D\u0338",
          "&nrightarrow;": "\u219B",
          "&nrtri;": "\u22EB",
          "&nrtrie;": "\u22ED",
          "&nsc;": "\u2281",
          "&nsccue;": "\u22E1",
          "&nsce;": "\u2AB0\u0338",
          "&nscr;": "\uD835\uDCC3",
          "&nshortmid;": "\u2224",
          "&nshortparallel;": "\u2226",
          "&nsim;": "\u2241",
          "&nsime;": "\u2244",
          "&nsimeq;": "\u2244",
          "&nsmid;": "\u2224",
          "&nspar;": "\u2226",
          "&nsqsube;": "\u22E2",
          "&nsqsupe;": "\u22E3",
          "&nsub;": "\u2284",
          "&nsubE;": "\u2AC5\u0338",
          "&nsube;": "\u2288",
          "&nsubset;": "\u2282\u20D2",
          "&nsubseteq;": "\u2288",
          "&nsubseteqq;": "\u2AC5\u0338",
          "&nsucc;": "\u2281",
          "&nsucceq;": "\u2AB0\u0338",
          "&nsup;": "\u2285",
          "&nsupE;": "\u2AC6\u0338",
          "&nsupe;": "\u2289",
          "&nsupset;": "\u2283\u20D2",
          "&nsupseteq;": "\u2289",
          "&nsupseteqq;": "\u2AC6\u0338",
          "&ntgl;": "\u2279",
          "&ntilde": "\xF1",
          "&ntilde;": "\xF1",
          "&ntlg;": "\u2278",
          "&ntriangleleft;": "\u22EA",
          "&ntrianglelefteq;": "\u22EC",
          "&ntriangleright;": "\u22EB",
          "&ntrianglerighteq;": "\u22ED",
          "&nu;": "\u03BD",
          "&num;": "#",
          "&numero;": "\u2116",
          "&numsp;": "\u2007",
          "&nvDash;": "\u22AD",
          "&nvHarr;": "\u2904",
          "&nvap;": "\u224D\u20D2",
          "&nvdash;": "\u22AC",
          "&nvge;": "\u2265\u20D2",
          "&nvgt;": ">\u20D2",
          "&nvinfin;": "\u29DE",
          "&nvlArr;": "\u2902",
          "&nvle;": "\u2264\u20D2",
          "&nvlt;": "<\u20D2",
          "&nvltrie;": "\u22B4\u20D2",
          "&nvrArr;": "\u2903",
          "&nvrtrie;": "\u22B5\u20D2",
          "&nvsim;": "\u223C\u20D2",
          "&nwArr;": "\u21D6",
          "&nwarhk;": "\u2923",
          "&nwarr;": "\u2196",
          "&nwarrow;": "\u2196",
          "&nwnear;": "\u2927",
          "&oS;": "\u24C8",
          "&oacute": "\xF3",
          "&oacute;": "\xF3",
          "&oast;": "\u229B",
          "&ocir;": "\u229A",
          "&ocirc": "\xF4",
          "&ocirc;": "\xF4",
          "&ocy;": "\u043E",
          "&odash;": "\u229D",
          "&odblac;": "\u0151",
          "&odiv;": "\u2A38",
          "&odot;": "\u2299",
          "&odsold;": "\u29BC",
          "&oelig;": "\u0153",
          "&ofcir;": "\u29BF",
          "&ofr;": "\uD835\uDD2C",
          "&ogon;": "\u02DB",
          "&ograve": "\xF2",
          "&ograve;": "\xF2",
          "&ogt;": "\u29C1",
          "&ohbar;": "\u29B5",
          "&ohm;": "\u03A9",
          "&oint;": "\u222E",
          "&olarr;": "\u21BA",
          "&olcir;": "\u29BE",
          "&olcross;": "\u29BB",
          "&oline;": "\u203E",
          "&olt;": "\u29C0",
          "&omacr;": "\u014D",
          "&omega;": "\u03C9",
          "&omicron;": "\u03BF",
          "&omid;": "\u29B6",
          "&ominus;": "\u2296",
          "&oopf;": "\uD835\uDD60",
          "&opar;": "\u29B7",
          "&operp;": "\u29B9",
          "&oplus;": "\u2295",
          "&or;": "\u2228",
          "&orarr;": "\u21BB",
          "&ord;": "\u2A5D",
          "&order;": "\u2134",
          "&orderof;": "\u2134",
          "&ordf": "\xAA",
          "&ordf;": "\xAA",
          "&ordm": "\xBA",
          "&ordm;": "\xBA",
          "&origof;": "\u22B6",
          "&oror;": "\u2A56",
          "&orslope;": "\u2A57",
          "&orv;": "\u2A5B",
          "&oscr;": "\u2134",
          "&oslash": "\xF8",
          "&oslash;": "\xF8",
          "&osol;": "\u2298",
          "&otilde": "\xF5",
          "&otilde;": "\xF5",
          "&otimes;": "\u2297",
          "&otimesas;": "\u2A36",
          "&ouml": "\xF6",
          "&ouml;": "\xF6",
          "&ovbar;": "\u233D",
          "&par;": "\u2225",
          "&para": "\xB6",
          "&para;": "\xB6",
          "&parallel;": "\u2225",
          "&parsim;": "\u2AF3",
          "&parsl;": "\u2AFD",
          "&part;": "\u2202",
          "&pcy;": "\u043F",
          "&percnt;": "%",
          "&period;": ".",
          "&permil;": "\u2030",
          "&perp;": "\u22A5",
          "&pertenk;": "\u2031",
          "&pfr;": "\uD835\uDD2D",
          "&phi;": "\u03C6",
          "&phiv;": "\u03D5",
          "&phmmat;": "\u2133",
          "&phone;": "\u260E",
          "&pi;": "\u03C0",
          "&pitchfork;": "\u22D4",
          "&piv;": "\u03D6",
          "&planck;": "\u210F",
          "&planckh;": "\u210E",
          "&plankv;": "\u210F",
          "&plus;": "+",
          "&plusacir;": "\u2A23",
          "&plusb;": "\u229E",
          "&pluscir;": "\u2A22",
          "&plusdo;": "\u2214",
          "&plusdu;": "\u2A25",
          "&pluse;": "\u2A72",
          "&plusmn": "\xB1",
          "&plusmn;": "\xB1",
          "&plussim;": "\u2A26",
          "&plustwo;": "\u2A27",
          "&pm;": "\xB1",
          "&pointint;": "\u2A15",
          "&popf;": "\uD835\uDD61",
          "&pound": "\xA3",
          "&pound;": "\xA3",
          "&pr;": "\u227A",
          "&prE;": "\u2AB3",
          "&prap;": "\u2AB7",
          "&prcue;": "\u227C",
          "&pre;": "\u2AAF",
          "&prec;": "\u227A",
          "&precapprox;": "\u2AB7",
          "&preccurlyeq;": "\u227C",
          "&preceq;": "\u2AAF",
          "&precnapprox;": "\u2AB9",
          "&precneqq;": "\u2AB5",
          "&precnsim;": "\u22E8",
          "&precsim;": "\u227E",
          "&prime;": "\u2032",
          "&primes;": "\u2119",
          "&prnE;": "\u2AB5",
          "&prnap;": "\u2AB9",
          "&prnsim;": "\u22E8",
          "&prod;": "\u220F",
          "&profalar;": "\u232E",
          "&profline;": "\u2312",
          "&profsurf;": "\u2313",
          "&prop;": "\u221D",
          "&propto;": "\u221D",
          "&prsim;": "\u227E",
          "&prurel;": "\u22B0",
          "&pscr;": "\uD835\uDCC5",
          "&psi;": "\u03C8",
          "&puncsp;": "\u2008",
          "&qfr;": "\uD835\uDD2E",
          "&qint;": "\u2A0C",
          "&qopf;": "\uD835\uDD62",
          "&qprime;": "\u2057",
          "&qscr;": "\uD835\uDCC6",
          "&quaternions;": "\u210D",
          "&quatint;": "\u2A16",
          "&quest;": "?",
          "&questeq;": "\u225F",
          "&quot": '"',
          "&quot;": '"',
          "&rAarr;": "\u21DB",
          "&rArr;": "\u21D2",
          "&rAtail;": "\u291C",
          "&rBarr;": "\u290F",
          "&rHar;": "\u2964",
          "&race;": "\u223D\u0331",
          "&racute;": "\u0155",
          "&radic;": "\u221A",
          "&raemptyv;": "\u29B3",
          "&rang;": "\u27E9",
          "&rangd;": "\u2992",
          "&range;": "\u29A5",
          "&rangle;": "\u27E9",
          "&raquo": "\xBB",
          "&raquo;": "\xBB",
          "&rarr;": "\u2192",
          "&rarrap;": "\u2975",
          "&rarrb;": "\u21E5",
          "&rarrbfs;": "\u2920",
          "&rarrc;": "\u2933",
          "&rarrfs;": "\u291E",
          "&rarrhk;": "\u21AA",
          "&rarrlp;": "\u21AC",
          "&rarrpl;": "\u2945",
          "&rarrsim;": "\u2974",
          "&rarrtl;": "\u21A3",
          "&rarrw;": "\u219D",
          "&ratail;": "\u291A",
          "&ratio;": "\u2236",
          "&rationals;": "\u211A",
          "&rbarr;": "\u290D",
          "&rbbrk;": "\u2773",
          "&rbrace;": "}",
          "&rbrack;": "]",
          "&rbrke;": "\u298C",
          "&rbrksld;": "\u298E",
          "&rbrkslu;": "\u2990",
          "&rcaron;": "\u0159",
          "&rcedil;": "\u0157",
          "&rceil;": "\u2309",
          "&rcub;": "}",
          "&rcy;": "\u0440",
          "&rdca;": "\u2937",
          "&rdldhar;": "\u2969",
          "&rdquo;": "\u201D",
          "&rdquor;": "\u201D",
          "&rdsh;": "\u21B3",
          "&real;": "\u211C",
          "&realine;": "\u211B",
          "&realpart;": "\u211C",
          "&reals;": "\u211D",
          "&rect;": "\u25AD",
          "&reg": "\xAE",
          "&reg;": "\xAE",
          "&rfisht;": "\u297D",
          "&rfloor;": "\u230B",
          "&rfr;": "\uD835\uDD2F",
          "&rhard;": "\u21C1",
          "&rharu;": "\u21C0",
          "&rharul;": "\u296C",
          "&rho;": "\u03C1",
          "&rhov;": "\u03F1",
          "&rightarrow;": "\u2192",
          "&rightarrowtail;": "\u21A3",
          "&rightharpoondown;": "\u21C1",
          "&rightharpoonup;": "\u21C0",
          "&rightleftarrows;": "\u21C4",
          "&rightleftharpoons;": "\u21CC",
          "&rightrightarrows;": "\u21C9",
          "&rightsquigarrow;": "\u219D",
          "&rightthreetimes;": "\u22CC",
          "&ring;": "\u02DA",
          "&risingdotseq;": "\u2253",
          "&rlarr;": "\u21C4",
          "&rlhar;": "\u21CC",
          "&rlm;": "\u200F",
          "&rmoust;": "\u23B1",
          "&rmoustache;": "\u23B1",
          "&rnmid;": "\u2AEE",
          "&roang;": "\u27ED",
          "&roarr;": "\u21FE",
          "&robrk;": "\u27E7",
          "&ropar;": "\u2986",
          "&ropf;": "\uD835\uDD63",
          "&roplus;": "\u2A2E",
          "&rotimes;": "\u2A35",
          "&rpar;": ")",
          "&rpargt;": "\u2994",
          "&rppolint;": "\u2A12",
          "&rrarr;": "\u21C9",
          "&rsaquo;": "\u203A",
          "&rscr;": "\uD835\uDCC7",
          "&rsh;": "\u21B1",
          "&rsqb;": "]",
          "&rsquo;": "\u2019",
          "&rsquor;": "\u2019",
          "&rthree;": "\u22CC",
          "&rtimes;": "\u22CA",
          "&rtri;": "\u25B9",
          "&rtrie;": "\u22B5",
          "&rtrif;": "\u25B8",
          "&rtriltri;": "\u29CE",
          "&ruluhar;": "\u2968",
          "&rx;": "\u211E",
          "&sacute;": "\u015B",
          "&sbquo;": "\u201A",
          "&sc;": "\u227B",
          "&scE;": "\u2AB4",
          "&scap;": "\u2AB8",
          "&scaron;": "\u0161",
          "&sccue;": "\u227D",
          "&sce;": "\u2AB0",
          "&scedil;": "\u015F",
          "&scirc;": "\u015D",
          "&scnE;": "\u2AB6",
          "&scnap;": "\u2ABA",
          "&scnsim;": "\u22E9",
          "&scpolint;": "\u2A13",
          "&scsim;": "\u227F",
          "&scy;": "\u0441",
          "&sdot;": "\u22C5",
          "&sdotb;": "\u22A1",
          "&sdote;": "\u2A66",
          "&seArr;": "\u21D8",
          "&searhk;": "\u2925",
          "&searr;": "\u2198",
          "&searrow;": "\u2198",
          "&sect": "\xA7",
          "&sect;": "\xA7",
          "&semi;": ";",
          "&seswar;": "\u2929",
          "&setminus;": "\u2216",
          "&setmn;": "\u2216",
          "&sext;": "\u2736",
          "&sfr;": "\uD835\uDD30",
          "&sfrown;": "\u2322",
          "&sharp;": "\u266F",
          "&shchcy;": "\u0449",
          "&shcy;": "\u0448",
          "&shortmid;": "\u2223",
          "&shortparallel;": "\u2225",
          "&shy": "\xAD",
          "&shy;": "\xAD",
          "&sigma;": "\u03C3",
          "&sigmaf;": "\u03C2",
          "&sigmav;": "\u03C2",
          "&sim;": "\u223C",
          "&simdot;": "\u2A6A",
          "&sime;": "\u2243",
          "&simeq;": "\u2243",
          "&simg;": "\u2A9E",
          "&simgE;": "\u2AA0",
          "&siml;": "\u2A9D",
          "&simlE;": "\u2A9F",
          "&simne;": "\u2246",
          "&simplus;": "\u2A24",
          "&simrarr;": "\u2972",
          "&slarr;": "\u2190",
          "&smallsetminus;": "\u2216",
          "&smashp;": "\u2A33",
          "&smeparsl;": "\u29E4",
          "&smid;": "\u2223",
          "&smile;": "\u2323",
          "&smt;": "\u2AAA",
          "&smte;": "\u2AAC",
          "&smtes;": "\u2AAC\uFE00",
          "&softcy;": "\u044C",
          "&sol;": "/",
          "&solb;": "\u29C4",
          "&solbar;": "\u233F",
          "&sopf;": "\uD835\uDD64",
          "&spades;": "\u2660",
          "&spadesuit;": "\u2660",
          "&spar;": "\u2225",
          "&sqcap;": "\u2293",
          "&sqcaps;": "\u2293\uFE00",
          "&sqcup;": "\u2294",
          "&sqcups;": "\u2294\uFE00",
          "&sqsub;": "\u228F",
          "&sqsube;": "\u2291",
          "&sqsubset;": "\u228F",
          "&sqsubseteq;": "\u2291",
          "&sqsup;": "\u2290",
          "&sqsupe;": "\u2292",
          "&sqsupset;": "\u2290",
          "&sqsupseteq;": "\u2292",
          "&squ;": "\u25A1",
          "&square;": "\u25A1",
          "&squarf;": "\u25AA",
          "&squf;": "\u25AA",
          "&srarr;": "\u2192",
          "&sscr;": "\uD835\uDCC8",
          "&ssetmn;": "\u2216",
          "&ssmile;": "\u2323",
          "&sstarf;": "\u22C6",
          "&star;": "\u2606",
          "&starf;": "\u2605",
          "&straightepsilon;": "\u03F5",
          "&straightphi;": "\u03D5",
          "&strns;": "\xAF",
          "&sub;": "\u2282",
          "&subE;": "\u2AC5",
          "&subdot;": "\u2ABD",
          "&sube;": "\u2286",
          "&subedot;": "\u2AC3",
          "&submult;": "\u2AC1",
          "&subnE;": "\u2ACB",
          "&subne;": "\u228A",
          "&subplus;": "\u2ABF",
          "&subrarr;": "\u2979",
          "&subset;": "\u2282",
          "&subseteq;": "\u2286",
          "&subseteqq;": "\u2AC5",
          "&subsetneq;": "\u228A",
          "&subsetneqq;": "\u2ACB",
          "&subsim;": "\u2AC7",
          "&subsub;": "\u2AD5",
          "&subsup;": "\u2AD3",
          "&succ;": "\u227B",
          "&succapprox;": "\u2AB8",
          "&succcurlyeq;": "\u227D",
          "&succeq;": "\u2AB0",
          "&succnapprox;": "\u2ABA",
          "&succneqq;": "\u2AB6",
          "&succnsim;": "\u22E9",
          "&succsim;": "\u227F",
          "&sum;": "\u2211",
          "&sung;": "\u266A",
          "&sup1": "\xB9",
          "&sup1;": "\xB9",
          "&sup2": "\xB2",
          "&sup2;": "\xB2",
          "&sup3": "\xB3",
          "&sup3;": "\xB3",
          "&sup;": "\u2283",
          "&supE;": "\u2AC6",
          "&supdot;": "\u2ABE",
          "&supdsub;": "\u2AD8",
          "&supe;": "\u2287",
          "&supedot;": "\u2AC4",
          "&suphsol;": "\u27C9",
          "&suphsub;": "\u2AD7",
          "&suplarr;": "\u297B",
          "&supmult;": "\u2AC2",
          "&supnE;": "\u2ACC",
          "&supne;": "\u228B",
          "&supplus;": "\u2AC0",
          "&supset;": "\u2283",
          "&supseteq;": "\u2287",
          "&supseteqq;": "\u2AC6",
          "&supsetneq;": "\u228B",
          "&supsetneqq;": "\u2ACC",
          "&supsim;": "\u2AC8",
          "&supsub;": "\u2AD4",
          "&supsup;": "\u2AD6",
          "&swArr;": "\u21D9",
          "&swarhk;": "\u2926",
          "&swarr;": "\u2199",
          "&swarrow;": "\u2199",
          "&swnwar;": "\u292A",
          "&szlig": "\xDF",
          "&szlig;": "\xDF",
          "&target;": "\u2316",
          "&tau;": "\u03C4",
          "&tbrk;": "\u23B4",
          "&tcaron;": "\u0165",
          "&tcedil;": "\u0163",
          "&tcy;": "\u0442",
          "&tdot;": "\u20DB",
          "&telrec;": "\u2315",
          "&tfr;": "\uD835\uDD31",
          "&there4;": "\u2234",
          "&therefore;": "\u2234",
          "&theta;": "\u03B8",
          "&thetasym;": "\u03D1",
          "&thetav;": "\u03D1",
          "&thickapprox;": "\u2248",
          "&thicksim;": "\u223C",
          "&thinsp;": "\u2009",
          "&thkap;": "\u2248",
          "&thksim;": "\u223C",
          "&thorn": "\xFE",
          "&thorn;": "\xFE",
          "&tilde;": "\u02DC",
          "&times": "\xD7",
          "&times;": "\xD7",
          "&timesb;": "\u22A0",
          "&timesbar;": "\u2A31",
          "&timesd;": "\u2A30",
          "&tint;": "\u222D",
          "&toea;": "\u2928",
          "&top;": "\u22A4",
          "&topbot;": "\u2336",
          "&topcir;": "\u2AF1",
          "&topf;": "\uD835\uDD65",
          "&topfork;": "\u2ADA",
          "&tosa;": "\u2929",
          "&tprime;": "\u2034",
          "&trade;": "\u2122",
          "&triangle;": "\u25B5",
          "&triangledown;": "\u25BF",
          "&triangleleft;": "\u25C3",
          "&trianglelefteq;": "\u22B4",
          "&triangleq;": "\u225C",
          "&triangleright;": "\u25B9",
          "&trianglerighteq;": "\u22B5",
          "&tridot;": "\u25EC",
          "&trie;": "\u225C",
          "&triminus;": "\u2A3A",
          "&triplus;": "\u2A39",
          "&trisb;": "\u29CD",
          "&tritime;": "\u2A3B",
          "&trpezium;": "\u23E2",
          "&tscr;": "\uD835\uDCC9",
          "&tscy;": "\u0446",
          "&tshcy;": "\u045B",
          "&tstrok;": "\u0167",
          "&twixt;": "\u226C",
          "&twoheadleftarrow;": "\u219E",
          "&twoheadrightarrow;": "\u21A0",
          "&uArr;": "\u21D1",
          "&uHar;": "\u2963",
          "&uacute": "\xFA",
          "&uacute;": "\xFA",
          "&uarr;": "\u2191",
          "&ubrcy;": "\u045E",
          "&ubreve;": "\u016D",
          "&ucirc": "\xFB",
          "&ucirc;": "\xFB",
          "&ucy;": "\u0443",
          "&udarr;": "\u21C5",
          "&udblac;": "\u0171",
          "&udhar;": "\u296E",
          "&ufisht;": "\u297E",
          "&ufr;": "\uD835\uDD32",
          "&ugrave": "\xF9",
          "&ugrave;": "\xF9",
          "&uharl;": "\u21BF",
          "&uharr;": "\u21BE",
          "&uhblk;": "\u2580",
          "&ulcorn;": "\u231C",
          "&ulcorner;": "\u231C",
          "&ulcrop;": "\u230F",
          "&ultri;": "\u25F8",
          "&umacr;": "\u016B",
          "&uml": "\xA8",
          "&uml;": "\xA8",
          "&uogon;": "\u0173",
          "&uopf;": "\uD835\uDD66",
          "&uparrow;": "\u2191",
          "&updownarrow;": "\u2195",
          "&upharpoonleft;": "\u21BF",
          "&upharpoonright;": "\u21BE",
          "&uplus;": "\u228E",
          "&upsi;": "\u03C5",
          "&upsih;": "\u03D2",
          "&upsilon;": "\u03C5",
          "&upuparrows;": "\u21C8",
          "&urcorn;": "\u231D",
          "&urcorner;": "\u231D",
          "&urcrop;": "\u230E",
          "&uring;": "\u016F",
          "&urtri;": "\u25F9",
          "&uscr;": "\uD835\uDCCA",
          "&utdot;": "\u22F0",
          "&utilde;": "\u0169",
          "&utri;": "\u25B5",
          "&utrif;": "\u25B4",
          "&uuarr;": "\u21C8",
          "&uuml": "\xFC",
          "&uuml;": "\xFC",
          "&uwangle;": "\u29A7",
          "&vArr;": "\u21D5",
          "&vBar;": "\u2AE8",
          "&vBarv;": "\u2AE9",
          "&vDash;": "\u22A8",
          "&vangrt;": "\u299C",
          "&varepsilon;": "\u03F5",
          "&varkappa;": "\u03F0",
          "&varnothing;": "\u2205",
          "&varphi;": "\u03D5",
          "&varpi;": "\u03D6",
          "&varpropto;": "\u221D",
          "&varr;": "\u2195",
          "&varrho;": "\u03F1",
          "&varsigma;": "\u03C2",
          "&varsubsetneq;": "\u228A\uFE00",
          "&varsubsetneqq;": "\u2ACB\uFE00",
          "&varsupsetneq;": "\u228B\uFE00",
          "&varsupsetneqq;": "\u2ACC\uFE00",
          "&vartheta;": "\u03D1",
          "&vartriangleleft;": "\u22B2",
          "&vartriangleright;": "\u22B3",
          "&vcy;": "\u0432",
          "&vdash;": "\u22A2",
          "&vee;": "\u2228",
          "&veebar;": "\u22BB",
          "&veeeq;": "\u225A",
          "&vellip;": "\u22EE",
          "&verbar;": "|",
          "&vert;": "|",
          "&vfr;": "\uD835\uDD33",
          "&vltri;": "\u22B2",
          "&vnsub;": "\u2282\u20D2",
          "&vnsup;": "\u2283\u20D2",
          "&vopf;": "\uD835\uDD67",
          "&vprop;": "\u221D",
          "&vrtri;": "\u22B3",
          "&vscr;": "\uD835\uDCCB",
          "&vsubnE;": "\u2ACB\uFE00",
          "&vsubne;": "\u228A\uFE00",
          "&vsupnE;": "\u2ACC\uFE00",
          "&vsupne;": "\u228B\uFE00",
          "&vzigzag;": "\u299A",
          "&wcirc;": "\u0175",
          "&wedbar;": "\u2A5F",
          "&wedge;": "\u2227",
          "&wedgeq;": "\u2259",
          "&weierp;": "\u2118",
          "&wfr;": "\uD835\uDD34",
          "&wopf;": "\uD835\uDD68",
          "&wp;": "\u2118",
          "&wr;": "\u2240",
          "&wreath;": "\u2240",
          "&wscr;": "\uD835\uDCCC",
          "&xcap;": "\u22C2",
          "&xcirc;": "\u25EF",
          "&xcup;": "\u22C3",
          "&xdtri;": "\u25BD",
          "&xfr;": "\uD835\uDD35",
          "&xhArr;": "\u27FA",
          "&xharr;": "\u27F7",
          "&xi;": "\u03BE",
          "&xlArr;": "\u27F8",
          "&xlarr;": "\u27F5",
          "&xmap;": "\u27FC",
          "&xnis;": "\u22FB",
          "&xodot;": "\u2A00",
          "&xopf;": "\uD835\uDD69",
          "&xoplus;": "\u2A01",
          "&xotime;": "\u2A02",
          "&xrArr;": "\u27F9",
          "&xrarr;": "\u27F6",
          "&xscr;": "\uD835\uDCCD",
          "&xsqcup;": "\u2A06",
          "&xuplus;": "\u2A04",
          "&xutri;": "\u25B3",
          "&xvee;": "\u22C1",
          "&xwedge;": "\u22C0",
          "&yacute": "\xFD",
          "&yacute;": "\xFD",
          "&yacy;": "\u044F",
          "&ycirc;": "\u0177",
          "&ycy;": "\u044B",
          "&yen": "\xA5",
          "&yen;": "\xA5",
          "&yfr;": "\uD835\uDD36",
          "&yicy;": "\u0457",
          "&yopf;": "\uD835\uDD6A",
          "&yscr;": "\uD835\uDCCE",
          "&yucy;": "\u044E",
          "&yuml": "\xFF",
          "&yuml;": "\xFF",
          "&zacute;": "\u017A",
          "&zcaron;": "\u017E",
          "&zcy;": "\u0437",
          "&zdot;": "\u017C",
          "&zeetrf;": "\u2128",
          "&zeta;": "\u03B6",
          "&zfr;": "\uD835\uDD37",
          "&zhcy;": "\u0436",
          "&zigrarr;": "\u21DD",
          "&zopf;": "\uD835\uDD6B",
          "&zscr;": "\uD835\uDCCF",
          "&zwj;": "\u200D",
          "&zwnj;": "\u200C"
        },
        characters: {
          \u00C6: "&AElig;",
          "&": "&amp;",
          \u00C1: "&Aacute;",
          \u0102: "&Abreve;",
          \u00C2: "&Acirc;",
          \u0410: "&Acy;",
          "\uD835\uDD04": "&Afr;",
          \u00C0: "&Agrave;",
          \u0391: "&Alpha;",
          \u0100: "&Amacr;",
          "\u2A53": "&And;",
          \u0104: "&Aogon;",
          "\uD835\uDD38": "&Aopf;",
          "\u2061": "&af;",
          \u00C5: "&angst;",
          "\uD835\uDC9C": "&Ascr;",
          "\u2254": "&coloneq;",
          \u00C3: "&Atilde;",
          \u00C4: "&Auml;",
          "\u2216": "&ssetmn;",
          "\u2AE7": "&Barv;",
          "\u2306": "&doublebarwedge;",
          \u0411: "&Bcy;",
          "\u2235": "&because;",
          \u212C: "&bernou;",
          \u0392: "&Beta;",
          "\uD835\uDD05": "&Bfr;",
          "\uD835\uDD39": "&Bopf;",
          "\u02D8": "&breve;",
          "\u224E": "&bump;",
          \u0427: "&CHcy;",
          "\xA9": "&copy;",
          \u0106: "&Cacute;",
          "\u22D2": "&Cap;",
          "\u2145": "&DD;",
          \u212D: "&Cfr;",
          \u010C: "&Ccaron;",
          \u00C7: "&Ccedil;",
          \u0108: "&Ccirc;",
          "\u2230": "&Cconint;",
          \u010A: "&Cdot;",
          "\xB8": "&cedil;",
          "\xB7": "&middot;",
          \u03A7: "&Chi;",
          "\u2299": "&odot;",
          "\u2296": "&ominus;",
          "\u2295": "&oplus;",
          "\u2297": "&otimes;",
          "\u2232": "&cwconint;",
          "\u201D": "&rdquor;",
          "\u2019": "&rsquor;",
          "\u2237": "&Proportion;",
          "\u2A74": "&Colone;",
          "\u2261": "&equiv;",
          "\u222F": "&DoubleContourIntegral;",
          "\u222E": "&oint;",
          \u2102: "&complexes;",
          "\u2210": "&coprod;",
          "\u2233": "&awconint;",
          "\u2A2F": "&Cross;",
          "\uD835\uDC9E": "&Cscr;",
          "\u22D3": "&Cup;",
          "\u224D": "&asympeq;",
          "\u2911": "&DDotrahd;",
          \u0402: "&DJcy;",
          \u0405: "&DScy;",
          \u040F: "&DZcy;",
          "\u2021": "&ddagger;",
          "\u21A1": "&Darr;",
          "\u2AE4": "&DoubleLeftTee;",
          \u010E: "&Dcaron;",
          \u0414: "&Dcy;",
          "\u2207": "&nabla;",
          \u0394: "&Delta;",
          "\uD835\uDD07": "&Dfr;",
          "\xB4": "&acute;",
          "\u02D9": "&dot;",
          "\u02DD": "&dblac;",
          "`": "&grave;",
          "\u02DC": "&tilde;",
          "\u22C4": "&diamond;",
          "\u2146": "&dd;",
          "\uD835\uDD3B": "&Dopf;",
          "\xA8": "&uml;",
          "\u20DC": "&DotDot;",
          "\u2250": "&esdot;",
          "\u21D3": "&dArr;",
          "\u21D0": "&lArr;",
          "\u21D4": "&iff;",
          "\u27F8": "&xlArr;",
          "\u27FA": "&xhArr;",
          "\u27F9": "&xrArr;",
          "\u21D2": "&rArr;",
          "\u22A8": "&vDash;",
          "\u21D1": "&uArr;",
          "\u21D5": "&vArr;",
          "\u2225": "&spar;",
          "\u2193": "&downarrow;",
          "\u2913": "&DownArrowBar;",
          "\u21F5": "&duarr;",
          "\u0311": "&DownBreve;",
          "\u2950": "&DownLeftRightVector;",
          "\u295E": "&DownLeftTeeVector;",
          "\u21BD": "&lhard;",
          "\u2956": "&DownLeftVectorBar;",
          "\u295F": "&DownRightTeeVector;",
          "\u21C1": "&rightharpoondown;",
          "\u2957": "&DownRightVectorBar;",
          "\u22A4": "&top;",
          "\u21A7": "&mapstodown;",
          "\uD835\uDC9F": "&Dscr;",
          \u0110: "&Dstrok;",
          \u014A: "&ENG;",
          \u00D0: "&ETH;",
          \u00C9: "&Eacute;",
          \u011A: "&Ecaron;",
          \u00CA: "&Ecirc;",
          \u042D: "&Ecy;",
          \u0116: "&Edot;",
          "\uD835\uDD08": "&Efr;",
          \u00C8: "&Egrave;",
          "\u2208": "&isinv;",
          \u0112: "&Emacr;",
          "\u25FB": "&EmptySmallSquare;",
          "\u25AB": "&EmptyVerySmallSquare;",
          \u0118: "&Eogon;",
          "\uD835\uDD3C": "&Eopf;",
          \u0395: "&Epsilon;",
          "\u2A75": "&Equal;",
          "\u2242": "&esim;",
          "\u21CC": "&rlhar;",
          \u2130: "&expectation;",
          "\u2A73": "&Esim;",
          \u0397: "&Eta;",
          \u00CB: "&Euml;",
          "\u2203": "&exist;",
          "\u2147": "&exponentiale;",
          \u0424: "&Fcy;",
          "\uD835\uDD09": "&Ffr;",
          "\u25FC": "&FilledSmallSquare;",
          "\u25AA": "&squf;",
          "\uD835\uDD3D": "&Fopf;",
          "\u2200": "&forall;",
          \u2131: "&Fscr;",
          \u0403: "&GJcy;",
          ">": "&gt;",
          \u0393: "&Gamma;",
          \u03DC: "&Gammad;",
          \u011E: "&Gbreve;",
          \u0122: "&Gcedil;",
          \u011C: "&Gcirc;",
          \u0413: "&Gcy;",
          \u0120: "&Gdot;",
          "\uD835\uDD0A": "&Gfr;",
          "\u22D9": "&ggg;",
          "\uD835\uDD3E": "&Gopf;",
          "\u2265": "&geq;",
          "\u22DB": "&gtreqless;",
          "\u2267": "&geqq;",
          "\u2AA2": "&GreaterGreater;",
          "\u2277": "&gtrless;",
          "\u2A7E": "&ges;",
          "\u2273": "&gtrsim;",
          "\uD835\uDCA2": "&Gscr;",
          "\u226B": "&gg;",
          \u042A: "&HARDcy;",
          "\u02C7": "&caron;",
          "^": "&Hat;",
          \u0124: "&Hcirc;",
          \u210C: "&Poincareplane;",
          \u210B: "&hamilt;",
          \u210D: "&quaternions;",
          "\u2500": "&boxh;",
          \u0126: "&Hstrok;",
          "\u224F": "&bumpeq;",
          \u0415: "&IEcy;",
          \u0132: "&IJlig;",
          \u0401: "&IOcy;",
          \u00CD: "&Iacute;",
          \u00CE: "&Icirc;",
          \u0418: "&Icy;",
          \u0130: "&Idot;",
          \u2111: "&imagpart;",
          \u00CC: "&Igrave;",
          \u012A: "&Imacr;",
          "\u2148": "&ii;",
          "\u222C": "&Int;",
          "\u222B": "&int;",
          "\u22C2": "&xcap;",
          "\u2063": "&ic;",
          "\u2062": "&it;",
          \u012E: "&Iogon;",
          "\uD835\uDD40": "&Iopf;",
          \u0399: "&Iota;",
          \u2110: "&imagline;",
          \u0128: "&Itilde;",
          \u0406: "&Iukcy;",
          \u00CF: "&Iuml;",
          \u0134: "&Jcirc;",
          \u0419: "&Jcy;",
          "\uD835\uDD0D": "&Jfr;",
          "\uD835\uDD41": "&Jopf;",
          "\uD835\uDCA5": "&Jscr;",
          \u0408: "&Jsercy;",
          \u0404: "&Jukcy;",
          \u0425: "&KHcy;",
          \u040C: "&KJcy;",
          \u039A: "&Kappa;",
          \u0136: "&Kcedil;",
          \u041A: "&Kcy;",
          "\uD835\uDD0E": "&Kfr;",
          "\uD835\uDD42": "&Kopf;",
          "\uD835\uDCA6": "&Kscr;",
          \u0409: "&LJcy;",
          "<": "&lt;",
          \u0139: "&Lacute;",
          \u039B: "&Lambda;",
          "\u27EA": "&Lang;",
          \u2112: "&lagran;",
          "\u219E": "&twoheadleftarrow;",
          \u013D: "&Lcaron;",
          \u013B: "&Lcedil;",
          \u041B: "&Lcy;",
          "\u27E8": "&langle;",
          "\u2190": "&slarr;",
          "\u21E4": "&larrb;",
          "\u21C6": "&lrarr;",
          "\u2308": "&lceil;",
          "\u27E6": "&lobrk;",
          "\u2961": "&LeftDownTeeVector;",
          "\u21C3": "&downharpoonleft;",
          "\u2959": "&LeftDownVectorBar;",
          "\u230A": "&lfloor;",
          "\u2194": "&leftrightarrow;",
          "\u294E": "&LeftRightVector;",
          "\u22A3": "&dashv;",
          "\u21A4": "&mapstoleft;",
          "\u295A": "&LeftTeeVector;",
          "\u22B2": "&vltri;",
          "\u29CF": "&LeftTriangleBar;",
          "\u22B4": "&trianglelefteq;",
          "\u2951": "&LeftUpDownVector;",
          "\u2960": "&LeftUpTeeVector;",
          "\u21BF": "&upharpoonleft;",
          "\u2958": "&LeftUpVectorBar;",
          "\u21BC": "&lharu;",
          "\u2952": "&LeftVectorBar;",
          "\u22DA": "&lesseqgtr;",
          "\u2266": "&leqq;",
          "\u2276": "&lg;",
          "\u2AA1": "&LessLess;",
          "\u2A7D": "&les;",
          "\u2272": "&lsim;",
          "\uD835\uDD0F": "&Lfr;",
          "\u22D8": "&Ll;",
          "\u21DA": "&lAarr;",
          \u013F: "&Lmidot;",
          "\u27F5": "&xlarr;",
          "\u27F7": "&xharr;",
          "\u27F6": "&xrarr;",
          "\uD835\uDD43": "&Lopf;",
          "\u2199": "&swarrow;",
          "\u2198": "&searrow;",
          "\u21B0": "&lsh;",
          \u0141: "&Lstrok;",
          "\u226A": "&ll;",
          "\u2905": "&Map;",
          \u041C: "&Mcy;",
          "\u205F": "&MediumSpace;",
          \u2133: "&phmmat;",
          "\uD835\uDD10": "&Mfr;",
          "\u2213": "&mp;",
          "\uD835\uDD44": "&Mopf;",
          \u039C: "&Mu;",
          \u040A: "&NJcy;",
          \u0143: "&Nacute;",
          \u0147: "&Ncaron;",
          \u0145: "&Ncedil;",
          \u041D: "&Ncy;",
          "\u200B": "&ZeroWidthSpace;",
          "\n": "&NewLine;",
          "\uD835\uDD11": "&Nfr;",
          "\u2060": "&NoBreak;",
          "\xA0": "&nbsp;",
          \u2115: "&naturals;",
          "\u2AEC": "&Not;",
          "\u2262": "&nequiv;",
          "\u226D": "&NotCupCap;",
          "\u2226": "&nspar;",
          "\u2209": "&notinva;",
          "\u2260": "&ne;",
          "\u2242\u0338": "&nesim;",
          "\u2204": "&nexists;",
          "\u226F": "&ngtr;",
          "\u2271": "&ngeq;",
          "\u2267\u0338": "&ngeqq;",
          "\u226B\u0338": "&nGtv;",
          "\u2279": "&ntgl;",
          "\u2A7E\u0338": "&nges;",
          "\u2275": "&ngsim;",
          "\u224E\u0338": "&nbump;",
          "\u224F\u0338": "&nbumpe;",
          "\u22EA": "&ntriangleleft;",
          "\u29CF\u0338": "&NotLeftTriangleBar;",
          "\u22EC": "&ntrianglelefteq;",
          "\u226E": "&nlt;",
          "\u2270": "&nleq;",
          "\u2278": "&ntlg;",
          "\u226A\u0338": "&nLtv;",
          "\u2A7D\u0338": "&nles;",
          "\u2274": "&nlsim;",
          "\u2AA2\u0338": "&NotNestedGreaterGreater;",
          "\u2AA1\u0338": "&NotNestedLessLess;",
          "\u2280": "&nprec;",
          "\u2AAF\u0338": "&npreceq;",
          "\u22E0": "&nprcue;",
          "\u220C": "&notniva;",
          "\u22EB": "&ntriangleright;",
          "\u29D0\u0338": "&NotRightTriangleBar;",
          "\u22ED": "&ntrianglerighteq;",
          "\u228F\u0338": "&NotSquareSubset;",
          "\u22E2": "&nsqsube;",
          "\u2290\u0338": "&NotSquareSuperset;",
          "\u22E3": "&nsqsupe;",
          "\u2282\u20D2": "&vnsub;",
          "\u2288": "&nsubseteq;",
          "\u2281": "&nsucc;",
          "\u2AB0\u0338": "&nsucceq;",
          "\u22E1": "&nsccue;",
          "\u227F\u0338": "&NotSucceedsTilde;",
          "\u2283\u20D2": "&vnsup;",
          "\u2289": "&nsupseteq;",
          "\u2241": "&nsim;",
          "\u2244": "&nsimeq;",
          "\u2247": "&ncong;",
          "\u2249": "&napprox;",
          "\u2224": "&nsmid;",
          "\uD835\uDCA9": "&Nscr;",
          \u00D1: "&Ntilde;",
          \u039D: "&Nu;",
          \u0152: "&OElig;",
          \u00D3: "&Oacute;",
          \u00D4: "&Ocirc;",
          \u041E: "&Ocy;",
          \u0150: "&Odblac;",
          "\uD835\uDD12": "&Ofr;",
          \u00D2: "&Ograve;",
          \u014C: "&Omacr;",
          \u03A9: "&ohm;",
          \u039F: "&Omicron;",
          "\uD835\uDD46": "&Oopf;",
          "\u201C": "&ldquo;",
          "\u2018": "&lsquo;",
          "\u2A54": "&Or;",
          "\uD835\uDCAA": "&Oscr;",
          \u00D8: "&Oslash;",
          \u00D5: "&Otilde;",
          "\u2A37": "&Otimes;",
          \u00D6: "&Ouml;",
          "\u203E": "&oline;",
          "\u23DE": "&OverBrace;",
          "\u23B4": "&tbrk;",
          "\u23DC": "&OverParenthesis;",
          "\u2202": "&part;",
          \u041F: "&Pcy;",
          "\uD835\uDD13": "&Pfr;",
          \u03A6: "&Phi;",
          \u03A0: "&Pi;",
          "\xB1": "&pm;",
          \u2119: "&primes;",
          "\u2ABB": "&Pr;",
          "\u227A": "&prec;",
          "\u2AAF": "&preceq;",
          "\u227C": "&preccurlyeq;",
          "\u227E": "&prsim;",
          "\u2033": "&Prime;",
          "\u220F": "&prod;",
          "\u221D": "&vprop;",
          "\uD835\uDCAB": "&Pscr;",
          \u03A8: "&Psi;",
          '"': "&quot;",
          "\uD835\uDD14": "&Qfr;",
          \u211A: "&rationals;",
          "\uD835\uDCAC": "&Qscr;",
          "\u2910": "&drbkarow;",
          "\xAE": "&reg;",
          \u0154: "&Racute;",
          "\u27EB": "&Rang;",
          "\u21A0": "&twoheadrightarrow;",
          "\u2916": "&Rarrtl;",
          \u0158: "&Rcaron;",
          \u0156: "&Rcedil;",
          \u0420: "&Rcy;",
          \u211C: "&realpart;",
          "\u220B": "&niv;",
          "\u21CB": "&lrhar;",
          "\u296F": "&duhar;",
          \u03A1: "&Rho;",
          "\u27E9": "&rangle;",
          "\u2192": "&srarr;",
          "\u21E5": "&rarrb;",
          "\u21C4": "&rlarr;",
          "\u2309": "&rceil;",
          "\u27E7": "&robrk;",
          "\u295D": "&RightDownTeeVector;",
          "\u21C2": "&downharpoonright;",
          "\u2955": "&RightDownVectorBar;",
          "\u230B": "&rfloor;",
          "\u22A2": "&vdash;",
          "\u21A6": "&mapsto;",
          "\u295B": "&RightTeeVector;",
          "\u22B3": "&vrtri;",
          "\u29D0": "&RightTriangleBar;",
          "\u22B5": "&trianglerighteq;",
          "\u294F": "&RightUpDownVector;",
          "\u295C": "&RightUpTeeVector;",
          "\u21BE": "&upharpoonright;",
          "\u2954": "&RightUpVectorBar;",
          "\u21C0": "&rightharpoonup;",
          "\u2953": "&RightVectorBar;",
          \u211D: "&reals;",
          "\u2970": "&RoundImplies;",
          "\u21DB": "&rAarr;",
          \u211B: "&realine;",
          "\u21B1": "&rsh;",
          "\u29F4": "&RuleDelayed;",
          \u0429: "&SHCHcy;",
          \u0428: "&SHcy;",
          \u042C: "&SOFTcy;",
          \u015A: "&Sacute;",
          "\u2ABC": "&Sc;",
          \u0160: "&Scaron;",
          \u015E: "&Scedil;",
          \u015C: "&Scirc;",
          \u0421: "&Scy;",
          "\uD835\uDD16": "&Sfr;",
          "\u2191": "&uparrow;",
          \u03A3: "&Sigma;",
          "\u2218": "&compfn;",
          "\uD835\uDD4A": "&Sopf;",
          "\u221A": "&radic;",
          "\u25A1": "&square;",
          "\u2293": "&sqcap;",
          "\u228F": "&sqsubset;",
          "\u2291": "&sqsubseteq;",
          "\u2290": "&sqsupset;",
          "\u2292": "&sqsupseteq;",
          "\u2294": "&sqcup;",
          "\uD835\uDCAE": "&Sscr;",
          "\u22C6": "&sstarf;",
          "\u22D0": "&Subset;",
          "\u2286": "&subseteq;",
          "\u227B": "&succ;",
          "\u2AB0": "&succeq;",
          "\u227D": "&succcurlyeq;",
          "\u227F": "&succsim;",
          "\u2211": "&sum;",
          "\u22D1": "&Supset;",
          "\u2283": "&supset;",
          "\u2287": "&supseteq;",
          \u00DE: "&THORN;",
          "\u2122": "&trade;",
          \u040B: "&TSHcy;",
          \u0426: "&TScy;",
          "	": "&Tab;",
          \u03A4: "&Tau;",
          \u0164: "&Tcaron;",
          \u0162: "&Tcedil;",
          \u0422: "&Tcy;",
          "\uD835\uDD17": "&Tfr;",
          "\u2234": "&therefore;",
          \u0398: "&Theta;",
          "\u205F\u200A": "&ThickSpace;",
          "\u2009": "&thinsp;",
          "\u223C": "&thksim;",
          "\u2243": "&simeq;",
          "\u2245": "&cong;",
          "\u2248": "&thkap;",
          "\uD835\uDD4B": "&Topf;",
          "\u20DB": "&tdot;",
          "\uD835\uDCAF": "&Tscr;",
          \u0166: "&Tstrok;",
          \u00DA: "&Uacute;",
          "\u219F": "&Uarr;",
          "\u2949": "&Uarrocir;",
          \u040E: "&Ubrcy;",
          \u016C: "&Ubreve;",
          \u00DB: "&Ucirc;",
          \u0423: "&Ucy;",
          \u0170: "&Udblac;",
          "\uD835\uDD18": "&Ufr;",
          \u00D9: "&Ugrave;",
          \u016A: "&Umacr;",
          _: "&lowbar;",
          "\u23DF": "&UnderBrace;",
          "\u23B5": "&bbrk;",
          "\u23DD": "&UnderParenthesis;",
          "\u22C3": "&xcup;",
          "\u228E": "&uplus;",
          \u0172: "&Uogon;",
          "\uD835\uDD4C": "&Uopf;",
          "\u2912": "&UpArrowBar;",
          "\u21C5": "&udarr;",
          "\u2195": "&varr;",
          "\u296E": "&udhar;",
          "\u22A5": "&perp;",
          "\u21A5": "&mapstoup;",
          "\u2196": "&nwarrow;",
          "\u2197": "&nearrow;",
          \u03D2: "&upsih;",
          \u03A5: "&Upsilon;",
          \u016E: "&Uring;",
          "\uD835\uDCB0": "&Uscr;",
          \u0168: "&Utilde;",
          \u00DC: "&Uuml;",
          "\u22AB": "&VDash;",
          "\u2AEB": "&Vbar;",
          \u0412: "&Vcy;",
          "\u22A9": "&Vdash;",
          "\u2AE6": "&Vdashl;",
          "\u22C1": "&xvee;",
          "\u2016": "&Vert;",
          "\u2223": "&smid;",
          "|": "&vert;",
          "\u2758": "&VerticalSeparator;",
          "\u2240": "&wreath;",
          "\u200A": "&hairsp;",
          "\uD835\uDD19": "&Vfr;",
          "\uD835\uDD4D": "&Vopf;",
          "\uD835\uDCB1": "&Vscr;",
          "\u22AA": "&Vvdash;",
          \u0174: "&Wcirc;",
          "\u22C0": "&xwedge;",
          "\uD835\uDD1A": "&Wfr;",
          "\uD835\uDD4E": "&Wopf;",
          "\uD835\uDCB2": "&Wscr;",
          "\uD835\uDD1B": "&Xfr;",
          \u039E: "&Xi;",
          "\uD835\uDD4F": "&Xopf;",
          "\uD835\uDCB3": "&Xscr;",
          \u042F: "&YAcy;",
          \u0407: "&YIcy;",
          \u042E: "&YUcy;",
          \u00DD: "&Yacute;",
          \u0176: "&Ycirc;",
          \u042B: "&Ycy;",
          "\uD835\uDD1C": "&Yfr;",
          "\uD835\uDD50": "&Yopf;",
          "\uD835\uDCB4": "&Yscr;",
          \u0178: "&Yuml;",
          \u0416: "&ZHcy;",
          \u0179: "&Zacute;",
          \u017D: "&Zcaron;",
          \u0417: "&Zcy;",
          \u017B: "&Zdot;",
          \u0396: "&Zeta;",
          \u2128: "&zeetrf;",
          \u2124: "&integers;",
          "\uD835\uDCB5": "&Zscr;",
          \u00E1: "&aacute;",
          \u0103: "&abreve;",
          "\u223E": "&mstpos;",
          "\u223E\u0333": "&acE;",
          "\u223F": "&acd;",
          \u00E2: "&acirc;",
          \u0430: "&acy;",
          \u00E6: "&aelig;",
          "\uD835\uDD1E": "&afr;",
          \u00E0: "&agrave;",
          \u2135: "&aleph;",
          \u03B1: "&alpha;",
          \u0101: "&amacr;",
          "\u2A3F": "&amalg;",
          "\u2227": "&wedge;",
          "\u2A55": "&andand;",
          "\u2A5C": "&andd;",
          "\u2A58": "&andslope;",
          "\u2A5A": "&andv;",
          "\u2220": "&angle;",
          "\u29A4": "&ange;",
          "\u2221": "&measuredangle;",
          "\u29A8": "&angmsdaa;",
          "\u29A9": "&angmsdab;",
          "\u29AA": "&angmsdac;",
          "\u29AB": "&angmsdad;",
          "\u29AC": "&angmsdae;",
          "\u29AD": "&angmsdaf;",
          "\u29AE": "&angmsdag;",
          "\u29AF": "&angmsdah;",
          "\u221F": "&angrt;",
          "\u22BE": "&angrtvb;",
          "\u299D": "&angrtvbd;",
          "\u2222": "&angsph;",
          "\u237C": "&angzarr;",
          \u0105: "&aogon;",
          "\uD835\uDD52": "&aopf;",
          "\u2A70": "&apE;",
          "\u2A6F": "&apacir;",
          "\u224A": "&approxeq;",
          "\u224B": "&apid;",
          "'": "&apos;",
          \u00E5: "&aring;",
          "\uD835\uDCB6": "&ascr;",
          "*": "&midast;",
          \u00E3: "&atilde;",
          \u00E4: "&auml;",
          "\u2A11": "&awint;",
          "\u2AED": "&bNot;",
          "\u224C": "&bcong;",
          "\u03F6": "&bepsi;",
          "\u2035": "&bprime;",
          "\u223D": "&bsim;",
          "\u22CD": "&bsime;",
          "\u22BD": "&barvee;",
          "\u2305": "&barwedge;",
          "\u23B6": "&bbrktbrk;",
          \u0431: "&bcy;",
          "\u201E": "&ldquor;",
          "\u29B0": "&bemptyv;",
          \u03B2: "&beta;",
          \u2136: "&beth;",
          "\u226C": "&twixt;",
          "\uD835\uDD1F": "&bfr;",
          "\u25EF": "&xcirc;",
          "\u2A00": "&xodot;",
          "\u2A01": "&xoplus;",
          "\u2A02": "&xotime;",
          "\u2A06": "&xsqcup;",
          "\u2605": "&starf;",
          "\u25BD": "&xdtri;",
          "\u25B3": "&xutri;",
          "\u2A04": "&xuplus;",
          "\u290D": "&rbarr;",
          "\u29EB": "&lozf;",
          "\u25B4": "&utrif;",
          "\u25BE": "&dtrif;",
          "\u25C2": "&ltrif;",
          "\u25B8": "&rtrif;",
          "\u2423": "&blank;",
          "\u2592": "&blk12;",
          "\u2591": "&blk14;",
          "\u2593": "&blk34;",
          "\u2588": "&block;",
          "=\u20E5": "&bne;",
          "\u2261\u20E5": "&bnequiv;",
          "\u2310": "&bnot;",
          "\uD835\uDD53": "&bopf;",
          "\u22C8": "&bowtie;",
          "\u2557": "&boxDL;",
          "\u2554": "&boxDR;",
          "\u2556": "&boxDl;",
          "\u2553": "&boxDr;",
          "\u2550": "&boxH;",
          "\u2566": "&boxHD;",
          "\u2569": "&boxHU;",
          "\u2564": "&boxHd;",
          "\u2567": "&boxHu;",
          "\u255D": "&boxUL;",
          "\u255A": "&boxUR;",
          "\u255C": "&boxUl;",
          "\u2559": "&boxUr;",
          "\u2551": "&boxV;",
          "\u256C": "&boxVH;",
          "\u2563": "&boxVL;",
          "\u2560": "&boxVR;",
          "\u256B": "&boxVh;",
          "\u2562": "&boxVl;",
          "\u255F": "&boxVr;",
          "\u29C9": "&boxbox;",
          "\u2555": "&boxdL;",
          "\u2552": "&boxdR;",
          "\u2510": "&boxdl;",
          "\u250C": "&boxdr;",
          "\u2565": "&boxhD;",
          "\u2568": "&boxhU;",
          "\u252C": "&boxhd;",
          "\u2534": "&boxhu;",
          "\u229F": "&minusb;",
          "\u229E": "&plusb;",
          "\u22A0": "&timesb;",
          "\u255B": "&boxuL;",
          "\u2558": "&boxuR;",
          "\u2518": "&boxul;",
          "\u2514": "&boxur;",
          "\u2502": "&boxv;",
          "\u256A": "&boxvH;",
          "\u2561": "&boxvL;",
          "\u255E": "&boxvR;",
          "\u253C": "&boxvh;",
          "\u2524": "&boxvl;",
          "\u251C": "&boxvr;",
          "\xA6": "&brvbar;",
          "\uD835\uDCB7": "&bscr;",
          "\u204F": "&bsemi;",
          "\\": "&bsol;",
          "\u29C5": "&bsolb;",
          "\u27C8": "&bsolhsub;",
          "\u2022": "&bullet;",
          "\u2AAE": "&bumpE;",
          \u0107: "&cacute;",
          "\u2229": "&cap;",
          "\u2A44": "&capand;",
          "\u2A49": "&capbrcup;",
          "\u2A4B": "&capcap;",
          "\u2A47": "&capcup;",
          "\u2A40": "&capdot;",
          "\u2229\uFE00": "&caps;",
          "\u2041": "&caret;",
          "\u2A4D": "&ccaps;",
          \u010D: "&ccaron;",
          \u00E7: "&ccedil;",
          \u0109: "&ccirc;",
          "\u2A4C": "&ccups;",
          "\u2A50": "&ccupssm;",
          \u010B: "&cdot;",
          "\u29B2": "&cemptyv;",
          "\xA2": "&cent;",
          "\uD835\uDD20": "&cfr;",
          \u0447: "&chcy;",
          "\u2713": "&checkmark;",
          \u03C7: "&chi;",
          "\u25CB": "&cir;",
          "\u29C3": "&cirE;",
          "\u02C6": "&circ;",
          "\u2257": "&cire;",
          "\u21BA": "&olarr;",
          "\u21BB": "&orarr;",
          "\u24C8": "&oS;",
          "\u229B": "&oast;",
          "\u229A": "&ocir;",
          "\u229D": "&odash;",
          "\u2A10": "&cirfnint;",
          "\u2AEF": "&cirmid;",
          "\u29C2": "&cirscir;",
          "\u2663": "&clubsuit;",
          ":": "&colon;",
          ",": "&comma;",
          "@": "&commat;",
          "\u2201": "&complement;",
          "\u2A6D": "&congdot;",
          "\uD835\uDD54": "&copf;",
          "\u2117": "&copysr;",
          "\u21B5": "&crarr;",
          "\u2717": "&cross;",
          "\uD835\uDCB8": "&cscr;",
          "\u2ACF": "&csub;",
          "\u2AD1": "&csube;",
          "\u2AD0": "&csup;",
          "\u2AD2": "&csupe;",
          "\u22EF": "&ctdot;",
          "\u2938": "&cudarrl;",
          "\u2935": "&cudarrr;",
          "\u22DE": "&curlyeqprec;",
          "\u22DF": "&curlyeqsucc;",
          "\u21B6": "&curvearrowleft;",
          "\u293D": "&cularrp;",
          "\u222A": "&cup;",
          "\u2A48": "&cupbrcap;",
          "\u2A46": "&cupcap;",
          "\u2A4A": "&cupcup;",
          "\u228D": "&cupdot;",
          "\u2A45": "&cupor;",
          "\u222A\uFE00": "&cups;",
          "\u21B7": "&curvearrowright;",
          "\u293C": "&curarrm;",
          "\u22CE": "&cuvee;",
          "\u22CF": "&cuwed;",
          "\xA4": "&curren;",
          "\u2231": "&cwint;",
          "\u232D": "&cylcty;",
          "\u2965": "&dHar;",
          "\u2020": "&dagger;",
          \u2138: "&daleth;",
          "\u2010": "&hyphen;",
          "\u290F": "&rBarr;",
          \u010F: "&dcaron;",
          \u0434: "&dcy;",
          "\u21CA": "&downdownarrows;",
          "\u2A77": "&eDDot;",
          "\xB0": "&deg;",
          \u03B4: "&delta;",
          "\u29B1": "&demptyv;",
          "\u297F": "&dfisht;",
          "\uD835\uDD21": "&dfr;",
          "\u2666": "&diams;",
          \u03DD: "&gammad;",
          "\u22F2": "&disin;",
          "\xF7": "&divide;",
          "\u22C7": "&divonx;",
          \u0452: "&djcy;",
          "\u231E": "&llcorner;",
          "\u230D": "&dlcrop;",
          $: "&dollar;",
          "\uD835\uDD55": "&dopf;",
          "\u2251": "&eDot;",
          "\u2238": "&minusd;",
          "\u2214": "&plusdo;",
          "\u22A1": "&sdotb;",
          "\u231F": "&lrcorner;",
          "\u230C": "&drcrop;",
          "\uD835\uDCB9": "&dscr;",
          \u0455: "&dscy;",
          "\u29F6": "&dsol;",
          \u0111: "&dstrok;",
          "\u22F1": "&dtdot;",
          "\u25BF": "&triangledown;",
          "\u29A6": "&dwangle;",
          \u045F: "&dzcy;",
          "\u27FF": "&dzigrarr;",
          \u00E9: "&eacute;",
          "\u2A6E": "&easter;",
          \u011B: "&ecaron;",
          "\u2256": "&eqcirc;",
          \u00EA: "&ecirc;",
          "\u2255": "&eqcolon;",
          \u044D: "&ecy;",
          \u0117: "&edot;",
          "\u2252": "&fallingdotseq;",
          "\uD835\uDD22": "&efr;",
          "\u2A9A": "&eg;",
          \u00E8: "&egrave;",
          "\u2A96": "&eqslantgtr;",
          "\u2A98": "&egsdot;",
          "\u2A99": "&el;",
          "\u23E7": "&elinters;",
          \u2113: "&ell;",
          "\u2A95": "&eqslantless;",
          "\u2A97": "&elsdot;",
          \u0113: "&emacr;",
          "\u2205": "&varnothing;",
          "\u2004": "&emsp13;",
          "\u2005": "&emsp14;",
          "\u2003": "&emsp;",
          \u014B: "&eng;",
          "\u2002": "&ensp;",
          \u0119: "&eogon;",
          "\uD835\uDD56": "&eopf;",
          "\u22D5": "&epar;",
          "\u29E3": "&eparsl;",
          "\u2A71": "&eplus;",
          \u03B5: "&epsilon;",
          "\u03F5": "&varepsilon;",
          "=": "&equals;",
          "\u225F": "&questeq;",
          "\u2A78": "&equivDD;",
          "\u29E5": "&eqvparsl;",
          "\u2253": "&risingdotseq;",
          "\u2971": "&erarr;",
          \u212F: "&escr;",
          \u03B7: "&eta;",
          \u00F0: "&eth;",
          \u00EB: "&euml;",
          "\u20AC": "&euro;",
          "!": "&excl;",
          \u0444: "&fcy;",
          "\u2640": "&female;",
          \uFB03: "&ffilig;",
          \uFB00: "&fflig;",
          \uFB04: "&ffllig;",
          "\uD835\uDD23": "&ffr;",
          \uFB01: "&filig;",
          fj: "&fjlig;",
          "\u266D": "&flat;",
          \uFB02: "&fllig;",
          "\u25B1": "&fltns;",
          \u0192: "&fnof;",
          "\uD835\uDD57": "&fopf;",
          "\u22D4": "&pitchfork;",
          "\u2AD9": "&forkv;",
          "\u2A0D": "&fpartint;",
          "\xBD": "&half;",
          "\u2153": "&frac13;",
          "\xBC": "&frac14;",
          "\u2155": "&frac15;",
          "\u2159": "&frac16;",
          "\u215B": "&frac18;",
          "\u2154": "&frac23;",
          "\u2156": "&frac25;",
          "\xBE": "&frac34;",
          "\u2157": "&frac35;",
          "\u215C": "&frac38;",
          "\u2158": "&frac45;",
          "\u215A": "&frac56;",
          "\u215D": "&frac58;",
          "\u215E": "&frac78;",
          "\u2044": "&frasl;",
          "\u2322": "&sfrown;",
          "\uD835\uDCBB": "&fscr;",
          "\u2A8C": "&gtreqqless;",
          \u01F5: "&gacute;",
          \u03B3: "&gamma;",
          "\u2A86": "&gtrapprox;",
          \u011F: "&gbreve;",
          \u011D: "&gcirc;",
          \u0433: "&gcy;",
          \u0121: "&gdot;",
          "\u2AA9": "&gescc;",
          "\u2A80": "&gesdot;",
          "\u2A82": "&gesdoto;",
          "\u2A84": "&gesdotol;",
          "\u22DB\uFE00": "&gesl;",
          "\u2A94": "&gesles;",
          "\uD835\uDD24": "&gfr;",
          \u2137: "&gimel;",
          \u0453: "&gjcy;",
          "\u2A92": "&glE;",
          "\u2AA5": "&gla;",
          "\u2AA4": "&glj;",
          "\u2269": "&gneqq;",
          "\u2A8A": "&gnapprox;",
          "\u2A88": "&gneq;",
          "\u22E7": "&gnsim;",
          "\uD835\uDD58": "&gopf;",
          \u210A: "&gscr;",
          "\u2A8E": "&gsime;",
          "\u2A90": "&gsiml;",
          "\u2AA7": "&gtcc;",
          "\u2A7A": "&gtcir;",
          "\u22D7": "&gtrdot;",
          "\u2995": "&gtlPar;",
          "\u2A7C": "&gtquest;",
          "\u2978": "&gtrarr;",
          "\u2269\uFE00": "&gvnE;",
          \u044A: "&hardcy;",
          "\u2948": "&harrcir;",
          "\u21AD": "&leftrightsquigarrow;",
          \u210F: "&plankv;",
          \u0125: "&hcirc;",
          "\u2665": "&heartsuit;",
          "\u2026": "&mldr;",
          "\u22B9": "&hercon;",
          "\uD835\uDD25": "&hfr;",
          "\u2925": "&searhk;",
          "\u2926": "&swarhk;",
          "\u21FF": "&hoarr;",
          "\u223B": "&homtht;",
          "\u21A9": "&larrhk;",
          "\u21AA": "&rarrhk;",
          "\uD835\uDD59": "&hopf;",
          "\u2015": "&horbar;",
          "\uD835\uDCBD": "&hscr;",
          \u0127: "&hstrok;",
          "\u2043": "&hybull;",
          \u00ED: "&iacute;",
          \u00EE: "&icirc;",
          \u0438: "&icy;",
          \u0435: "&iecy;",
          "\xA1": "&iexcl;",
          "\uD835\uDD26": "&ifr;",
          \u00EC: "&igrave;",
          "\u2A0C": "&qint;",
          "\u222D": "&tint;",
          "\u29DC": "&iinfin;",
          "\u2129": "&iiota;",
          \u0133: "&ijlig;",
          \u012B: "&imacr;",
          \u0131: "&inodot;",
          "\u22B7": "&imof;",
          \u01B5: "&imped;",
          "\u2105": "&incare;",
          "\u221E": "&infin;",
          "\u29DD": "&infintie;",
          "\u22BA": "&intercal;",
          "\u2A17": "&intlarhk;",
          "\u2A3C": "&iprod;",
          \u0451: "&iocy;",
          \u012F: "&iogon;",
          "\uD835\uDD5A": "&iopf;",
          \u03B9: "&iota;",
          "\xBF": "&iquest;",
          "\uD835\uDCBE": "&iscr;",
          "\u22F9": "&isinE;",
          "\u22F5": "&isindot;",
          "\u22F4": "&isins;",
          "\u22F3": "&isinsv;",
          \u0129: "&itilde;",
          \u0456: "&iukcy;",
          \u00EF: "&iuml;",
          \u0135: "&jcirc;",
          \u0439: "&jcy;",
          "\uD835\uDD27": "&jfr;",
          "\u0237": "&jmath;",
          "\uD835\uDD5B": "&jopf;",
          "\uD835\uDCBF": "&jscr;",
          \u0458: "&jsercy;",
          \u0454: "&jukcy;",
          \u03BA: "&kappa;",
          \u03F0: "&varkappa;",
          \u0137: "&kcedil;",
          \u043A: "&kcy;",
          "\uD835\uDD28": "&kfr;",
          \u0138: "&kgreen;",
          \u0445: "&khcy;",
          \u045C: "&kjcy;",
          "\uD835\uDD5C": "&kopf;",
          "\uD835\uDCC0": "&kscr;",
          "\u291B": "&lAtail;",
          "\u290E": "&lBarr;",
          "\u2A8B": "&lesseqqgtr;",
          "\u2962": "&lHar;",
          \u013A: "&lacute;",
          "\u29B4": "&laemptyv;",
          \u03BB: "&lambda;",
          "\u2991": "&langd;",
          "\u2A85": "&lessapprox;",
          "\xAB": "&laquo;",
          "\u291F": "&larrbfs;",
          "\u291D": "&larrfs;",
          "\u21AB": "&looparrowleft;",
          "\u2939": "&larrpl;",
          "\u2973": "&larrsim;",
          "\u21A2": "&leftarrowtail;",
          "\u2AAB": "&lat;",
          "\u2919": "&latail;",
          "\u2AAD": "&late;",
          "\u2AAD\uFE00": "&lates;",
          "\u290C": "&lbarr;",
          "\u2772": "&lbbrk;",
          "{": "&lcub;",
          "[": "&lsqb;",
          "\u298B": "&lbrke;",
          "\u298F": "&lbrksld;",
          "\u298D": "&lbrkslu;",
          \u013E: "&lcaron;",
          \u013C: "&lcedil;",
          \u043B: "&lcy;",
          "\u2936": "&ldca;",
          "\u2967": "&ldrdhar;",
          "\u294B": "&ldrushar;",
          "\u21B2": "&ldsh;",
          "\u2264": "&leq;",
          "\u21C7": "&llarr;",
          "\u22CB": "&lthree;",
          "\u2AA8": "&lescc;",
          "\u2A7F": "&lesdot;",
          "\u2A81": "&lesdoto;",
          "\u2A83": "&lesdotor;",
          "\u22DA\uFE00": "&lesg;",
          "\u2A93": "&lesges;",
          "\u22D6": "&ltdot;",
          "\u297C": "&lfisht;",
          "\uD835\uDD29": "&lfr;",
          "\u2A91": "&lgE;",
          "\u296A": "&lharul;",
          "\u2584": "&lhblk;",
          \u0459: "&ljcy;",
          "\u296B": "&llhard;",
          "\u25FA": "&lltri;",
          \u0140: "&lmidot;",
          "\u23B0": "&lmoustache;",
          "\u2268": "&lneqq;",
          "\u2A89": "&lnapprox;",
          "\u2A87": "&lneq;",
          "\u22E6": "&lnsim;",
          "\u27EC": "&loang;",
          "\u21FD": "&loarr;",
          "\u27FC": "&xmap;",
          "\u21AC": "&rarrlp;",
          "\u2985": "&lopar;",
          "\uD835\uDD5D": "&lopf;",
          "\u2A2D": "&loplus;",
          "\u2A34": "&lotimes;",
          "\u2217": "&lowast;",
          "\u25CA": "&lozenge;",
          "(": "&lpar;",
          "\u2993": "&lparlt;",
          "\u296D": "&lrhard;",
          "\u200E": "&lrm;",
          "\u22BF": "&lrtri;",
          "\u2039": "&lsaquo;",
          "\uD835\uDCC1": "&lscr;",
          "\u2A8D": "&lsime;",
          "\u2A8F": "&lsimg;",
          "\u201A": "&sbquo;",
          \u0142: "&lstrok;",
          "\u2AA6": "&ltcc;",
          "\u2A79": "&ltcir;",
          "\u22C9": "&ltimes;",
          "\u2976": "&ltlarr;",
          "\u2A7B": "&ltquest;",
          "\u2996": "&ltrPar;",
          "\u25C3": "&triangleleft;",
          "\u294A": "&lurdshar;",
          "\u2966": "&luruhar;",
          "\u2268\uFE00": "&lvnE;",
          "\u223A": "&mDDot;",
          "\xAF": "&strns;",
          "\u2642": "&male;",
          "\u2720": "&maltese;",
          "\u25AE": "&marker;",
          "\u2A29": "&mcomma;",
          \u043C: "&mcy;",
          "\u2014": "&mdash;",
          "\uD835\uDD2A": "&mfr;",
          "\u2127": "&mho;",
          \u00B5: "&micro;",
          "\u2AF0": "&midcir;",
          "\u2212": "&minus;",
          "\u2A2A": "&minusdu;",
          "\u2ADB": "&mlcp;",
          "\u22A7": "&models;",
          "\uD835\uDD5E": "&mopf;",
          "\uD835\uDCC2": "&mscr;",
          \u03BC: "&mu;",
          "\u22B8": "&mumap;",
          "\u22D9\u0338": "&nGg;",
          "\u226B\u20D2": "&nGt;",
          "\u21CD": "&nlArr;",
          "\u21CE": "&nhArr;",
          "\u22D8\u0338": "&nLl;",
          "\u226A\u20D2": "&nLt;",
          "\u21CF": "&nrArr;",
          "\u22AF": "&nVDash;",
          "\u22AE": "&nVdash;",
          \u0144: "&nacute;",
          "\u2220\u20D2": "&nang;",
          "\u2A70\u0338": "&napE;",
          "\u224B\u0338": "&napid;",
          \u0149: "&napos;",
          "\u266E": "&natural;",
          "\u2A43": "&ncap;",
          \u0148: "&ncaron;",
          \u0146: "&ncedil;",
          "\u2A6D\u0338": "&ncongdot;",
          "\u2A42": "&ncup;",
          \u043D: "&ncy;",
          "\u2013": "&ndash;",
          "\u21D7": "&neArr;",
          "\u2924": "&nearhk;",
          "\u2250\u0338": "&nedot;",
          "\u2928": "&toea;",
          "\uD835\uDD2B": "&nfr;",
          "\u21AE": "&nleftrightarrow;",
          "\u2AF2": "&nhpar;",
          "\u22FC": "&nis;",
          "\u22FA": "&nisd;",
          \u045A: "&njcy;",
          "\u2266\u0338": "&nleqq;",
          "\u219A": "&nleftarrow;",
          "\u2025": "&nldr;",
          "\uD835\uDD5F": "&nopf;",
          "\xAC": "&not;",
          "\u22F9\u0338": "&notinE;",
          "\u22F5\u0338": "&notindot;",
          "\u22F7": "&notinvb;",
          "\u22F6": "&notinvc;",
          "\u22FE": "&notnivb;",
          "\u22FD": "&notnivc;",
          "\u2AFD\u20E5": "&nparsl;",
          "\u2202\u0338": "&npart;",
          "\u2A14": "&npolint;",
          "\u219B": "&nrightarrow;",
          "\u2933\u0338": "&nrarrc;",
          "\u219D\u0338": "&nrarrw;",
          "\uD835\uDCC3": "&nscr;",
          "\u2284": "&nsub;",
          "\u2AC5\u0338": "&nsubseteqq;",
          "\u2285": "&nsup;",
          "\u2AC6\u0338": "&nsupseteqq;",
          \u00F1: "&ntilde;",
          \u03BD: "&nu;",
          "#": "&num;",
          "\u2116": "&numero;",
          "\u2007": "&numsp;",
          "\u22AD": "&nvDash;",
          "\u2904": "&nvHarr;",
          "\u224D\u20D2": "&nvap;",
          "\u22AC": "&nvdash;",
          "\u2265\u20D2": "&nvge;",
          ">\u20D2": "&nvgt;",
          "\u29DE": "&nvinfin;",
          "\u2902": "&nvlArr;",
          "\u2264\u20D2": "&nvle;",
          "<\u20D2": "&nvlt;",
          "\u22B4\u20D2": "&nvltrie;",
          "\u2903": "&nvrArr;",
          "\u22B5\u20D2": "&nvrtrie;",
          "\u223C\u20D2": "&nvsim;",
          "\u21D6": "&nwArr;",
          "\u2923": "&nwarhk;",
          "\u2927": "&nwnear;",
          \u00F3: "&oacute;",
          \u00F4: "&ocirc;",
          \u043E: "&ocy;",
          \u0151: "&odblac;",
          "\u2A38": "&odiv;",
          "\u29BC": "&odsold;",
          \u0153: "&oelig;",
          "\u29BF": "&ofcir;",
          "\uD835\uDD2C": "&ofr;",
          "\u02DB": "&ogon;",
          \u00F2: "&ograve;",
          "\u29C1": "&ogt;",
          "\u29B5": "&ohbar;",
          "\u29BE": "&olcir;",
          "\u29BB": "&olcross;",
          "\u29C0": "&olt;",
          \u014D: "&omacr;",
          \u03C9: "&omega;",
          \u03BF: "&omicron;",
          "\u29B6": "&omid;",
          "\uD835\uDD60": "&oopf;",
          "\u29B7": "&opar;",
          "\u29B9": "&operp;",
          "\u2228": "&vee;",
          "\u2A5D": "&ord;",
          \u2134: "&oscr;",
          \u00AA: "&ordf;",
          \u00BA: "&ordm;",
          "\u22B6": "&origof;",
          "\u2A56": "&oror;",
          "\u2A57": "&orslope;",
          "\u2A5B": "&orv;",
          \u00F8: "&oslash;",
          "\u2298": "&osol;",
          \u00F5: "&otilde;",
          "\u2A36": "&otimesas;",
          \u00F6: "&ouml;",
          "\u233D": "&ovbar;",
          "\xB6": "&para;",
          "\u2AF3": "&parsim;",
          "\u2AFD": "&parsl;",
          \u043F: "&pcy;",
          "%": "&percnt;",
          ".": "&period;",
          "\u2030": "&permil;",
          "\u2031": "&pertenk;",
          "\uD835\uDD2D": "&pfr;",
          \u03C6: "&phi;",
          \u03D5: "&varphi;",
          "\u260E": "&phone;",
          \u03C0: "&pi;",
          \u03D6: "&varpi;",
          \u210E: "&planckh;",
          "+": "&plus;",
          "\u2A23": "&plusacir;",
          "\u2A22": "&pluscir;",
          "\u2A25": "&plusdu;",
          "\u2A72": "&pluse;",
          "\u2A26": "&plussim;",
          "\u2A27": "&plustwo;",
          "\u2A15": "&pointint;",
          "\uD835\uDD61": "&popf;",
          "\xA3": "&pound;",
          "\u2AB3": "&prE;",
          "\u2AB7": "&precapprox;",
          "\u2AB9": "&prnap;",
          "\u2AB5": "&prnE;",
          "\u22E8": "&prnsim;",
          "\u2032": "&prime;",
          "\u232E": "&profalar;",
          "\u2312": "&profline;",
          "\u2313": "&profsurf;",
          "\u22B0": "&prurel;",
          "\uD835\uDCC5": "&pscr;",
          \u03C8: "&psi;",
          "\u2008": "&puncsp;",
          "\uD835\uDD2E": "&qfr;",
          "\uD835\uDD62": "&qopf;",
          "\u2057": "&qprime;",
          "\uD835\uDCC6": "&qscr;",
          "\u2A16": "&quatint;",
          "?": "&quest;",
          "\u291C": "&rAtail;",
          "\u2964": "&rHar;",
          "\u223D\u0331": "&race;",
          \u0155: "&racute;",
          "\u29B3": "&raemptyv;",
          "\u2992": "&rangd;",
          "\u29A5": "&range;",
          "\xBB": "&raquo;",
          "\u2975": "&rarrap;",
          "\u2920": "&rarrbfs;",
          "\u2933": "&rarrc;",
          "\u291E": "&rarrfs;",
          "\u2945": "&rarrpl;",
          "\u2974": "&rarrsim;",
          "\u21A3": "&rightarrowtail;",
          "\u219D": "&rightsquigarrow;",
          "\u291A": "&ratail;",
          "\u2236": "&ratio;",
          "\u2773": "&rbbrk;",
          "}": "&rcub;",
          "]": "&rsqb;",
          "\u298C": "&rbrke;",
          "\u298E": "&rbrksld;",
          "\u2990": "&rbrkslu;",
          \u0159: "&rcaron;",
          \u0157: "&rcedil;",
          \u0440: "&rcy;",
          "\u2937": "&rdca;",
          "\u2969": "&rdldhar;",
          "\u21B3": "&rdsh;",
          "\u25AD": "&rect;",
          "\u297D": "&rfisht;",
          "\uD835\uDD2F": "&rfr;",
          "\u296C": "&rharul;",
          \u03C1: "&rho;",
          \u03F1: "&varrho;",
          "\u21C9": "&rrarr;",
          "\u22CC": "&rthree;",
          "\u02DA": "&ring;",
          "\u200F": "&rlm;",
          "\u23B1": "&rmoustache;",
          "\u2AEE": "&rnmid;",
          "\u27ED": "&roang;",
          "\u21FE": "&roarr;",
          "\u2986": "&ropar;",
          "\uD835\uDD63": "&ropf;",
          "\u2A2E": "&roplus;",
          "\u2A35": "&rotimes;",
          ")": "&rpar;",
          "\u2994": "&rpargt;",
          "\u2A12": "&rppolint;",
          "\u203A": "&rsaquo;",
          "\uD835\uDCC7": "&rscr;",
          "\u22CA": "&rtimes;",
          "\u25B9": "&triangleright;",
          "\u29CE": "&rtriltri;",
          "\u2968": "&ruluhar;",
          "\u211E": "&rx;",
          \u015B: "&sacute;",
          "\u2AB4": "&scE;",
          "\u2AB8": "&succapprox;",
          \u0161: "&scaron;",
          \u015F: "&scedil;",
          \u015D: "&scirc;",
          "\u2AB6": "&succneqq;",
          "\u2ABA": "&succnapprox;",
          "\u22E9": "&succnsim;",
          "\u2A13": "&scpolint;",
          \u0441: "&scy;",
          "\u22C5": "&sdot;",
          "\u2A66": "&sdote;",
          "\u21D8": "&seArr;",
          "\xA7": "&sect;",
          ";": "&semi;",
          "\u2929": "&tosa;",
          "\u2736": "&sext;",
          "\uD835\uDD30": "&sfr;",
          "\u266F": "&sharp;",
          \u0449: "&shchcy;",
          \u0448: "&shcy;",
          "\xAD": "&shy;",
          \u03C3: "&sigma;",
          \u03C2: "&varsigma;",
          "\u2A6A": "&simdot;",
          "\u2A9E": "&simg;",
          "\u2AA0": "&simgE;",
          "\u2A9D": "&siml;",
          "\u2A9F": "&simlE;",
          "\u2246": "&simne;",
          "\u2A24": "&simplus;",
          "\u2972": "&simrarr;",
          "\u2A33": "&smashp;",
          "\u29E4": "&smeparsl;",
          "\u2323": "&ssmile;",
          "\u2AAA": "&smt;",
          "\u2AAC": "&smte;",
          "\u2AAC\uFE00": "&smtes;",
          \u044C: "&softcy;",
          "/": "&sol;",
          "\u29C4": "&solb;",
          "\u233F": "&solbar;",
          "\uD835\uDD64": "&sopf;",
          "\u2660": "&spadesuit;",
          "\u2293\uFE00": "&sqcaps;",
          "\u2294\uFE00": "&sqcups;",
          "\uD835\uDCC8": "&sscr;",
          "\u2606": "&star;",
          "\u2282": "&subset;",
          "\u2AC5": "&subseteqq;",
          "\u2ABD": "&subdot;",
          "\u2AC3": "&subedot;",
          "\u2AC1": "&submult;",
          "\u2ACB": "&subsetneqq;",
          "\u228A": "&subsetneq;",
          "\u2ABF": "&subplus;",
          "\u2979": "&subrarr;",
          "\u2AC7": "&subsim;",
          "\u2AD5": "&subsub;",
          "\u2AD3": "&subsup;",
          "\u266A": "&sung;",
          "\xB9": "&sup1;",
          "\xB2": "&sup2;",
          "\xB3": "&sup3;",
          "\u2AC6": "&supseteqq;",
          "\u2ABE": "&supdot;",
          "\u2AD8": "&supdsub;",
          "\u2AC4": "&supedot;",
          "\u27C9": "&suphsol;",
          "\u2AD7": "&suphsub;",
          "\u297B": "&suplarr;",
          "\u2AC2": "&supmult;",
          "\u2ACC": "&supsetneqq;",
          "\u228B": "&supsetneq;",
          "\u2AC0": "&supplus;",
          "\u2AC8": "&supsim;",
          "\u2AD4": "&supsub;",
          "\u2AD6": "&supsup;",
          "\u21D9": "&swArr;",
          "\u292A": "&swnwar;",
          \u00DF: "&szlig;",
          "\u2316": "&target;",
          \u03C4: "&tau;",
          \u0165: "&tcaron;",
          \u0163: "&tcedil;",
          \u0442: "&tcy;",
          "\u2315": "&telrec;",
          "\uD835\uDD31": "&tfr;",
          \u03B8: "&theta;",
          \u03D1: "&vartheta;",
          \u00FE: "&thorn;",
          "\xD7": "&times;",
          "\u2A31": "&timesbar;",
          "\u2A30": "&timesd;",
          "\u2336": "&topbot;",
          "\u2AF1": "&topcir;",
          "\uD835\uDD65": "&topf;",
          "\u2ADA": "&topfork;",
          "\u2034": "&tprime;",
          "\u25B5": "&utri;",
          "\u225C": "&trie;",
          "\u25EC": "&tridot;",
          "\u2A3A": "&triminus;",
          "\u2A39": "&triplus;",
          "\u29CD": "&trisb;",
          "\u2A3B": "&tritime;",
          "\u23E2": "&trpezium;",
          "\uD835\uDCC9": "&tscr;",
          \u0446: "&tscy;",
          \u045B: "&tshcy;",
          \u0167: "&tstrok;",
          "\u2963": "&uHar;",
          \u00FA: "&uacute;",
          \u045E: "&ubrcy;",
          \u016D: "&ubreve;",
          \u00FB: "&ucirc;",
          \u0443: "&ucy;",
          \u0171: "&udblac;",
          "\u297E": "&ufisht;",
          "\uD835\uDD32": "&ufr;",
          \u00F9: "&ugrave;",
          "\u2580": "&uhblk;",
          "\u231C": "&ulcorner;",
          "\u230F": "&ulcrop;",
          "\u25F8": "&ultri;",
          \u016B: "&umacr;",
          \u0173: "&uogon;",
          "\uD835\uDD66": "&uopf;",
          \u03C5: "&upsilon;",
          "\u21C8": "&uuarr;",
          "\u231D": "&urcorner;",
          "\u230E": "&urcrop;",
          \u016F: "&uring;",
          "\u25F9": "&urtri;",
          "\uD835\uDCCA": "&uscr;",
          "\u22F0": "&utdot;",
          \u0169: "&utilde;",
          \u00FC: "&uuml;",
          "\u29A7": "&uwangle;",
          "\u2AE8": "&vBar;",
          "\u2AE9": "&vBarv;",
          "\u299C": "&vangrt;",
          "\u228A\uFE00": "&vsubne;",
          "\u2ACB\uFE00": "&vsubnE;",
          "\u228B\uFE00": "&vsupne;",
          "\u2ACC\uFE00": "&vsupnE;",
          \u0432: "&vcy;",
          "\u22BB": "&veebar;",
          "\u225A": "&veeeq;",
          "\u22EE": "&vellip;",
          "\uD835\uDD33": "&vfr;",
          "\uD835\uDD67": "&vopf;",
          "\uD835\uDCCB": "&vscr;",
          "\u299A": "&vzigzag;",
          \u0175: "&wcirc;",
          "\u2A5F": "&wedbar;",
          "\u2259": "&wedgeq;",
          "\u2118": "&wp;",
          "\uD835\uDD34": "&wfr;",
          "\uD835\uDD68": "&wopf;",
          "\uD835\uDCCC": "&wscr;",
          "\uD835\uDD35": "&xfr;",
          \u03BE: "&xi;",
          "\u22FB": "&xnis;",
          "\uD835\uDD69": "&xopf;",
          "\uD835\uDCCD": "&xscr;",
          \u00FD: "&yacute;",
          \u044F: "&yacy;",
          \u0177: "&ycirc;",
          \u044B: "&ycy;",
          "\xA5": "&yen;",
          "\uD835\uDD36": "&yfr;",
          \u0457: "&yicy;",
          "\uD835\uDD6A": "&yopf;",
          "\uD835\uDCCE": "&yscr;",
          \u044E: "&yucy;",
          \u00FF: "&yuml;",
          \u017A: "&zacute;",
          \u017E: "&zcaron;",
          \u0437: "&zcy;",
          \u017C: "&zdot;",
          \u03B6: "&zeta;",
          "\uD835\uDD37": "&zfr;",
          \u0436: "&zhcy;",
          "\u21DD": "&zigrarr;",
          "\uD835\uDD6B": "&zopf;",
          "\uD835\uDCCF": "&zscr;",
          "\u200D": "&zwj;",
          "\u200C": "&zwnj;"
        }
      }
    };
  }
});

// node_modules/html-entities/lib/numeric-unicode-map.js
var require_numeric_unicode_map = __commonJS({
  "node_modules/html-entities/lib/numeric-unicode-map.js": function(exports2) {
    "use strict";
    init_kolmafia_polyfill();
    Object.defineProperty(exports2, "__esModule", {
      value: !0
    });
    exports2.numericUnicodeMap = {
      0: 65533,
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376
    };
  }
});

// node_modules/html-entities/lib/surrogate-pairs.js
var require_surrogate_pairs = __commonJS({
  "node_modules/html-entities/lib/surrogate-pairs.js": function(exports2) {
    "use strict";
    init_kolmafia_polyfill();
    Object.defineProperty(exports2, "__esModule", {
      value: !0
    });
    exports2.fromCodePoint = String.fromCodePoint || function(astralCodePoint) {
      return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
    };
    exports2.getCodePoint = String.prototype.codePointAt ? function(input, position) {
      return input.codePointAt(position);
    } : function(input, position) {
      return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
    };
    exports2.highSurrogateFrom = 55296;
    exports2.highSurrogateTo = 56319;
  }
});

// node_modules/html-entities/lib/index.js
var require_lib = __commonJS({
  "node_modules/html-entities/lib/index.js": function(exports2) {
    "use strict";
    init_kolmafia_polyfill();
    var __assign = exports2 && exports2.__assign || function() {
      return __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      }, __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", {
      value: !0
    });
    var named_references_1 = require_named_references(), numeric_unicode_map_1 = require_numeric_unicode_map(), surrogate_pairs_1 = require_surrogate_pairs(), allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), {
      all: named_references_1.namedReferences.html5
    });
    function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
      macroRegExp.lastIndex = 0;
      var replaceMatch = macroRegExp.exec(macroText), replaceResult;
      if (replaceMatch) {
        replaceResult = "";
        var replaceLastIndex = 0;
        do {
          replaceLastIndex !== replaceMatch.index && (replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index));
          var replaceInput = replaceMatch[0];
          replaceResult += macroReplacer(replaceInput), replaceLastIndex = replaceMatch.index + replaceInput.length;
        } while (replaceMatch = macroRegExp.exec(macroText));
        replaceLastIndex !== macroText.length && (replaceResult += macroText.substring(replaceLastIndex));
      } else
        replaceResult = macroText;
      return replaceResult;
    }
    var encodeRegExps = {
      specialChars: /[<>'"&]/g,
      nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
      nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
      nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
      extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
    }, defaultEncodeOptions = {
      mode: "specialChars",
      level: "all",
      numeric: "decimal"
    };
    function encode(text, _a) {
      var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? "specialChars" : _c, _d = _b.numeric, numeric = _d === void 0 ? "decimal" : _d, _e = _b.level, level = _e === void 0 ? "all" : _e;
      if (!text)
        return "";
      var encodeRegExp = encodeRegExps[mode], references = allNamedReferences[level].characters, isHex = numeric === "hexadecimal";
      return replaceUsingRegExp(text, encodeRegExp, function(input) {
        var result = references[input];
        if (!result) {
          var code = input.length > 1 ? surrogate_pairs_1.getCodePoint(input, 0) : input.charCodeAt(0);
          result = (isHex ? "&#x" + code.toString(16) : "&#" + code) + ";";
        }
        return result;
      });
    }
    exports2.encode = encode;
    var defaultDecodeOptions = {
      scope: "body",
      level: "all"
    }, strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, baseDecodeRegExps = {
      xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
      },
      html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
      },
      html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
      }
    }, decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
      all: baseDecodeRegExps.html5
    }), fromCharCode = String.fromCharCode, outOfBoundsChar = fromCharCode(65533), defaultDecodeEntityOptions = {
      level: "all"
    };
    function getDecodedEntity(entity, references, isAttribute, isStrict) {
      var decodeResult = entity, decodeEntityLastChar = entity[entity.length - 1];
      if (isAttribute && decodeEntityLastChar === "=")
        decodeResult = entity;
      else if (isStrict && decodeEntityLastChar !== ";")
        decodeResult = entity;
      else {
        var decodeResultByReference = references[entity];
        if (decodeResultByReference)
          decodeResult = decodeResultByReference;
        else if (entity[0] === "&" && entity[1] === "#") {
          var decodeSecondChar = entity[2], decodeCode = decodeSecondChar == "x" || decodeSecondChar == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
          decodeResult = decodeCode >= 1114111 ? outOfBoundsChar : decodeCode > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode] || decodeCode);
        }
      }
      return decodeResult;
    }
    function decodeEntity(entity, _a) {
      var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? "all" : _b;
      return entity ? getDecodedEntity(entity, allNamedReferences[level].entities, !1, !1) : "";
    }
    exports2.decodeEntity = decodeEntity;
    function decode(text, _a) {
      var _b = _a === void 0 ? defaultDecodeOptions : _a, _c = _b.level, level = _c === void 0 ? "all" : _c, _d = _b.scope, scope = _d === void 0 ? level === "xml" ? "strict" : "body" : _d;
      if (!text)
        return "";
      var decodeRegExp = decodeRegExps[level][scope], references = allNamedReferences[level].entities, isAttribute = scope === "attribute", isStrict = scope === "strict";
      return replaceUsingRegExp(text, decodeRegExp, function(entity) {
        return getDecodedEntity(entity, references, isAttribute, isStrict);
      });
    }
    exports2.decode = decode;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  $bounties: function() {
    return $bounties;
  },
  $bounty: function() {
    return $bounty;
  },
  $class: function() {
    return $class;
  },
  $classes: function() {
    return $classes;
  },
  $coinmaster: function() {
    return $coinmaster;
  },
  $coinmasters: function() {
    return $coinmasters;
  },
  $effect: function() {
    return $effect;
  },
  $effects: function() {
    return $effects;
  },
  $element: function() {
    return $element;
  },
  $elements: function() {
    return $elements;
  },
  $familiar: function() {
    return $familiar;
  },
  $familiars: function() {
    return $familiars;
  },
  $item: function() {
    return $item;
  },
  $items: function() {
    return $items;
  },
  $location: function() {
    return $location;
  },
  $locations: function() {
    return $locations;
  },
  $modifier: function() {
    return $modifier;
  },
  $modifiers: function() {
    return $modifiers;
  },
  $monster: function() {
    return $monster;
  },
  $monsters: function() {
    return $monsters;
  },
  $path: function() {
    return $path;
  },
  $paths: function() {
    return $paths;
  },
  $phyla: function() {
    return $phyla;
  },
  $phylum: function() {
    return $phylum;
  },
  $servant: function() {
    return $servant;
  },
  $servants: function() {
    return $servants;
  },
  $skill: function() {
    return $skill;
  },
  $skills: function() {
    return $skills;
  },
  $slot: function() {
    return $slot;
  },
  $slots: function() {
    return $slots;
  },
  $stat: function() {
    return $stat;
  },
  $stats: function() {
    return $stats;
  },
  $thrall: function() {
    return $thrall;
  },
  $thralls: function() {
    return $thralls;
  },
  ActionSource: function() {
    return ActionSource;
  },
  AprilingBandHelmet: function() {
    return AprilingBandHelmet_exports;
  },
  AscendError: function() {
    return AscendError;
  },
  AscensionPrepError: function() {
    return AscensionPrepError;
  },
  AsdonMartin: function() {
    return AsdonMartin_exports;
  },
  AugustScepter: function() {
    return AugustScepter_exports;
  },
  AutumnAton: function() {
    return AutumnAton_exports;
  },
  Bandersnatch: function() {
    return Bandersnatch_exports;
  },
  BarrelShrine: function() {
    return BarrelShrine_exports;
  },
  BatWings: function() {
    return BatWings_exports;
  },
  BeachComb: function() {
    return BeachComb_exports;
  },
  BurningLeaves: function() {
    return BurningLeaves_exports;
  },
  CampAway: function() {
    return CampAway_exports;
  },
  Cartography: function() {
    return Cartography_exports;
  },
  ChateauMantegna: function() {
    return ChateauMantegna_exports;
  },
  ChestMimic: function() {
    return ChestMimic_exports;
  },
  CinchoDeMayo: function() {
    return CinchoDeMayo_exports;
  },
  Clan: function() {
    return Clan;
  },
  ClosedCircuitPayphone: function() {
    return ClosedCircuitPayphone_exports;
  },
  CombatLoversLocket: function() {
    return CombatLoversLocket_exports;
  },
  CommaChameleon: function() {
    return CommaChameleon_exports;
  },
  CommunityService: function() {
    return CommunityService;
  },
  ConspiracyIsland: function() {
    return ConspiracyIsland_exports;
  },
  Counter: function() {
    return counter_exports;
  },
  CrimboShrub: function() {
    return CrimboShrub_exports;
  },
  CrownOfThrones: function() {
    return CrownOfThrones_exports;
  },
  CrystalBall: function() {
    return CrystalBall_exports;
  },
  CursedMonkeyPaw: function() {
    return CursedMonkeyPaw_exports;
  },
  DNALab: function() {
    return DNALab_exports;
  },
  DaylightShavings: function() {
    return DaylightShavings_exports;
  },
  DeckOfEveryCard: function() {
    return DeckOfEveryCard_exports;
  },
  Diet: function() {
    return Diet;
  },
  Dinseylandfill: function() {
    return Dinseylandfill_exports;
  },
  Dreadsylvania: function() {
    return Dreadsylvania;
  },
  Dungeon: function() {
    return Dungeon;
  },
  EnsureError: function() {
    return EnsureError;
  },
  Environment: function() {
    return Environment;
  },
  EverfullDarts: function() {
    return EverfullDarts_exports;
  },
  FloristFriar: function() {
    return Florist_exports;
  },
  GingerBread: function() {
    return GingerBread_exports;
  },
  GreyGoose: function() {
    return GreyGoose_exports;
  },
  Guzzlr: function() {
    return Guzzlr_exports;
  },
  HeavyRains: function() {
    return HeavyRains_exports;
  },
  Hobopolis: function() {
    return Hobopolis;
  },
  Horsery: function() {
    return Horsery_exports;
  },
  InvalidMacroError: function() {
    return InvalidMacroError;
  },
  JuneCleaver: function() {
    return JuneCleaver_exports;
  },
  JungMan: function() {
    return JungMan_exports;
  },
  Kmail: function() {
    return Kmail;
  },
  KolGender: function() {
    return KolGender;
  },
  KolmafiaVersionError: function() {
    return KolmafiaVersionError;
  },
  Latte: function() {
    return LatteLoversMembersMug_exports;
  },
  Lifestyle: function() {
    return Lifestyle;
  },
  LookingGlass: function() {
    return LookingGlass_exports;
  },
  Macro: function() {
    return Macro;
  },
  MagicalSausages: function() {
    return MagicalSausages;
  },
  MayamCalendar: function() {
    return MayamCalendar_exports;
  },
  MayoClinic: function() {
    return MayoClinic_exports;
  },
  MenuItem: function() {
    return MenuItem;
  },
  Mood: function() {
    return Mood;
  },
  MpSource: function() {
    return MpSource;
  },
  MummingTrunk: function() {
    return MummingTrunk_exports;
  },
  NuclearAutumn: function() {
    return NuclearAutumn_exports;
  },
  ObtuseAngel: function() {
    return ObtuseAngel_exports;
  },
  OscusSoda: function() {
    return OscusSoda;
  },
  Pantogram: function() {
    return Pantogram_exports;
  },
  PocketProfessor: function() {
    return PocketProfessor_exports;
  },
  PropertiesManager: function() {
    return PropertiesManager;
  },
  RainDoh: function() {
    return RainDoh_exports;
  },
  RainDohBlackBox: function() {
    return RainDohBlackBox;
  },
  ReagnimatedGnome: function() {
    return ReagnimatedGnome_exports;
  },
  Requirement: function() {
    return Requirement;
  },
  RetroCape: function() {
    return RetroCape_exports;
  },
  Robortender: function() {
    return Robortender_exports;
  },
  Session: function() {
    return Session;
  },
  SlimeTube: function() {
    return SlimeTube;
  },
  Snapper: function() {
    return Snapper_exports;
  },
  SongBoom: function() {
    return SongBoom_exports;
  },
  SourceTerminal: function() {
    return SourceTerminal_exports;
  },
  Spacegate: function() {
    return Spacegate_exports;
  },
  SpookyPutty: function() {
    return SpookyPutty_exports;
  },
  SpookyPuttySheet: function() {
    return SpookyPuttySheet;
  },
  Stickers: function() {
    return Stickers_exports;
  },
  StillSuit: function() {
    return Stillsuit_exports;
  },
  StompingBoots: function() {
    return StompingBoots_exports;
  },
  StrictMacro: function() {
    return StrictMacro;
  },
  TakerSpace: function() {
    return TakerSpace_exports;
  },
  TearawayPants: function() {
    return TearawayPants_exports;
  },
  TrainSet: function() {
    return TrainSet_exports;
  },
  TunnelOfLove: function() {
    return TunnelOfLove_exports;
  },
  Wanderer: function() {
    return Wanderer;
  },
  WinterGarden: function() {
    return WinterGarden_exports;
  },
  Witchess: function() {
    return Witchess_exports;
  },
  actionSourcesAvailable: function() {
    return actionSourcesAvailable;
  },
  adventureMacro: function() {
    return adventureMacro;
  },
  adventureMacroAuto: function() {
    return adventureMacroAuto;
  },
  applyModes: function() {
    return applyModes;
  },
  arrayContains: function() {
    return arrayContains;
  },
  arrayEquals: function() {
    return arrayEquals;
  },
  arrayToCountedMap: function() {
    return arrayToCountedMap;
  },
  ascend: function() {
    return ascend;
  },
  bestLibramToCast: function() {
    return bestLibramToCast;
  },
  booleanModifiers: function() {
    return booleanModifiers;
  },
  booleanProperties: function() {
    return booleanProperties;
  },
  bulkAutosell: function() {
    return bulkAutosell;
  },
  bulkPutCloset: function() {
    return bulkPutCloset;
  },
  bulkPutDisplay: function() {
    return bulkPutDisplay;
  },
  bulkPutShop: function() {
    return bulkPutShop;
  },
  bulkPutStash: function() {
    return bulkPutStash;
  },
  bulkRepriceShop: function() {
    return bulkRepriceShop;
  },
  bulkSell: function() {
    return bulkSell;
  },
  bulkTakeCloset: function() {
    return bulkTakeCloset;
  },
  bulkTakeDisplay: function() {
    return bulkTakeDisplay;
  },
  bulkTakeShop: function() {
    return bulkTakeShop;
  },
  bulkTakeStash: function() {
    return bulkTakeStash;
  },
  bulkTakeStorage: function() {
    return bulkTakeStorage;
  },
  byClass: function() {
    return byClass;
  },
  byStat: function() {
    return byStat;
  },
  canRememberSong: function() {
    return canRememberSong;
  },
  canUse: function() {
    return canUse;
  },
  canVisitUrl: function() {
    return canVisitUrl;
  },
  chunk: function() {
    return chunk;
  },
  clamp: function() {
    return clamp;
  },
  clearMaximizerCache: function() {
    return clearMaximizerCache;
  },
  console: function() {
    return console_exports;
  },
  couldUseRainDohBlackBox: function() {
    return couldUseRainDohBlackBox;
  },
  couldUseSpookyPuttySheet: function() {
    return couldUseSpookyPuttySheet;
  },
  countedMapToArray: function() {
    return countedMapToArray;
  },
  countedMapToString: function() {
    return countedMapToString;
  },
  damageTakenByElement: function() {
    return damageTakenByElement;
  },
  directlyUse: function() {
    return directlyUse;
  },
  ensureBanish: function() {
    return ensureBanish;
  },
  ensureEffect: function() {
    return ensureEffect;
  },
  ensureFreeKill: function() {
    return ensureFreeKill;
  },
  ensureFreeRun: function() {
    return ensureFreeRun;
  },
  examine: function() {
    return examine;
  },
  expectedLibramSummon: function() {
    return expectedLibramSummon;
  },
  extractItems: function() {
    return extractItems;
  },
  familiarProperties: function() {
    return familiarProperties;
  },
  familiarTags: function() {
    return familiarTags;
  },
  findActionSource: function() {
    return findActionSource;
  },
  findFairyMultiplier: function() {
    return findFairyMultiplier;
  },
  findLeprechaunMultiplier: function() {
    return findLeprechaunMultiplier;
  },
  flat: function() {
    return flat;
  },
  freeCrafts: function() {
    return freeCrafts;
  },
  gameDay: function() {
    return gameDay;
  },
  get: function() {
    return get;
  },
  getActiveEffects: function() {
    return getActiveEffects;
  },
  getActiveSongs: function() {
    return getActiveSongs;
  },
  getAverage: function() {
    return getAverage;
  },
  getAverageAdventures: function() {
    return getAverageAdventures;
  },
  getBanishedMonsters: function() {
    return getBanishedMonsters;
  },
  getCombatFlags: function() {
    return getCombatFlags;
  },
  getCurrentModes: function() {
    return getCurrentModes;
  },
  getFamiliarTags: function() {
    return getFamiliarTags;
  },
  getFamiliarWandererChance: function() {
    return getFamiliarWandererChance;
  },
  getFoldGroup: function() {
    return getFoldGroup;
  },
  getKramcoWandererChance: function() {
    return getKramcoWandererChance;
  },
  getMacroId: function() {
    return getMacroId;
  },
  getModifier: function() {
    return get2;
  },
  getMonsterLocations: function() {
    return getMonsterLocations;
  },
  getPlayerFromIdOrName: function() {
    return getPlayerFromIdOrName;
  },
  getPlayerIdFromName: function() {
    return getPlayerIdFromName;
  },
  getPlayerNameFromId: function() {
    return getPlayerNameFromId;
  },
  getRange: function() {
    return getRange;
  },
  getRemainingLiver: function() {
    return getRemainingLiver;
  },
  getRemainingSpleen: function() {
    return getRemainingSpleen;
  },
  getRemainingStomach: function() {
    return getRemainingStomach;
  },
  getSaleValue: function() {
    return getSaleValue;
  },
  getScalingCap: function() {
    return getScalingCap;
  },
  getScalingRate: function() {
    return getScalingRate;
  },
  getSongCount: function() {
    return getSongCount;
  },
  getSongLimit: function() {
    return getSongLimit;
  },
  getTodaysHolidayWanderers: function() {
    return getTodaysHolidayWanderers;
  },
  getTotalModifier: function() {
    return getTotalModifier;
  },
  getTotalPuttyLikeCopiesMade: function() {
    return getTotalPuttyLikeCopiesMade;
  },
  getWandererChance: function() {
    return getWandererChance;
  },
  getZapGroup: function() {
    return getZapGroup;
  },
  have: function() {
    return have;
  },
  haveCounter: function() {
    return haveCounter;
  },
  haveInCampground: function() {
    return haveInCampground;
  },
  haveIntrinsic: function() {
    return haveIntrinsic;
  },
  haveWandererCounter: function() {
    return haveWandererCounter;
  },
  holidayWanderers: function() {
    return holidayWanderers;
  },
  invertMap: function() {
    return invertMap;
  },
  isBooleanProperty: function() {
    return isBooleanProperty;
  },
  isCurrentFamiliar: function() {
    return isCurrentFamiliar;
  },
  isFamiliarProperty: function() {
    return isFamiliarProperty;
  },
  isLocationProperty: function() {
    return isLocationProperty;
  },
  isMonsterProperty: function() {
    return isMonsterProperty;
  },
  isNumericOrStringProperty: function() {
    return isNumericOrStringProperty;
  },
  isNumericProperty: function() {
    return isNumericProperty;
  },
  isPhylumProperty: function() {
    return isPhylumProperty;
  },
  isSong: function() {
    return isSong;
  },
  isStatProperty: function() {
    return isStatProperty;
  },
  isStringProperty: function() {
    return isStringProperty;
  },
  isVoteWandererNow: function() {
    return isVoteWandererNow;
  },
  isWandererNow: function() {
    return isWandererNow;
  },
  lgrCurrencies: function() {
    return lgrCurrencies;
  },
  locationProperties: function() {
    return locationProperties;
  },
  logger: function() {
    return logger_default;
  },
  makeByXFunction: function() {
    return makeByXFunction;
  },
  maxBy: function() {
    return maxBy;
  },
  maximizeCached: function() {
    return maximizeCached;
  },
  mergeMaximizeOptions: function() {
    return mergeMaximizeOptions;
  },
  modeableItems: function() {
    return modeableItems;
  },
  modeableState: function() {
    return modeableState;
  },
  monsterProperties: function() {
    return monsterProperties;
  },
  multiSplit: function() {
    return multiSplit;
  },
  noneToNull: function() {
    return noneToNull;
  },
  notNull: function() {
    return notNull;
  },
  notNullish: function() {
    return notNullish;
  },
  numericModifiers: function() {
    return numericModifiers;
  },
  numericOrStringProperties: function() {
    return numericOrStringProperties;
  },
  numericProperties: function() {
    return numericProperties;
  },
  parseNumber: function() {
    return parseNumber;
  },
  permedSkills: function() {
    return permedSkills;
  },
  phylumProperties: function() {
    return phylumProperties;
  },
  possibleLibramSummons: function() {
    return possibleLibramSummons;
  },
  prepareAscension: function() {
    return prepareAscension;
  },
  property: function() {
    return property_exports;
  },
  propertyTypes: function() {
    return propertyTypes_exports;
  },
  questStep: function() {
    return questStep;
  },
  random: function() {
    return random;
  },
  realmAvailable: function() {
    return realmAvailable;
  },
  realmCurrency: function() {
    return realmCurrency;
  },
  realmTypes: function() {
    return realmTypes;
  },
  set: function() {
    return _set;
  },
  setCombatFlags: function() {
    return setCombatFlags;
  },
  setDefaultMaximizeOptions: function() {
    return setDefaultMaximizeOptions;
  },
  setEqual: function() {
    return setEqual;
  },
  setProperties: function() {
    return setProperties;
  },
  signIdToName: function() {
    return signIdToName;
  },
  signNameToId: function() {
    return signNameToId;
  },
  sinceKolmafiaRevision: function() {
    return sinceKolmafiaRevision;
  },
  sinceKolmafiaVersion: function() {
    return sinceKolmafiaVersion;
  },
  splitByCommasWithEscapes: function() {
    return splitByCommasWithEscapes;
  },
  statProperties: function() {
    return statProperties;
  },
  stringModifiers: function() {
    return stringModifiers;
  },
  stringProperties: function() {
    return stringProperties;
  },
  sum: function() {
    return sum;
  },
  sumNumbers: function() {
    return sumNumbers;
  },
  tc: function() {
    return tc;
  },
  telescope: function() {
    return telescope;
  },
  totalFamiliarWeight: function() {
    return totalFamiliarWeight;
  },
  tryFindBanish: function() {
    return tryFindBanish;
  },
  tryFindFreeKill: function() {
    return tryFindFreeKill;
  },
  tryFindFreeRun: function() {
    return tryFindFreeRun;
  },
  tuple: function() {
    return tuple;
  },
  undelay: function() {
    return undelay;
  },
  uneffect: function() {
    return uneffect;
  },
  unequip: function() {
    return unequip;
  },
  withBatch: function() {
    return withBatch;
  },
  withChoice: function() {
    return withChoice;
  },
  withChoices: function() {
    return withChoices;
  },
  withCombatFlags: function() {
    return withCombatFlags;
  },
  withProperties: function() {
    return withProperties;
  },
  withProperty: function() {
    return withProperty;
  }
});
module.exports = __toCommonJS(src_exports);
init_kolmafia_polyfill();

// src/actions/ActionSource.ts
init_kolmafia_polyfill();
var import_kolmafia7 = require("kolmafia");

// src/combat.ts
init_kolmafia_polyfill();
var import_kolmafia5 = require("kolmafia");

// src/lib.ts
init_kolmafia_polyfill();
var import_kolmafia4 = require("kolmafia");

// src/logger.ts
init_kolmafia_polyfill();
var import_kolmafia = require("kolmafia");
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var LogLevels = /* @__PURE__ */ function(LogLevels2) {
  return LogLevels2[LogLevels2.NONE = 0] = "NONE", LogLevels2[LogLevels2.ERROR = 1] = "ERROR", LogLevels2[LogLevels2.WARNING = 2] = "WARNING", LogLevels2[LogLevels2.INFO = 3] = "INFO", LogLevels2[LogLevels2.DEBUG = 4] = "DEBUG", LogLevels2;
}({}), defaultHandlers = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, LogLevels.INFO, function(message) {
  (0, import_kolmafia.printHtml)("<b>[Libram Info]</b> ".concat(message)), (0, import_kolmafia.logprint)("[Libram] ".concat(message));
}), LogLevels.WARNING, function(message) {
  (0, import_kolmafia.printHtml)('<span style="background: orange; color: white;"><b>[Libram Warning]</b> '.concat(message, "</span>")), (0, import_kolmafia.logprint)("[Libram] ".concat(message));
}), LogLevels.ERROR, function(error2) {
  (0, import_kolmafia.printHtml)('<span style="background: red; color: white;"><b>[Libram Error]</b> '.concat(error2.toString(), "</span>")), (0, import_kolmafia.logprint)("[Libram] ".concat(error2));
}), LogLevels.DEBUG, function(message) {
  (0, import_kolmafia.printHtml)('<span style="background: red; color: white;"><b>[Libram Debug]</b> '.concat(message, "</span>")), (0, import_kolmafia.logprint)("[Libram] ".concat(message));
}), Logger = /* @__PURE__ */ function() {
  function Logger2() {
    _classCallCheck(this, Logger2), _defineProperty(this, "handlers", defaultHandlers);
  }
  return _createClass(Logger2, [{
    key: "level",
    get: function() {
      return Logger2.currentLevel;
    }
  }, {
    key: "setLevel",
    value: function(level) {
      Logger2.currentLevel = level;
    }
  }, {
    key: "setHandler",
    value: function(level, callback) {
      this.handlers[level] = callback;
    }
  }, {
    key: "log",
    value: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function(level, message) {
        this.level >= level && this.handlers[level](message);
      }
    )
  }, {
    key: "info",
    value: function(message) {
      this.log(LogLevels.INFO, message);
    }
  }, {
    key: "warning",
    value: function(message) {
      this.log(LogLevels.WARNING, message);
    }
  }, {
    key: "error",
    value: function(message) {
      this.log(LogLevels.ERROR, message);
    }
  }, {
    key: "debug",
    value: function(message) {
      this.log(LogLevels.DEBUG, message);
    }
  }]);
}();
_defineProperty(Logger, "currentLevel", LogLevels.ERROR);
var logger_default = new Logger();

// src/property.ts
var property_exports = {};
__export(property_exports, {
  PropertiesManager: function() {
    return PropertiesManager;
  },
  decrement: function() {
    return decrement;
  },
  get: function() {
    return get;
  },
  getBoolean: function() {
    return getBoolean;
  },
  getBounty: function() {
    return getBounty;
  },
  getClass: function() {
    return getClass;
  },
  getCoinmaster: function() {
    return getCoinmaster;
  },
  getCommaSeparated: function() {
    return getCommaSeparated;
  },
  getEffect: function() {
    return getEffect;
  },
  getElement: function() {
    return getElement;
  },
  getFamiliar: function() {
    return getFamiliar;
  },
  getItem: function() {
    return getItem;
  },
  getLocation: function() {
    return getLocation;
  },
  getMonster: function() {
    return getMonster;
  },
  getNumber: function() {
    return getNumber;
  },
  getPhylum: function() {
    return getPhylum;
  },
  getServant: function() {
    return getServant;
  },
  getSkill: function() {
    return getSkill;
  },
  getSlot: function() {
    return getSlot;
  },
  getStat: function() {
    return getStat;
  },
  getString: function() {
    return getString;
  },
  getThrall: function() {
    return getThrall;
  },
  increment: function() {
    return increment;
  },
  set: function() {
    return _set;
  },
  setProperties: function() {
    return setProperties;
  },
  withChoice: function() {
    return withChoice;
  },
  withChoices: function() {
    return withChoices;
  },
  withProperties: function() {
    return withProperties;
  },
  withProperty: function() {
    return withProperty;
  }
});
init_kolmafia_polyfill();
var import_kolmafia2 = require("kolmafia");

// src/propertyTyping.ts
init_kolmafia_polyfill();

// src/propertyTypes.ts
var propertyTypes_exports = {};
__export(propertyTypes_exports, {
  booleanProperties: function() {
    return booleanProperties;
  },
  familiarProperties: function() {
    return familiarProperties;
  },
  locationProperties: function() {
    return locationProperties;
  },
  monsterProperties: function() {
    return monsterProperties;
  },
  numericOrStringProperties: function() {
    return numericOrStringProperties;
  },
  numericProperties: function() {
    return numericProperties;
  },
  phylumProperties: function() {
    return phylumProperties;
  },
  statProperties: function() {
    return statProperties;
  },
  stringProperties: function() {
    return stringProperties;
  }
});
init_kolmafia_polyfill();
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "debugTopMenuStyle", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "pingLogin", "pingStealthyTimein", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnAlwaysAdd", "svnAlwaysOverwrite", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_faxDataChanged", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "batWingsBatHoleEntrance", "batWingsBatratBurrow", "batWingsBeanbatChamber", "batWingsGuanoJunction", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "candyCaneSwordApartmentBuilding", "candyCaneSwordBlackForest", "candyCaneSwordBowlingAlley", "candyCaneSwordCopperheadClub", "candyCaneSwordDailyDungeon", "candyCaneSwordDefiledCranny", "candyCaneSwordFunHouse", "candyCaneSwordShore", "candyCaneSwordWarFratRoom", "candyCaneSwordWarFratZetas", "candyCaneSwordWarHippyBait", "candyCaneSwordWarHippyLine", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "crimbo23ArmoryAtWar", "crimbo23BarAtWar", "crimbo23CafeAtWar", "crimbo23CottageAtWar", "crimbo23FoundryAtWar", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "errorOnAmbiguousFold", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "floristFriarAvailable", "floristFriarChecked", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "hasTwinkleVision", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "ledCandleDropped", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "noncombatForcerActive", "oasisAvailable", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsFloristFriar", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pirateRealmUnlockedAnemometer", "pirateRealmUnlockedBlunderbuss", "pirateRealmUnlockedBreastplate", "pirateRealmUnlockedClipper", "pirateRealmUnlockedCrabsicle", "pirateRealmUnlockedFlag", "pirateRealmUnlockedFork", "pirateRealmUnlockedGoldRing", "pirateRealmUnlockedManOWar", "pirateRealmUnlockedPlushie", "pirateRealmUnlockedRadioRing", "pirateRealmUnlockedRhum", "pirateRealmUnlockedScurvySkillbook", "pirateRealmUnlockedShavingCream", "pirateRealmUnlockedSpyglass", "pirateRealmUnlockedTattoo", "pirateRealmUnlockedThirdCrewmate", "pirateRealmUnlockedTikiSkillbook", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "replicaChateauAvailable", "replicaNeverendingPartyAlways", "replicaWitchessSetAvailable", "requireBoxServants", "requireSewerTestItems", "restUsingCampAwayTent", "restUsingChateau", "ROMOfOptimalityAvailable", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByEffect", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "superconductorDefeated", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_2002MrStoreCreditsCollected", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_aug1Cast", "_aug2Cast", "_aug3Cast", "_aug4Cast", "_aug5Cast", "_aug6Cast", "_aug7Cast", "_aug8Cast", "_aug9Cast", "_aug10Cast", "_aug11Cast", "_aug12Cast", "_aug13Cast", "_aug14Cast", "_aug15Cast", "_aug16Cast", "_aug17Cast", "_aug18Cast", "_aug19Cast", "_aug20Cast", "_aug21Cast", "_aug22Cast", "_aug23Cast", "_aug24Cast", "_aug25Cast", "_aug26Cast", "_aug27Cast", "_aug28Cast", "_aug29Cast", "_aug30Cast", "_aug31Cast", "_augTodayCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blackMonolithUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_candyCaneSwordBackAlley", "_candyCaneSwordHauntedBedroom", "_candyCaneSwordHauntedLibrary", "_candyCaneSwordLyle", "_candyCaneSwordMadnessBakery", "_candyCaneSwordOvergrownLot", "_candyCaneSwordOvergrownShrine", "_candyCaneSwordPalindome", "_candyCaneSwordSouthOfTheBorder", "_candyCaneSwordSpookyForest", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chibiChanged", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circadianRhythmsRecalled", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTraining", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_emberingHulkFought", "_entauntaunedToday", "_envyfishEggUsed", "_epicMcTwistUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_extraGreasySliderEaten", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_frostyMugUsed", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_hodgmansBlanketDrunk", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatLost", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_leafAntEggCrafted", "_leafDayShortenerCrafted", "_leafTattooCrafted", "_leavesJumped", "_legendaryBeat", "_licenseToChillUsed", "_lodestoneUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_mapToACandyRichBlockUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_miniKiwiIntoxicatingSpiritsBought", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_molehillMountainUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mulliganStewEaten", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pickleJuiceDrunk", "_pingPongGame", "_pirateBellowUsed", "_pirateForkUsed", "_pirateRealmSoldCompass", "_pirateRealmWindicleUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_portableSteamUnitUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_punchingMirrorUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_replicaSnowconeTomeUsed", "_replicaResolutionLibramUsed", "_replicaSmithsTomeUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_saladForkUsed", "_seaJellyHarvested", "_septEmberBalanceChecked", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shadowAffinityToday", "_shadowForestLooted", "_shrubDecorated", "_silverDreadFlaskUsed", "_sitCourseCompleted", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_snowballFactoryUsed", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_sotParcelReturned", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_strangeStalagmiteUsed", "_streamsCrossed", "_structuralEmberUsed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_takerSpaceSuppliesDelivered", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_tiedUpFlamingLeafletFought", "_tiedUpFlamingMonsteraFought", "_tiedUpLeaviathanFought", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voodooSnuffUsed", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_yamBatteryUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"], numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "pingDefaultTestPings", "pingLoginCount", "pingLoginGoal", "pingLoginThreshold", "pingTestPings", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_beachTides", "_g9Effect", "8BitBonusTurns", "8BitScore", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "asolDeferredPoints", "asolPointsPigSkinner", "asolPointsCheeseWizard", "asolPointsJazzAgent", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autopsyTweezersUsed", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableMrStore2002Credits", "availableQuarters", "availableSeptEmbers", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bodyguardCharge", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "bookOfFactsGummi", "bookOfFactsPinata", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "bwApronMealsEaten", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chibiAlignment", "chibiBirthday", "chibiFitness", "chibiIntelligence", "chibiLastVisit", "chibiSocialization", "chilledToTheBone", "cinchoSaltAndLime", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "cookbookbatIngredientsCharge", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTrainingSkill", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "currentReplicaStoreYear", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "dartsThrown", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "droneSelfDestructChipsUsed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "elfGratitude", "encountersUntilDMTChoice", "encountersUntilYachtzeeChoice", "encountersUntilNEPChoice", "encountersUntilSRChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "getsYouDrunkTurnsLeft", "ghostPepperTurnsLeft", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "hareTurnsUsed", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "juicyGarbageUsed", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarsElbowNC", "lastFriarsHeartNC", "lastFriarsNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastShadowForgeUnlockAdventure", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastTrainsetConfiguration", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "legacyPoints", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nanopolymerSpiderWebsUsed", "nextAprilBandTurn", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "peaceTurkeyIndex", "pendingMapReflections", "pingpongSkill", "pirateRealmPlasticPiratesDefeated", "pirateRealmShipsDestroyed", "pirateRealmStormsEscaped", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "powerPillProgress", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rockinRobinProgress", "romanCandelabraRedCasts", "romanCandelabraBlueCasts", "romanCandelabraYellowCasts", "romanCandelabraGreenCasts", "romanCandelabraPurpleCasts", "ROMOfOptimalityCost", "rumpelstiltskinKidsRescued", "rumpelstiltskinTurnsUsed", "rwbMonsterCount", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "screechCombats", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel135", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel227", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "spookyVHSTapeMonsterTurn", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "takerSpaceAnchor", "takerSpaceGold", "takerSpaceMast", "takerSpaceRum", "takerSpaceSilk", "takerSpaceSpice", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "trainsetPosition", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "wereProfessorBite", "wereProfessorKick", "wereProfessorLiver", "wereProfessorPoints", "wereProfessorRend", "wereProfessorResearchPoints", "wereProfessorStomach", "wereProfessorTransformTurns", "whetstonesUsed", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_aprilBandInstruments", "_aprilBandSaxophoneUses", "_aprilBandTomUses", "_aprilBandTubaUses", "_aprilBandStaffUses", "_aprilBandPiccoloUses", "_astralDrops", "_augSkillsCast", "_assertYourAuthorityCast", "_automatedFutureManufactures", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_batWingsCauldronUsed", "_batWingsFreeFights", "_batWingsRestUsed", "_batWingsSwoopUsed", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_bookOfFactsWishes", "_bookOfFactsTatters", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carnivorousPottedPlantWins", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chibiAdventures", "_chipBags", "_chocolateCigarsUsed", "_chocolateCoveredPingPongBallsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_cinchUsed", "_cinchoRests", "_circadianRhythmsAdventures", "_clanFortuneConsultUses", "_clipartSummons", "_cloversPurchased", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cookbookbatCombatsUntilNewQuest", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_dartsLeft", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_douseFoeUses", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_extraTimeUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDrops", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_greyYouAdventures", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_grubbyWoolDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_lawOfAveragesUsed", "_leafblowerML", "_leafLassosCrafted", "_leafMonstersFought", "_leavesBurned", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mapToACandyRichBlockDrops", "_mayamRests", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_mildEvilPerpetrated", "_mimicEggsDonated", "_mimicEggsObtained", "_miniKiwiDrops", "_miniMartiniDrops", "_monkeyPawWishesUsed", "_monsterHabitatsFightsLeft", "_monsterHabitatsRecalled", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_photoBoothEffects", "_photoBoothEquipment", "_pieDrops", "_piePartsCount", "_pirateRealmGold", "_pirateRealmGrog", "_pirateRealmGrub", "_pirateRealmGuns", "_pirateRealmIslandMonstersDefeated", "_pirateRealmSailingTurns", "_pirateRealmShipSpeed", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_questPartyFairItemsOpened", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_robinEggDrops", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shadowBricksUsed", "_shadowRiftCombats", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_slimeVialsHarvested", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_speakeasyFreeFights", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_surprisinglySweetSlashUsed", "_surprisinglySweetStabUsed", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_tearawayPantsAdvs", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_waxGlobDrops", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed", "lastNoncombat15", "lastNoncombat257", "lastNoncombat270", "lastNoncombat273", "lastNoncombat280", "lastNoncombat297", "lastNoncombat322", "lastNoncombat323", "lastNoncombat324", "lastNoncombat341", "lastNoncombat343", "lastNoncombat384", "lastNoncombat386", "lastNoncombat391", "lastNoncombat405", "lastNoncombat406", "lastNoncombat439", "lastNoncombat440", "lastNoncombat441", "lastNoncombat450", "lastNoncombat533", "lastNoncombat539", "lastNoncombat540", "lastNoncombat541", "lastNoncombat588", "lastNoncombat589"], monsterProperties = ["beGregariousMonster", "bodyguardChatMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "holdHandsMonster", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "monkeyPointMonster", "motifMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "rufusDesiredEntity", "rwbMonster", "screencappedMonster", "spookyPuttyMonster", "spookyVHSTapeMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_cookbookbatQuestMonster", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_monsterHabitatsMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_prankCardMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_trickCoinMonster", "_voteMonster"], locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "lastAdventure", "nextAdventure", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "rwbLocation", "sourceOracleTarget", "_cookbookbatQuestLastLocation", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation", "_lastPirateRealmIsland", "_sotParcelLocation"], stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandBufferGCLI", "commandBufferTabbedChat", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "pingDefaultTestPage", "pingLatest", "pingLoginAbort", "pingLoginCheck", "pingLoginFail", "pingLongest", "pingShortest", "pingTestPage", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "8BitColor", "afterAdventureScript", "antiScientificMethod", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishedPhyla", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beastSkillsAvailable", "beastSkillsKnown", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "chibiName", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbo23ArmoryControl", "crimbo23BarControl", "crimbo23CafeControl", "crimbo23CottageControl", "crimbo23FoundryControl", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "currentSITSkill", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "everfullDartPerks", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventureContainer", "lastAdventureTrail", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "lastSelectedFaxbot", "lastSuccessfulFaxbot", "latteIngredients", "latteModifier", "latteUnlocks", "ledCandleMode", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mimicEggMonsters", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "noncombatForcers", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpClipper", "questESpEVE", "questESpFakeMedium", "questESpGore", "questESpJunglePun", "questESpOutOfOrder", "questESpSerum", "questESpSmokes", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11MacGuffin", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12HippyFrat", "questL12War", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questRufus", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "retroCapeSuperhero", "retroCapeWashingInstructions", "royalty", "rufusDesiredArtifact", "rufusDesiredItems", "rufusQuestTarget", "rufusQuestType", "scriptMRUList", "seahorseName", "shadowLabyrinthGoal", "shadowRiftIngress", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trainsetConfiguration", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "wereProfessorAdvancedResearch", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_automatedFutureSide", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_citizenZone", "_citizenZoneMods", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_cookbookbatQuestIngredient", "_currentDartboard", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_futuristicCollarModifier", "_futuristicHatModifier", "_futuristicShirtModifier", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatActions", "_lastCombatStarted", "_locketMonstersFought", "_mayamSymbolsUsed", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pirateRealmCrewmate", "_pirateRealmCrewmate1", "_pirateRealmCrewmate2", "_pirateRealmCrewmate3", "_pirateRealmCurio", "_pirateRealmShip", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_questPirateRealm", "_roboDrinks", "_roninStoragePulls", "_savageBeastMods", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_trickOrTreatBlock", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"], numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475", "choiceAdventure1486", "choiceAdventure1487", "choiceAdventure1488", "choiceAdventure1489", "choiceAdventure1491", "choiceAdventure1494", "choiceAdventure1505", "choiceAdventure1528", "choiceAdventure1534", "choiceAdventure1538", "choiceAdventure1539"], familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"], statProperties = ["nsChallenge1", "snojoSetting"], phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum", "_circadianRhythmsPhylum"];

// src/propertyTyping.ts
var booleanPropertiesSet = new Set(booleanProperties), numericPropertiesSet = new Set(numericProperties), numericOrStringPropertiesSet = new Set(numericOrStringProperties), stringPropertiesSet = new Set(stringProperties), locationPropertiesSet = new Set(locationProperties), monsterPropertiesSet = new Set(monsterProperties), familiarPropertiesSet = new Set(familiarProperties), statPropertiesSet = new Set(statProperties), phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}

// src/property.ts
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _classCallCheck2(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties2(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass2(e, r, t) {
  return r && _defineProperties2(e.prototype, r), t && _defineProperties2(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive2(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
var createPropertyGetter = function(transform2) {
  return function(property, default_) {
    var value = (0, import_kolmafia2.getProperty)(property);
    return default_ !== void 0 && value === "" ? default_ : transform2(value, property);
  };
}, createMafiaClassPropertyGetter = function(Type, toType) {
  return createPropertyGetter(function(value) {
    if (value === "") return null;
    var v = toType(value);
    return v === Type.none ? null : v;
  });
}, getString = createPropertyGetter(function(value) {
  return value;
}), getCommaSeparated = createPropertyGetter(function(value) {
  return value.split(/, ?/);
}), getBoolean = createPropertyGetter(function(value) {
  return value === "true";
}), getNumber = createPropertyGetter(function(value) {
  return Number(value);
}), getBounty = createMafiaClassPropertyGetter(import_kolmafia2.Bounty, import_kolmafia2.toBounty), getClass = createMafiaClassPropertyGetter(import_kolmafia2.Class, import_kolmafia2.toClass), getCoinmaster = createMafiaClassPropertyGetter(import_kolmafia2.Coinmaster, import_kolmafia2.toCoinmaster), getEffect = createMafiaClassPropertyGetter(import_kolmafia2.Effect, import_kolmafia2.toEffect), getElement = createMafiaClassPropertyGetter(import_kolmafia2.Element, import_kolmafia2.toElement), getFamiliar = createMafiaClassPropertyGetter(import_kolmafia2.Familiar, import_kolmafia2.toFamiliar), getItem = createMafiaClassPropertyGetter(import_kolmafia2.Item, import_kolmafia2.toItem), getLocation = createMafiaClassPropertyGetter(import_kolmafia2.Location, import_kolmafia2.toLocation), getMonster = createMafiaClassPropertyGetter(import_kolmafia2.Monster, import_kolmafia2.toMonster), getPhylum = createMafiaClassPropertyGetter(import_kolmafia2.Phylum, import_kolmafia2.toPhylum), getServant = createMafiaClassPropertyGetter(import_kolmafia2.Servant, import_kolmafia2.toServant), getSkill = createMafiaClassPropertyGetter(import_kolmafia2.Skill, import_kolmafia2.toSkill), getSlot = createMafiaClassPropertyGetter(import_kolmafia2.Slot, import_kolmafia2.toSlot), getStat = createMafiaClassPropertyGetter(import_kolmafia2.Stat, import_kolmafia2.toStat), getThrall = createMafiaClassPropertyGetter(import_kolmafia2.Thrall, import_kolmafia2.toThrall);
function get(property, _default) {
  var value = getString(property);
  if (isBooleanProperty(property)) {
    var _getBoolean;
    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : !1;
  } else if (isNumericProperty(property)) {
    var _getNumber;
    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else {
    if (isNumericOrStringProperty(property))
      return value.match(/^\d+$/) ? parseInt(value) : value;
    if (isLocationProperty(property))
      return getLocation(property, _default);
    if (isMonsterProperty(property))
      return getMonster(property, _default);
    if (isFamiliarProperty(property))
      return getFamiliar(property, _default);
    if (isStatProperty(property))
      return getStat(property, _default);
    if (isPhylumProperty(property))
      return getPhylum(property, _default);
    if (isStringProperty(property))
      return value === "" && _default !== void 0 ? _default : value;
  }
  return _default instanceof import_kolmafia2.Location ? getLocation(property, _default) : _default instanceof import_kolmafia2.Monster ? getMonster(property, _default) : _default instanceof import_kolmafia2.Familiar ? getFamiliar(property, _default) : _default instanceof import_kolmafia2.Stat ? getStat(property, _default) : _default instanceof import_kolmafia2.Phylum ? getPhylum(property, _default) : typeof _default == "boolean" ? value === "true" ? !0 : value === "false" ? !1 : _default : typeof _default == "number" ? value === "" ? _default : parseInt(value) : value === "" ? _default === void 0 ? "" : _default : value;
}
function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  return (0, import_kolmafia2.setProperty)(property, stringValue), value;
}
function increment(property) {
  var delta = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1 / 0, value = get(property);
  if (!isNumericProperty(property)) return value;
  var nextValue = Math.min(max, value + delta);
  return _set(property, nextValue);
}
function decrement(property) {
  var delta = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, min = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1 / 0, value = get(property);
  if (!isNumericProperty(property)) return value;
  var nextValue = Math.max(min, value - delta);
  return _set(property, nextValue);
}
function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), prop = _Object$entries$_i[0], _value = _Object$entries$_i[1];
    _set(prop, _value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 1), prop = _ref2[0];
    return [prop, get(prop)];
  }));
  setProperties(properties);
  try {
    return callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  return withProperties(_defineProperty2({}, property, value), callback);
}
function withChoices(choices2, callback) {
  var properties = Object.fromEntries(Object.entries(choices2).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), choice = _ref4[0], option = _ref4[1];
    return ["choiceAdventure".concat(choice), option];
  }));
  return withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  return withChoices(_defineProperty2({}, choice, value), callback);
}
var PropertiesManager = /* @__PURE__ */ function() {
  function PropertiesManager2() {
    _classCallCheck2(this, PropertiesManager2), _defineProperty2(this, "properties", {});
  }
  return _createClass2(PropertiesManager2, [{
    key: "storedValues",
    get: function() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     *
     * @param propertiesToSet A Properties object, keyed by property name.
     */
  }, {
    key: "set",
    value: function(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), propertyName = _Object$entries2$_i[0], propertyValue = _Object$entries2$_i[1];
        propertyName in this.properties || (this.properties[propertyName] = (0, import_kolmafia2.propertyExists)(propertyName) ? get(propertyName) : PropertiesManager2.EMPTY_PREFERENCE), _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     *
     * @param choicesToSet An object keyed by choice adventure number.
     */
  }, {
    key: "setChoices",
    value: function(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), choiceNumber = _ref6[0], choiceValue = _ref6[1];
        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     *
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */
  }, {
    key: "setChoice",
    value: function(choiceToSet, value) {
      this.setChoices(_defineProperty2({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     *
     * @param properties Collection of properties to reset.
     */
  }, {
    key: "reset",
    value: function() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++)
        properties[_key] = arguments[_key];
      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var _property = _properties[_i3];
        if (_property in this.properties) {
          var _value2 = this.properties[_property];
          _value2 === PropertiesManager2.EMPTY_PREFERENCE ? (0, import_kolmafia2.removeProperty)(_property) : _set(_property, _value2);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */
  }, {
    key: "resetAll",
    value: function() {
      this.reset.apply(this, _toConsumableArray(Object.keys(this.properties)));
    }
    /**
     * Stops storing the original values of inputted properties.
     *
     * @param properties Properties for the manager to forget.
     */
  }, {
    key: "clear",
    value: function() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        properties[_key2] = arguments[_key2];
      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var _property2 = _properties2[_i4];
        this.properties[_property2] && delete this.properties[_property2];
      }
    }
    /**
     * Clears all properties.
     */
  }, {
    key: "clearAll",
    value: function() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     *
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMinimumValue",
    value: function(property, value) {
      return get(property, 0) < value ? (this.set(_defineProperty2({}, property, value)), !0) : !1;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     *
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMaximumValue",
    value: function(property, value) {
      return get(property, 0) > value ? (this.set(_defineProperty2({}, property, value)), !0) : !1;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     *
     * @returns A new PropertiesManager, with identical stored values to this one.
     */
  }, {
    key: "clone",
    value: function() {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = this.storedValues, newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     *
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */
  }, {
    key: "clamp",
    value: function(property, min, max) {
      if (max < min) return !1;
      var start = get(property);
      return this.setMinimumValue(property, min), this.setMaximumValue(property, max), start !== get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     *
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */
  }, {
    key: "equals",
    value: function(other) {
      var thisProps = Object.entries(this.storedValues), otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return !1;
      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2), propertyName = _thisProps$_i[0], propertyValue = _thisProps$_i[1];
        if (otherProps.get(propertyName) === propertyValue) return !1;
      }
      return !0;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     *
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */
  }, {
    key: "merge",
    value: function(other) {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties), newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     *
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */
  }], [{
    key: "merge",
    value: function() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
        mergees[_key3] = arguments[_key3];
      return mergees.length === 0 ? new PropertiesManager2() : mergees.reduce(function(a, b) {
        return a.merge(b);
      });
    }
  }]);
}();
_defineProperty2(PropertiesManager, "EMPTY_PREFERENCE", Symbol("empty preference"));

// src/template-string.ts
init_kolmafia_polyfill();
var import_kolmafia3 = require("kolmafia");

// src/utils.ts
init_kolmafia_polyfill();
function _createForOfIteratorHelper(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray2(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _slicedToArray2(r, e) {
  return _arrayWithHoles2(r) || _iterableToArrayLimit2(r, e) || _unsupportedIterableToArray2(r, e) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles2(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray2(r) {
  return _arrayWithoutHoles2(r) || _iterableToArray2(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _iterableToArray2(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles2(r) {
  if (Array.isArray(r)) return _arrayLikeToArray2(r);
}
function _arrayLikeToArray2(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function notNull(value) {
  return value !== null;
}
function notNullish(value) {
  return notNull(value) && value !== void 0;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function chunk(array, chunkSize) {
  for (var result = [], i = 0; i < array.length; i += chunkSize)
    result.push(array.slice(i, i + chunkSize));
  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = /* @__PURE__ */ new Map();
  return array.forEach(function(item14) {
    map.set(item14, (map.get(item14) || 0) + 1);
  }), map;
}
function countedMapToArray(map) {
  var _ref;
  return (_ref = []).concat.apply(_ref, _toConsumableArray2(_toConsumableArray2(map).map(function(_ref2) {
    var _ref3 = _slicedToArray2(_ref2, 2), item14 = _ref3[0], quantity = _ref3[1];
    return Array(quantity).fill(item14);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray2(map).map(function(_ref4) {
    var _ref5 = _slicedToArray2(_ref4, 2), item14 = _ref5[0], quantity = _ref5[1];
    return "".concat(quantity, " x ").concat(item14);
  }).join(", ");
}
function sum(addends, x) {
  return addends.reduce(function(subtotal, element) {
    return subtotal + (typeof x == "function" ? x(element) : element[x]);
  }, 0);
}
function sumNumbers(addends) {
  return sum(addends, function(x) {
    return x;
  });
}
function arrayContains(item14, array) {
  return array.includes(item14);
}
function setEqual(a, b) {
  var sortedA = _toConsumableArray2(a).sort(), sortedB = _toConsumableArray2(b).sort();
  return a.length === b.length && sortedA.every(function(item14, index) {
    return item14 === sortedB[index];
  });
}
function invertMap(map) {
  var returnValue = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper(map), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray2(_step.value, 2), _key = _step$value[0], value = _step$value[1];
      returnValue.set(value, _key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}
function maxBy(array, optimizer) {
  var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!array.length) throw new Error("Cannot call maxBy on an empty array!");
  return typeof optimizer == "function" ? _toConsumableArray2(array).reduce(function(_ref6, other) {
    var value = _ref6.value, item14 = _ref6.item, otherValue = optimizer(other);
    return value >= otherValue !== reverse ? {
      value: value,
      item: item14
    } : {
      value: otherValue,
      item: other
    };
  }, {
    item: array[0],
    value: optimizer(array[0])
  }).item : array.reduce(function(a, b) {
    return a[optimizer] >= b[optimizer] !== reverse ? a : b;
  });
}
function tuple() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++)
    args[_key2] = arguments[_key2];
  return args;
}
function arrayEquals(left, right) {
  return left.length !== right.length ? !1 : left.every(function(element, index) {
    return element === right[index];
  });
}
function undelay(delayedObject) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++)
    args[_key3 - 1] = arguments[_key3];
  return typeof delayedObject == "function" ? delayedObject.apply(void 0, args) : delayedObject;
}
function makeByXFunction(source) {
  return function(options, alternateSource) {
    var _options$val, val = undelay(alternateSource != null ? alternateSource : source);
    return "default" in options ? (_options$val = options[val]) !== null && _options$val !== void 0 ? _options$val : options.default : options[val];
  };
}
function flat(arr) {
  var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0, flatArray = [], _iterator3 = _createForOfIteratorHelper(arr), _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var item14 = _step3.value;
      if (Array.isArray(item14) && depth > 0) {
        var child = flat(item14, depth - 1);
        flatArray = flatArray.concat(child);
      } else
        flatArray.push(item14);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return flatArray;
}
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
var tc = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
function multiSplit(prop, outerDelimiter, innerDelimiter, mappers) {
  var initialSplit = prop.split(outerDelimiter).filter(Boolean), multiDimensionalArray = outerDelimiter === innerDelimiter ? chunk(initialSplit, mappers.length) : initialSplit.map(function(entry) {
    return entry.split(innerDelimiter);
  });
  return multiDimensionalArray.map(function(tup) {
    return mappers.map(function(func, index) {
      return func(tup[index]);
    });
  });
}

// src/template-string.ts
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, handleTypeGetError = function(Type, error2) {
  var message = "".concat(error2), match = message.match(RegExp("Bad ".concat(Type.name.toLowerCase(), " value: .*")));
  match ? (0, import_kolmafia3.print)("".concat(match[0], "; if you're certain that this ").concat(Type.name, " exists and is spelled correctly, please update KoLMafia"), "red") : (0, import_kolmafia3.print)(message);
}, createSingleConstant = function(Type, converter) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    try {
      return Type.get(input);
    } catch (error2) {
      handleTypeGetError(Type, error2);
    }
    (0, import_kolmafia3.abort)();
  };
  return tagFunction.cls = Type, tagFunction.none = Type.none, tagFunction.get = function(name) {
    var value = converter(name);
    return value === Type.none ? null : value;
  }, tagFunction;
}, createPluralConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    if (input === "")
      return Type.all();
    try {
      return Type.get(splitByCommasWithEscapes(input));
    } catch (error2) {
      handleTypeGetError(Type, error2);
    }
    (0, import_kolmafia3.abort)();
  };
  return tagFunction.all = function() {
    return Type.all();
  }, tagFunction;
}, $bounty = createSingleConstant(import_kolmafia3.Bounty, import_kolmafia3.toBounty), $bounties = createPluralConstant(import_kolmafia3.Bounty), $class = createSingleConstant(import_kolmafia3.Class, import_kolmafia3.toClass), $classes = createPluralConstant(import_kolmafia3.Class), $coinmaster = createSingleConstant(import_kolmafia3.Coinmaster, import_kolmafia3.toCoinmaster), $coinmasters = createPluralConstant(import_kolmafia3.Coinmaster), $effect = createSingleConstant(import_kolmafia3.Effect, import_kolmafia3.toEffect), $effects = createPluralConstant(import_kolmafia3.Effect), $element = createSingleConstant(import_kolmafia3.Element, import_kolmafia3.toElement), $elements = createPluralConstant(import_kolmafia3.Element), $familiar = createSingleConstant(import_kolmafia3.Familiar, import_kolmafia3.toFamiliar), $familiars = createPluralConstant(import_kolmafia3.Familiar), $item = createSingleConstant(import_kolmafia3.Item, import_kolmafia3.toItem), $items = createPluralConstant(import_kolmafia3.Item), $location = createSingleConstant(import_kolmafia3.Location, import_kolmafia3.toLocation), $locations = createPluralConstant(import_kolmafia3.Location), $modifier = createSingleConstant(import_kolmafia3.Modifier, import_kolmafia3.toModifier), $modifiers = createPluralConstant(import_kolmafia3.Modifier), $monster = createSingleConstant(import_kolmafia3.Monster, import_kolmafia3.toMonster), $monsters = createPluralConstant(import_kolmafia3.Monster), $path = createSingleConstant(import_kolmafia3.Path, import_kolmafia3.toPath), $paths = createPluralConstant(import_kolmafia3.Path), $phylum = createSingleConstant(import_kolmafia3.Phylum, import_kolmafia3.toPhylum), $phyla = createPluralConstant(import_kolmafia3.Phylum), $servant = createSingleConstant(import_kolmafia3.Servant, import_kolmafia3.toServant), $servants = createPluralConstant(import_kolmafia3.Servant), $skill = createSingleConstant(import_kolmafia3.Skill, import_kolmafia3.toSkill), $skills = createPluralConstant(import_kolmafia3.Skill), $slot = createSingleConstant(import_kolmafia3.Slot, import_kolmafia3.toSlot), $slots = createPluralConstant(import_kolmafia3.Slot), $stat = createSingleConstant(import_kolmafia3.Stat, import_kolmafia3.toStat), $stats = createPluralConstant(import_kolmafia3.Stat), $thrall = createSingleConstant(import_kolmafia3.Thrall, import_kolmafia3.toThrall), $thralls = createPluralConstant(import_kolmafia3.Thrall);

// src/lib.ts
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;
function _toConsumableArray3(r) {
  return _arrayWithoutHoles3(r) || _iterableToArray3(r) || _unsupportedIterableToArray3(r) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray3(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles3(r) {
  if (Array.isArray(r)) return _arrayLikeToArray3(r);
}
function _defineProperties3(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey3(o.key), o);
  }
}
function _createClass3(e, r, t) {
  return r && _defineProperties3(e.prototype, r), t && _defineProperties3(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey3(t) {
  var i = _toPrimitive3(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive3(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _classCallCheck3(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(t2) {
    if (t2 === null || !_isNativeFunction(t2)) return t2;
    if (typeof t2 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r !== void 0) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct(t2, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t2);
  }, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return Function.toString.call(t).indexOf("[native code]") !== -1;
  } catch (n) {
    return typeof t == "function";
  }
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}
function _createForOfIteratorHelper2(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray3(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _slicedToArray3(r, e) {
  return _arrayWithHoles3(r) || _iterableToArrayLimit3(r, e) || _unsupportedIterableToArray3(r, e) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray3(r, a) : void 0;
  }
}
function _arrayLikeToArray3(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit3(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles3(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function getSongLimit() {
  return 3 + ((0, import_kolmafia4.booleanModifier)("Four Songs") ? 1 : 0) + (0, import_kolmafia4.numericModifier)("Additional Song");
}
function isSong(skillOrEffect) {
  if (skillOrEffect instanceof import_kolmafia4.Effect && skillOrEffect.attributes.includes("song"))
    return !0;
  var skill = skillOrEffect instanceof import_kolmafia4.Effect ? (0, import_kolmafia4.toSkill)(skillOrEffect) : skillOrEffect;
  return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
}
function getActiveEffects() {
  return Object.keys((0, import_kolmafia4.myEffects)()).map(function(e) {
    return import_kolmafia4.Effect.get(e);
  });
}
function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
function getSongCount() {
  return getActiveSongs().length;
}
function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
function getMonsterLocations(monster) {
  return import_kolmafia4.Location.all().filter(function(location) {
    return monster.name in (0, import_kolmafia4.appearanceRates)(location);
  });
}
function getRemainingLiver() {
  return (0, import_kolmafia4.inebrietyLimit)() - (0, import_kolmafia4.myInebriety)();
}
function getRemainingStomach() {
  return (0, import_kolmafia4.fullnessLimit)() - (0, import_kolmafia4.myFullness)();
}
function getRemainingSpleen() {
  return (0, import_kolmafia4.spleenLimit)() - (0, import_kolmafia4.mySpleenUse)();
}
function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if (thing instanceof import_kolmafia4.Effect)
    return (0, import_kolmafia4.haveEffect)(thing) >= quantity;
  if (thing instanceof import_kolmafia4.Familiar)
    return (0, import_kolmafia4.haveFamiliar)(thing);
  if (thing instanceof import_kolmafia4.Item)
    return (0, import_kolmafia4.availableAmount)(thing) >= quantity;
  if (thing instanceof import_kolmafia4.Servant)
    return (0, import_kolmafia4.haveServant)(thing);
  if (thing instanceof import_kolmafia4.Skill)
    return (0, import_kolmafia4.haveSkill)(thing);
  if (thing instanceof import_kolmafia4.Thrall) {
    var thrall = (0, import_kolmafia4.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }
  return !1;
}
function haveInCampground(item14) {
  return Object.keys((0, import_kolmafia4.getCampground)()).map(function(i) {
    return import_kolmafia4.Item.get(i);
  }).includes(item14);
}
var Wanderer = /* @__PURE__ */ function(Wanderer2) {
  return Wanderer2.Digitize = "Digitize Monster", Wanderer2.Enamorang = "Enamorang Monster", Wanderer2.Familiar = "Familiar", Wanderer2.Holiday = "Holiday Monster", Wanderer2.Kramco = "Kramco", Wanderer2.Nemesis = "Nemesis Assassin", Wanderer2.Portscan = "portscan.edu", Wanderer2.Romantic = "Romantic Monster", Wanderer2.Vote = "Vote Monster", Wanderer2;
}({}), deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, maxTurns = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 500;
  return (0, import_kolmafia4.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer);
  var begin = wanderer + " window begin", end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
function isVoteWandererNow() {
  return (0, import_kolmafia4.totalTurnsPlayed)() % 11 === 1 && get("lastVoteMonsterTurn") < (0, import_kolmafia4.totalTurnsPlayed)();
}
function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer, 0, 0);
  if (wanderer === Wanderer.Kramco)
    return !0;
  if (wanderer === Wanderer.Vote)
    return isVoteWandererNow();
  if (wanderer === Wanderer.Familiar)
    return get("_hipsterAdv") < 7;
  var begin = wanderer + " window begin", end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
function getKramcoWandererChance() {
  var fights = get("_sausageFights"), lastFight = get("_lastSausageMonsterTurn"), totalTurns = (0, import_kolmafia4.totalTurnsPlayed)();
  if (fights < 1)
    return lastFight === totalTurns && (0, import_kolmafia4.myTurncount)() < 1 ? 0.5 : 1;
  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.max(0, fights - 5) ** 3));
}
function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv"), probability = [0.5, 0.4, 0.3, 0.2];
  return totalFights < 4 ? probability[totalFights] : totalFights > 7 ? 0 : 0.1;
}
function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer, 0, 0) ? 1 : 0;
  if (wanderer === Wanderer.Kramco && getKramcoWandererChance(), wanderer === Wanderer.Vote)
    return isVoteWandererNow() ? 1 : 0;
  wanderer === Wanderer.Familiar && getFamiliarWandererChance();
  var begin = wanderer + " window begin", end = wanderer + " window end";
  if (haveCounter(begin, 1, 100))
    return 0;
  var counters = get("relayCounters"), re = new RegExp("(\\d+):" + end), matches = counters.match(re);
  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - (0, import_kolmafia4.myTurncount)();
    return 1 / window;
  }
  return 0;
}
function isCurrentFamiliar(familiar10) {
  return (0, import_kolmafia4.myFamiliar)() === familiar10;
}
var foldGroupCache = /* @__PURE__ */ new Map();
function getFoldGroup(item14) {
  var cache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (cache) {
    var cached = foldGroupCache.get(item14);
    if (cached !== void 0) return cached;
  }
  var result = Object.entries((0, import_kolmafia4.getRelated)(item14, "fold")).sort(function(_ref, _ref2) {
    var _ref3 = _slicedToArray3(_ref, 2), a = _ref3[1], _ref4 = _slicedToArray3(_ref2, 2), b = _ref4[1];
    return a - b;
  }).map(function(_ref5) {
    var _ref6 = _slicedToArray3(_ref5, 1), i = _ref6[0];
    return import_kolmafia4.Item.get(i);
  }), _iterator = _createForOfIteratorHelper2(result), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var fold = _step.value;
      foldGroupCache.set(fold, result);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
function getZapGroup(item14) {
  return Object.keys((0, import_kolmafia4.getRelated)(item14, "zap")).map(function(i) {
    return import_kolmafia4.Item.get(i);
  });
}
var banishSource = function(banisher) {
  if (banisher.toLowerCase() === "saber force") return $skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"])));
  if (banisher.toLowerCase() === "nanorhino") return $skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Unleash Nanites"])));
  var item14 = (0, import_kolmafia4.toItem)(banisher);
  return $items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["none, training scroll:  Snokebomb, tomayohawk-style reflex hammer"]))).includes(item14) ? (0, import_kolmafia4.toSkill)(banisher) : item14;
};
function getBanishedMonsters() {
  return new Map(multiSplit(get("banishedMonsters"), ":", ":", [banishSource, import_kolmafia4.toMonster, Number]).map(function(_ref7) {
    var _ref8 = _slicedToArray3(_ref7, 2), source = _ref8[0], monster = _ref8[1];
    return [source, monster];
  }));
}
function canUse(item14) {
  var path3 = (0, import_kolmafia4.myPath)();
  return !(path3 !== import_kolmafia4.Path.get("Nuclear Autumn") && $items(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item14) || path3 === import_kolmafia4.Path.get("G-Lover") && !item14.name.toLowerCase().includes("g") || path3 === import_kolmafia4.Path.get("Bees Hate You") && item14.name.toLowerCase().includes("b"));
}
function noneToNull(thing) {
  var type = import_kolmafia4.MafiaClasses.find(function(t) {
    return thing instanceof t;
  });
  return type && thing === type.none ? null : thing;
}
function getRange(range) {
  var _range$match$slice$ma, _range$match, _ref9 = (_range$match$slice$ma = (_range$match = range.match(/^(-?\d+)(?:-(-?\d+))?$/)) === null || _range$match === void 0 ? void 0 : _range$match.slice(1, 3).map(function(v) {
    return parseInt(v);
  })) !== null && _range$match$slice$ma !== void 0 ? _range$match$slice$ma : [0], _ref10 = _slicedToArray3(_ref9, 2), lower = _ref10[0], upper = _ref10[1];
  return [lower, Number.isNaN(upper) || upper === void 0 ? lower : upper];
}
function getAverage(range) {
  var _getRange = getRange(range), _getRange2 = _slicedToArray3(_getRange, 2), min = _getRange2[0], max = _getRange2[1];
  return (min + max) / 2;
}
function getAverageAdventures(item14) {
  return getAverage(item14.adventures);
}
function uneffect(effect2) {
  return (0, import_kolmafia4.cliExecute)("uneffect ".concat(effect2.name));
}
function getPlayerIdFromName(name) {
  var onMissing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "throw", playerId = (0, import_kolmafia4.getPlayerId)(name);
  if (playerId === name) {
    if (onMissing === "throw")
      throw new Error("Player not found: ".concat(name));
    return null;
  }
  return parseInt(playerId);
}
function getPlayerNameFromId(id) {
  var onMissing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "throw", playerName = (0, import_kolmafia4.getPlayerName)(id);
  if (playerName === id.toString()) {
    if (onMissing === "throw")
      throw new Error("Player not found: ".concat(playerName));
    return null;
  }
  return playerName;
}
function getPlayerFromIdOrName(idOrName) {
  var onMissing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "throw";
  if (typeof idOrName == "number") {
    var _name = getPlayerNameFromId(idOrName, onMissing);
    return _name === null ? null : {
      name: _name,
      id: idOrName
    };
  } else {
    var _id = getPlayerIdFromName(idOrName, onMissing);
    if (_id === null) return null;
    var _name2 = (0, import_kolmafia4.getPlayerName)(_id);
    return {
      name: _name2,
      id: _id
    };
  }
}
function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;
  if (stringStep === "started") return 0;
  if (stringStep === "finished" || stringStep === "") return 999;
  if (stringStep.substring(0, 4) !== "step")
    throw new Error("Quest state parsing error.");
  return parseInt(stringStep.substring(4), 10);
}
var EnsureError = /* @__PURE__ */ function(_Error) {
  function EnsureError2(cause, reason) {
    var _this;
    return _classCallCheck3(this, EnsureError2), _this = _callSuper(this, EnsureError2, ["Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : "")]), _this.name = "Ensure Error", _this;
  }
  return _inherits(EnsureError2, _Error), _createClass3(EnsureError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function ensureEffect(ef) {
  var turns2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if ((0, import_kolmafia4.haveEffect)(ef) < turns2) {
    if (ef.default === null)
      throw new EnsureError(ef, "No default action");
    if (!(0, import_kolmafia4.cliExecute)(ef.default) || (0, import_kolmafia4.haveEffect)(ef) === 0)
      throw new EnsureError(ef);
  }
}
var valueMap = /* @__PURE__ */ new Map(), MALL_VALUE_MODIFIER = 0.9;
function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  return items.map(function(item14) {
    return valueMap.has(item14) || (item14.discardable ? valueMap.set(item14, (0, import_kolmafia4.mallPrice)(item14) > Math.max(2 * (0, import_kolmafia4.autosellPrice)(item14), 100) ? MALL_VALUE_MODIFIER * (0, import_kolmafia4.mallPrice)(item14) : (0, import_kolmafia4.autosellPrice)(item14)) : valueMap.set(item14, (0, import_kolmafia4.mallPrice)(item14) > 100 ? MALL_VALUE_MODIFIER * (0, import_kolmafia4.mallPrice)(item14) : 0)), valueMap.get(item14) || 0;
  }).reduce(function(s, price2) {
    return s + price2;
  }, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
function findLeprechaunMultiplier(familiar10) {
  if (familiar10 === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Mutant Cactus Bud"]))))
    return (0, import_kolmafia4.numericModifier)(familiar10, "Leprechaun Effectiveness", 1, $item.none);
  if (familiar10 === $familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var meatBonus = (0, import_kolmafia4.numericModifier)(familiar10, "Meat Drop", 1, $item.none);
  return meatBonus === 0 ? 0 : Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
function findFairyMultiplier(familiar10) {
  if (familiar10 === $familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Mutant Fire Ant"]))))
    return (0, import_kolmafia4.numericModifier)(familiar10, "Fairy Effectiveness", 1, $item.none);
  if (familiar10 === $familiar(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = (0, import_kolmafia4.numericModifier)(familiar10, "Item Drop", 1, $item.none);
  return itemBonus === 0 ? 0 : familiar10 === $familiar(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Jill-of-All-Trades"]))) ? 1.5 : Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = /* @__PURE__ */ new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0, import_kolmafia4.holiday)().split("/").flatMap(function(holiday2) {
    var _holidayWanderers$get;
    return (_holidayWanderers$get = holidayWanderers.get(holiday2)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  });
}
function canVisitUrl() {
  return (0, import_kolmafia4.currentRound)() ? (logger_default.debug("Current round is ".concat((0, import_kolmafia4.currentRound)(), "; you're in combat.")), !1) : (0, import_kolmafia4.inMultiFight)() ? (logger_default.debug("You're in a multifight."), !1) : (0, import_kolmafia4.choiceFollowsFight)() ? (logger_default.debug("A choice follows this fight."), !1) : (0, import_kolmafia4.handlingChoice)() ? (logger_default.debug("You're currently in a choice adventure"), !1) : !0;
}
function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = (0, import_kolmafia4.elementalResistance)(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = /* @__PURE__ */ new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Moxie"])))]]), telescopeElements = /* @__PURE__ */ new Map([["people, all of whom appear to be on fire", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap1 = /* @__PURE__ */ new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap2 = /* @__PURE__ */ new Map([["smoke rising from deeper within the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap3 = /* @__PURE__ */ new Map([["with lava slowly oozing out of it", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["cold"])))]]);
function telescope() {
  return Object.fromEntries(Object.entries({
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  }).filter(function(_ref11) {
    var _ref12 = _slicedToArray3(_ref11, 2), value = _ref12[1];
    return value;
  }));
}
function examine(thing) {
  var url = thing instanceof import_kolmafia4.Item ? "desc_item.php?whichitem=".concat(thing.descid) : thing instanceof import_kolmafia4.Familiar ? "desc_familiar.php?which=".concat(thing.id) : thing instanceof import_kolmafia4.Effect ? "desc_effect.php?whicheffect=".concat(thing.descid) : "desc_skill.php?whichskill=".concat(thing.id);
  return (0, import_kolmafia4.visitUrl)(url);
}
var byStat = makeByXFunction(function() {
  return (0, import_kolmafia4.myPrimestat)().toString();
}), byClass = makeByXFunction(function() {
  return (0, import_kolmafia4.myClass)().toString();
});
function directlyUse(item14) {
  return (0, import_kolmafia4.visitUrl)("inv_use.php?which=3&whichitem=".concat(item14.id, "&pwd"));
}
function unequip(thing) {
  if (thing instanceof import_kolmafia4.Slot) return (0, import_kolmafia4.equip)(thing, $item.none);
  var failedSlots = import_kolmafia4.Slot.all().filter(function(s) {
    return (0, import_kolmafia4.equippedItem)(s) !== thing ? !1 : !unequip(thing);
  });
  return failedSlots.length && logger_default.debug("Failed to unequip ".concat(thing, " from slots ").concat(failedSlots.join(", "))), failedSlots.length === 0;
}
function gameDay() {
  var _todayToString$match, _map = ((_todayToString$match = (0, import_kolmafia4.todayToString)().match(/(\d{4})(\d{2})(\d{2})/)) !== null && _todayToString$match !== void 0 ? _todayToString$match : []).map(Number), _map2 = _slicedToArray3(_map, 4), year = _map2[1], month = _map2[2], day = _map2[3];
  return new Date(year, month - 1, day, 0, 0, 0);
}
function freeCrafts() {
  var type = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "all", effectCrafts = function(effect2) {
    return Math.floor((0, import_kolmafia4.haveEffect)(effect2) / 5);
  }, all2 = (have($skill(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Rapid Prototyping"])))) ? 5 - get("_rapidPrototypingUsed") : 0) + (have($skill(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Expert Corner-Cutter"])))) ? 5 - get("_expertCornerCutterUsed") : 0) + effectCrafts($effect(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Inigo's Incantation of Inspiration"])))) + effectCrafts($effect(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Craft Tea"])))) + effectCrafts($effect(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Cooking Concentrate"])))), food = type === "food" ? 5 - get("_cookbookbatCrafting") : 0, smith = type === "smith" ? 5 - get("_thorsPliersCrafting") : 0, booze = 0;
  return all2 + food + smith + booze;
}
var realmTypes = ["spooky", "stench", "hot", "cold", "sleaze", "fantasy", "pirate"];
function realmAvailable(identifier) {
  return identifier === "fantasy" ? get("_frToday") || get("frAlways") : identifier === "pirate" ? get("_prToday") || get("prAlways") : get("_".concat(identifier, "AirportToday")) || get("".concat(identifier, "AirportAlways"));
}
function realmCurrency(realm) {
  switch (realm) {
    case "sleaze":
      return $item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Beach Buck"])));
    case "spooky":
      return $item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Coinspiracy"])));
    case "stench":
      return $item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["FunFunds\u2122"])));
    case "cold":
      return $item(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Wal-Mart gift certificate"])));
    case "hot":
      return $item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Volcoino"])));
    case "fantasy":
      return $item(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Rubee\u2122"])));
    default:
      return null;
  }
}
function lgrCurrencies() {
  return realmTypes.filter(function(realm) {
    return realmAvailable(realm) && !(realm === "hot" && get("_luckyGoldRingVolcoino"));
  }).map(realmCurrency).filter(notNull);
}
var ACCOUNT_COMBAT_FLAGS = ["aabosses", "wowbar", "bothcombatinterf", "compactmanuel", "eternalmrj", "disablelovebugs", "boringdarts"];
function getCombatFlags() {
  var flags = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [].concat(ACCOUNT_COMBAT_FLAGS), accountPage = (0, import_kolmafia4.visitUrl)("account.php?tab=combat");
  return flags.map(function(flag) {
    return {
      flag: flag,
      value: (0, import_kolmafia4.xpath)(accountPage, '//*[@id="opt_flag_'.concat(flag, "\"]/label/input[@type='checkbox']@checked"))[0] === "checked"
    };
  });
}
function setCombatFlags() {
  for (var _len2 = arguments.length, flags = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
    flags[_key2] = arguments[_key2];
  return (0, import_kolmafia4.visitUrl)("account.php?".concat(([].concat(_toConsumableArray3(flags.flatMap(function(_ref13) {
    var flag = _ref13.flag, value = _ref13.value;
    return ["actions[]=flag_".concat(flag), "flag_".concat(flag, "=").concat(Number(value))];
  })), ["action=Update", "am=1", "ajax=1"]).join("&"), !0)));
}
function withCombatFlags(action) {
  for (var _len3 = arguments.length, flags = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
    flags[_key3 - 1] = arguments[_key3];
  var initialValues = getCombatFlags(flags.map(function(_ref14) {
    var flag = _ref14.flag;
    return flag;
  }));
  try {
    return action();
  } finally {
    setCombatFlags.apply(void 0, _toConsumableArray3(initialValues));
  }
}
function haveIntrinsic(effect2) {
  return (0, import_kolmafia4.haveEffect)(effect2) >= 2147483647;
}
function extractItems(text) {
  return new Map(Object.entries((0, import_kolmafia4.extractItems)(text)).map(function(_ref15) {
    var _ref16 = _slicedToArray3(_ref15, 2), itemName = _ref16[0], quantity = _ref16[1];
    return [import_kolmafia4.Item.get(itemName), quantity];
  }));
}
function makeScalerCalcFunction(cache, pattern) {
  return function(monster) {
    var _pattern$exec$, _pattern$exec, current2 = cache.get(monster);
    if (current2 !== void 0) return (0, import_kolmafia4.monsterEval)(current2);
    var result = (_pattern$exec$ = (_pattern$exec = pattern.exec(monster.attributes)) === null || _pattern$exec === void 0 ? void 0 : _pattern$exec[1]) !== null && _pattern$exec$ !== void 0 ? _pattern$exec$ : "0";
    return cache.set(monster, result), (0, import_kolmafia4.monsterEval)(result);
  };
}
var scalerRates = /* @__PURE__ */ new Map(), scalerCaps = /* @__PURE__ */ new Map(), SCALE_RATE_PATTERN = /Scale: (?:\[([^\]]*)\]|(\d*))/, SCALE_CAP_PATTERN = /Cap: (?:\[([^\]]*)\]|(\d*))/, getScalingRate = makeScalerCalcFunction(scalerRates, SCALE_RATE_PATTERN), getScalingCap = makeScalerCalcFunction(scalerCaps, SCALE_CAP_PATTERN);
function withBatch(action) {
  (0, import_kolmafia4.batchOpen)();
  try {
    return action();
  } finally {
    (0, import_kolmafia4.batchClose)();
  }
}
var makeBulkFunction = function(action) {
  return function(items) {
    (0, import_kolmafia4.batchOpen)();
    var _iterator2 = _createForOfIteratorHelper2(items.entries()), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var _step2$value = _slicedToArray3(_step2.value, 2), _item = _step2$value[0], quantity = _step2$value[1];
        action(quantity, _item);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return (0, import_kolmafia4.batchClose)();
  };
}, bulkAutosell = makeBulkFunction(import_kolmafia4.autosell), bulkPutCloset = makeBulkFunction(import_kolmafia4.putCloset), bulkPutDisplay = makeBulkFunction(import_kolmafia4.putDisplay), bulkPutStash = makeBulkFunction(import_kolmafia4.putStash), bulkTakeCloset = makeBulkFunction(import_kolmafia4.takeCloset), bulkTakeDisplay = makeBulkFunction(import_kolmafia4.takeDisplay), bulkTakeShop = makeBulkFunction(import_kolmafia4.takeShop), bulkTakeStash = makeBulkFunction(import_kolmafia4.takeStash), bulkTakeStorage = makeBulkFunction(import_kolmafia4.takeStorage), bulkPutShop = function(items) {
  (0, import_kolmafia4.batchOpen)();
  var _iterator3 = _createForOfIteratorHelper2(items.entries()), _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var _step3$value = _slicedToArray3(_step3.value, 2), _item2 = _step3$value[0], _step3$value$ = _step3$value[1], quantity = _step3$value$.quantity, limit = _step3$value$.limit, price2 = _step3$value$.price;
      quantity ? (0, import_kolmafia4.putShop)(price2, limit != null ? limit : 0, quantity, _item2) : (0, import_kolmafia4.putShop)(price2, limit != null ? limit : 0, _item2);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return (0, import_kolmafia4.batchClose)();
}, bulkSell = function(coinmaster, items) {
  (0, import_kolmafia4.batchOpen)();
  var _iterator4 = _createForOfIteratorHelper2(items.entries()), _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var _step4$value = _slicedToArray3(_step4.value, 2), _item3 = _step4$value[0], quantity = _step4$value[1];
      (0, import_kolmafia4.sell)(coinmaster, quantity, _item3);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return (0, import_kolmafia4.batchClose)();
}, bulkRepriceShop = function(items) {
  (0, import_kolmafia4.batchOpen)();
  var _iterator5 = _createForOfIteratorHelper2(items.entries()), _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var _step5$value = _slicedToArray3(_step5.value, 2), _item4 = _step5$value[0], _step5$value$ = _step5$value[1], limit = _step5$value$.limit, price2 = _step5$value$.price;
      limit ? (0, import_kolmafia4.repriceShop)(price2, limit, _item4) : (0, import_kolmafia4.repriceShop)(price2, _item4);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return (0, import_kolmafia4.batchClose)();
};
function totalFamiliarWeight() {
  var familiar10 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia4.myFamiliar)(), considerAdjustment = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return clamp((0, import_kolmafia4.familiarWeight)(familiar10), have($effect(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Fidoxene"])))) ? 20 : 0, 1 / 0) + familiar10.soupWeight + (considerAdjustment ? (0, import_kolmafia4.weightAdjustment)() : 0) + (familiar10.feasted ? 10 : 0);
}
var familiarTags = Object.freeze(["animal", "insect", "haseyes", "haswings", "fast", "bite", "flies", "hashands", "wearsclothes", "organic", "vegetable", "hovers", "edible", "food", "sentient", "cute", "mineral", "polygonal", "object", "undead", "cantalk", "evil", "orb", "spooky", "sleaze", "aquatic", "swims", "isclothes", "phallic", "stench", "hot", "hasbeak", "haslegs", "robot", "technological", "hard", "cold", "hasbones", "hasclaws", "reallyevil", "good", "person", "humanoid", "animatedart", "software", "pokefam", "hasshell", "hasstinger"]);
function getFamiliarTags(familiar10) {
  return familiar10.attributes.split("; ").filter(Boolean);
}

// src/overlappingNames.ts
init_kolmafia_polyfill();
var overlappingItemNames = ["spider web", "really sticky spider web", "dictionary", "NG", "Cloaca-Cola", "yo-yo", "top", "ball", "kite", "yo", "red potion", "blue potion", "bowling ball", "adder", "red button", "pile of sand", "mushroom", "deluxe mushroom"], overlappingSkillNames = ["Shoot", "Thrust-Smack", "Headbutt", "Toss", "Knife in the Dark", "Sing", "Disarm", "LIGHT", "BURN", "Extract", "Meteor Shower", "Snipe", "Bite", "Kick", "Howl", "Cleave", "Boil", "Slice", "Rainbow"];

// src/combat.ts
function _superPropGet(t, e, o, r) {
  var p = _get(_getPrototypeOf2(1 & r ? t.prototype : t), e, o);
  return 2 & r && typeof p == "function" ? function(t2) {
    return p.apply(o, t2);
  } : p;
}
function _get() {
  return _get = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && (t = _getPrototypeOf2(t)) !== null; ) ;
  return t;
}
function _createForOfIteratorHelper3(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray4(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray4(r) {
  return _arrayWithoutHoles4(r) || _iterableToArray4(r) || _unsupportedIterableToArray4(r) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray4(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray4(r, a) : void 0;
  }
}
function _iterableToArray4(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles4(r) {
  if (Array.isArray(r)) return _arrayLikeToArray4(r);
}
function _arrayLikeToArray4(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _defineProperties4(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey4(o.key), o);
  }
}
function _createClass4(e, r, t) {
  return r && _defineProperties4(e.prototype, r), t && _defineProperties4(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey4(t) {
  var i = _toPrimitive4(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive4(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _classCallCheck4(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper2(t, o, e) {
  return o = _getPrototypeOf2(o), _possibleConstructorReturn2(t, _isNativeReflectConstruct2() ? Reflect.construct(o, e || [], _getPrototypeOf2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn2(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized2(t);
}
function _assertThisInitialized2(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits2(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf2(t, e);
}
function _wrapNativeSuper2(t) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper2 = function(t2) {
    if (t2 === null || !_isNativeFunction2(t2)) return t2;
    if (typeof t2 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r !== void 0) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct2(t2, arguments, _getPrototypeOf2(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf2(Wrapper, t2);
  }, _wrapNativeSuper2(t);
}
function _construct2(t, e, r) {
  if (_isNativeReflectConstruct2()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf2(p, r.prototype), p;
}
function _isNativeReflectConstruct2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct2 = function() {
    return !!t;
  })();
}
function _isNativeFunction2(t) {
  try {
    return Function.toString.call(t).indexOf("[native code]") !== -1;
  } catch (n) {
    return typeof t == "function";
  }
}
function _setPrototypeOf2(t, e) {
  return _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf2(t, e);
}
function _getPrototypeOf2(t) {
  return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf2(t);
}
var MACRO_NAME = "Script Autoattack Macro";
function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MACRO_NAME, query = '//select[@name="macroid"]/option[text()="'.concat(name, '"]/@value'), macroText = (0, import_kolmafia5.visitUrl)("account_combatmacros.php"), macroMatches = (0, import_kolmafia5.xpath)(macroText, query);
  if (macroMatches.length === 0) {
    (0, import_kolmafia5.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0, import_kolmafia5.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    macroMatches = (0, import_kolmafia5.xpath)(newMacroText, query);
  }
  if (macroMatches.length === 0)
    throw (0, import_kolmafia5.xpath)(macroText, '//select[@name="macroid"]/option').length >= 100 ? new InvalidMacroError("Please delete at least one existing macro to make some space for Libram") : new InvalidMacroError("Could not find or create macro ".concat(name));
  return parseInt(macroMatches[0], 10);
}
function itemOrNameToItem(itemOrName) {
  return typeof itemOrName == "string" ? import_kolmafia5.Item.get(itemOrName) : itemOrName;
}
function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems))
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  var item14 = itemOrNameToItem(itemOrItems);
  return overlappingItemNames.includes(item14.name) ? item14.id.toFixed(0) : item14.name;
}
function itemOrItemsBallsMacroPredicate(itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems[0] === itemOrItems[1] ? "hastwocombatitems ".concat(itemOrItemsBallsMacroName(itemOrItems[0])) : itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ") : "hascombatitem ".concat(itemOrItemsBallsMacroName(itemOrItems));
}
function skillOrNameToSkill(skillOrName) {
  return typeof skillOrName == "string" ? import_kolmafia5.Skill.get(skillOrName) : skillOrName;
}
function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !overlappingSkillNames.includes(skill.name) ? skill.name : skill.id;
}
var InvalidMacroError = /* @__PURE__ */ function(_Error) {
  function InvalidMacroError2() {
    return _classCallCheck4(this, InvalidMacroError2), _callSuper2(this, InvalidMacroError2, arguments);
  }
  return _inherits2(InvalidMacroError2, _Error), _createClass4(InvalidMacroError2);
}(/* @__PURE__ */ _wrapNativeSuper2(Error)), Macro = /* @__PURE__ */ function() {
  function Macro2() {
    _classCallCheck4(this, Macro2), _defineProperty3(this, "components", []), _defineProperty3(this, "name", MACRO_NAME);
  }
  return _createClass4(Macro2, [{
    key: "toString",
    value: (
      /**
       * Convert macro to string.
       *
       * @returns BALLS macro
       */
      function() {
        return (this.components.join(";") + ";").replace(/;;+/g, ";");
      }
    )
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     *
     * @param name The name to be used when saving as an autoattack.
     * @returns The macro in question
     */
  }, {
    key: "rename",
    value: function(name) {
      return this.name = name, this;
    }
    /**
     * Creates a new Macro with a name other than the default name.
     *
     * @param name The name to assign this macro.
     * @returns A new Macro with the assigned name.
     */
  }, {
    key: "save",
    value: (
      /**
       * Save a macro to a Mafia property for use in a consult script.
       */
      function() {
        _set(Macro2.SAVED_MACRO_PROPERTY, this.toString());
      }
    )
    /**
     * Load a saved macro from the Mafia property.
     *
     * @returns Loaded macro text
     */
  }, {
    key: "step",
    value: (
      /**
       * Statefully add one or several steps to a macro.
       *
       * @param nextSteps The steps to add to the macro.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _ref, _this$components, _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++)
          nextSteps[_key] = arguments[_key];
        var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray4(nextSteps.map(function(x) {
          return x instanceof Macro2 ? x.components : [x];
        })));
        return (_this$components = this.components).push.apply(_this$components, _toConsumableArray4(nextStepsStrings.filter(Boolean))), this;
      }
    )
    /**
     * Statefully add one or several steps to a macro.
     *
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "submit",
    value: (
      /**
       * Submit the built macro to KoL. Only works inside combat.
       *
       * @returns Contents of the fight page after macro submission
       */
      function() {
        var final = this.toString();
        return (0, import_kolmafia5.visitUrl)("fight.php?action=macro&macrotext=".concat((0, import_kolmafia5.urlEncode)(final)), !0, !0);
      }
    )
    /**
     * Set this macro as a KoL native autoattack.
     */
  }, {
    key: "setAutoAttack",
    value: function() {
      var id = Macro2.cachedMacroIds.get(this.name);
      id === void 0 && (id = getMacroId(this.name), Macro2.cachedMacroIds.set(this.name, id)), !((0, import_kolmafia5.getAutoAttack)() === 99e6 + id && this.toString() === Macro2.cachedAutoAttacks.get(this.name)) && ((0, import_kolmafia5.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0, import_kolmafia5.urlEncode)(this.name), "&macrotext=").concat((0, import_kolmafia5.urlEncode)(this.toString()), "&action=save"), !0, !0), (0, import_kolmafia5.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99e6 + id, "&ajax=1")), Macro2.cachedAutoAttacks.set(this.name, this.toString()));
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     *
     * @param name The name to save the macro under as an autoattack.
     */
  }, {
    key: "setAutoAttackAs",
    value: function(name) {
      this.name = name, this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */
  }, {
    key: "abort",
    value: (
      /**
       * Add an "abort" step to this macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("abort");
      }
    )
    /**
     * Create a new macro with an "abort" step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "abortWithWarning",
    value: (
      /**
       * Adds an "abort" step to this macro, with a warning message to print
       *
       * @param warning The warning message to print
       * @returns  {Macro} This object itself.
       */
      function(warning) {
        return this.step('abort "'.concat(warning, '"'));
      }
    )
    /**
     * Create a new macro with an "abort" step to this macro, with a warning message to print
     *
     * @param warning The warning message to print
     * @returns {Macro} This object itself.
     */
  }, {
    key: "runaway",
    value: (
      /**
       * Add a "runaway" step to this macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("runaway");
      }
    )
    /**
     * Create a new macro with an "runaway" step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "if_",
    value: (
      /**
       * Add an "if" statement to this macro.
       *
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.step("if ".concat(Macro2.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
      }
    )
    /**
     * Create a new macro with an "if" statement.
     *
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifNot",
    value: (
      /**
       * Add an "if" statement to this macro, inverting the condition.
       *
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.if_("!".concat(Macro2.makeBALLSPredicate(condition)), ifTrue);
      }
    )
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     *
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "while_",
    value: (
      /**
       * Add a "while" statement to this macro.
       *
       * @param condition The BALLS condition for the while statement.
       * @param contents Loop to repeat while the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, contents) {
        return this.step("while ".concat(Macro2.makeBALLSPredicate(condition))).step(contents).step("endwhile");
      }
    )
    /**
     * Create a new macro with a "while" statement.
     *
     * @param condition The BALLS condition for the while statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "externalIf",
    value: (
      /**
       * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
       *
       * @param condition The JS condition.
       * @param ifTrue Continuation to add if the condition is true.
       * @param ifFalse Optional input to turn this into an if...else statement.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue, ifFalse) {
        return condition ? this.step(ifTrue) : ifFalse ? this.step(ifFalse) : this;
      }
    )
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     *
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "repeat",
    value: (
      /**
       * Add a repeat step to the macro.
       *
       * @param condition The BALLS condition for the repeat statement, optional.
       * @returns {Macro} This object itself.
       */
      function(condition) {
        return condition === void 0 ? this.step("repeat") : this.step("repeat ".concat(Macro2.makeBALLSPredicate(condition)));
      }
    )
    /**
     * Add one or more skill cast steps to the macro.
     *
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "skill",
    value: function() {
      for (var _len2 = arguments.length, skills3 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        skills3[_key2] = arguments[_key2];
      return this.step.apply(this, _toConsumableArray4(skills3.map(function(skill2) {
        return "skill ".concat(skillBallsMacroName(skill2));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     *
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len3 = arguments.length, skills3 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
          skills3[_key3] = arguments[_key3];
        return this.step.apply(this, _toConsumableArray4(skills3.map(function(skillOrName) {
          return skillOrNameToSkill(skillOrName);
        }).map(function(skill) {
          return Macro2.if_(Macro2.makeBALLSPredicate(skill), Macro2.skill(skill));
        })));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try repeatedly casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len4 = arguments.length, skills3 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
          skills3[_key4] = arguments[_key4];
        return this.step.apply(this, _toConsumableArray4(skills3.map(function(skillOrName) {
          return skillOrNameToSkill(skillOrName);
        }).map(function(skill) {
          return Macro2.if_(Macro2.makeBALLSPredicate(skill), Macro2.skill(skill).repeat(skill));
        })));
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       *
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)
          items[_key5] = arguments[_key5];
        return this.step.apply(this, _toConsumableArray4(items.map(function(itemOrItems) {
          return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps.
     *
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       *
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)
          items[_key6] = arguments[_key6];
        return this.step.apply(this, _toConsumableArray4(items.map(function(item14) {
          return Macro2.if_(itemOrItemsBallsMacroPredicate(item14), Macro2.item(item14));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     *
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "attack",
    value: (
      /**
       * Add an attack step to the macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("attack");
      }
    )
    /**
     * Create a new macro with an attack step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
       *
       * @param macro The macro to place in the if_ statement
       * @returns This macro with supplied macro wapped in if statement matching holiday wanderers
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this : this.if_(todaysWanderers.map(function(monster) {
          return "monsterid ".concat(monster.id);
        }).join(" || "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     *
     * @param macro The macro to place inside the if_ statement
     * @returns New macro with supplied macro wrapped in if statement matching holiday wanderers
     */
  }, {
    key: "ifNotHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
       *
       * @param macro The macro to place in the if_ statement.
       * @returns This macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this.step(macro) : this.if_(todaysWanderers.map(function(monster) {
          return "!monsterid ".concat(monster.id);
        }).join(" && "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     *
     * @param macro The macro to place inside the if_ statement
     * @returns New macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
     */
  }], [{
    key: "rename",
    value: function(name) {
      return new this().rename(name);
    }
  }, {
    key: "load",
    value: function() {
      var _this;
      return (_this = new this()).step.apply(_this, _toConsumableArray4(get(Macro2.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */
  }, {
    key: "clearSaved",
    value: function() {
      (0, import_kolmafia5.removeProperty)(Macro2.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function() {
      var _this2;
      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function() {
      var _iterator = _createForOfIteratorHelper3(Macro2.cachedAutoAttacks.keys()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _Macro$cachedMacroIds, name = _step.value, id = (_Macro$cachedMacroIds = Macro2.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0, import_kolmafia5.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1")), Macro2.cachedAutoAttacks.delete(name), Macro2.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function() {
      return new this().abort();
    }
  }, {
    key: "abortWithWarning",
    value: function(warning) {
      return new this().abortWithWarning(warning);
    }
  }, {
    key: "runaway",
    value: function() {
      return new this().runaway();
    }
    /**
     *
     * @param condition The BALLS condition or a type to make a condition for (Monster, Item, Skill, etc.)
     * @returns {string} The BALLS condition string
     */
  }, {
    key: "makeBALLSPredicate",
    value: function(condition) {
      if (condition instanceof import_kolmafia5.Monster)
        return "monsterid ".concat(condition.id);
      if (condition instanceof Array)
        return condition[0] instanceof import_kolmafia5.Item ? itemOrItemsBallsMacroPredicate(condition) : "(".concat(condition.map(function(entry) {
          return Macro2.makeBALLSPredicate(entry);
        }).join(" || "), ")");
      if (condition instanceof import_kolmafia5.Effect)
        return "haseffect ".concat(condition.id);
      if (condition instanceof import_kolmafia5.Skill)
        return condition.combat ? "hasskill ".concat(skillBallsMacroName(condition)) : "knowsskill ".concat(condition.id);
      if (condition instanceof import_kolmafia5.Item) {
        if (!condition.combat)
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        return "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof import_kolmafia5.Location) {
        var snarfblat = condition.id;
        if (snarfblat < 1)
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        return "snarfblat ".concat(snarfblat);
      } else if (condition instanceof import_kolmafia5.Class) {
        if (condition.id > 6)
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        return condition.toString().replaceAll(" ", "").toLowerCase();
      } else {
        if (condition instanceof import_kolmafia5.Stat)
          return "".concat(condition.toString().toLowerCase(), "class");
        if (condition instanceof import_kolmafia5.Phylum)
          return "monsterphylum ".concat(condition);
        if (condition instanceof import_kolmafia5.Element)
          return "monsterelement ".concat(condition);
      }
      return condition;
    }
  }, {
    key: "if_",
    value: function(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function() {
      var _this3;
      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this4;
      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this5;
      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this6;
      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this7;
      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);
}();
_defineProperty3(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");
_defineProperty3(Macro, "cachedMacroIds", /* @__PURE__ */ new Map());
_defineProperty3(Macro, "cachedAutoAttacks", /* @__PURE__ */ new Map());
function adventureMacro(loc, macro) {
  macro.save(), (0, import_kolmafia5.setAutoAttack)(0);
  try {
    for ((0, import_kolmafia5.adv1)(loc, 0, ""); (0, import_kolmafia5.inMultiFight)(); ) (0, import_kolmafia5.runCombat)();
    (0, import_kolmafia5.choiceFollowsFight)() && (0, import_kolmafia5.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro, nextMacro = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort(), autoMacro.setAutoAttack(), nextMacro.save();
  try {
    for ((0, import_kolmafia5.adv1)(loc, 0, ""); (0, import_kolmafia5.inMultiFight)(); ) (0, import_kolmafia5.runCombat)();
    (0, import_kolmafia5.choiceFollowsFight)() && (0, import_kolmafia5.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /* @__PURE__ */ function(_Macro2) {
  function StrictMacro2() {
    return _classCallCheck4(this, StrictMacro2), _callSuper2(this, StrictMacro2, arguments);
  }
  return _inherits2(StrictMacro2, _Macro2), _createClass4(StrictMacro2, [{
    key: "skill",
    value: (
      /**
       * Add one or more skill cast steps to the macro.
       *
       * @param skills Skills to cast.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _len7 = arguments.length, skills3 = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)
          skills3[_key7] = arguments[_key7];
        return _superPropGet(StrictMacro2, "skill", this, 3)(skills3);
      }
    )
    /**
     * Create a new macro with one or more skill cast steps.
     *
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       *
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)
          items[_key8] = arguments[_key8];
        return _superPropGet(StrictMacro2, "item", this, 3)(items);
      }
    )
    /**
     * Create a new macro with one or more item steps.
     *
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _len9 = arguments.length, skills3 = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)
          skills3[_key9] = arguments[_key9];
        return _superPropGet(StrictMacro2, "trySkill", this, 3)(skills3);
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       *
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++)
          items[_key10] = arguments[_key10];
        return _superPropGet(StrictMacro2, "tryItem", this, 3)(items);
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     *
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try repeatedly casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _len11 = arguments.length, skills3 = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++)
          skills3[_key11] = arguments[_key11];
        return _superPropGet(StrictMacro2, "trySkillRepeat", this, 3)(skills3);
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
  }], [{
    key: "skill",
    value: function() {
      var _this8;
      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this9;
      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this10;
      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this11;
      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this12;
      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);
}(Macro);

// src/maximize.ts
init_kolmafia_polyfill();
var import_kolmafia6 = require("kolmafia");
var _templateObject49, _templateObject210, _templateObject310, _templateObject410, _templateObject52, _templateObject62, _templateObject72, _templateObject82, _templateObject92, _templateObject102, _templateObject112, _templateObject122, _templateObject132, _templateObject142, _templateObject152, _templateObject162, _templateObject172, _templateObject182, _templateObject192, _templateObject202, _templateObject212, _templateObject222, _templateObject232, _templateObject242, _templateObject252, _templateObject262, _templateObject272, _templateObject282, _templateObject292, _templateObject302, _templateObject312, _templateObject322, _templateObject332, _templateObject342, _templateObject352, _templateObject362, _templateObject372, _templateObject382, _templateObject392, _templateObject402, _templateObject412, _templateObject422, _templateObject432, _templateObject442, _templateObject452, _templateObject462, _templateObject472, _templateObject482, _templateObject492, _templateObject50;
function _slicedToArray4(r, e) {
  return _arrayWithHoles4(r) || _iterableToArrayLimit4(r, e) || _unsupportedIterableToArray5(r, e) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit4(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles4(r) {
  if (Array.isArray(r)) return r;
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldSet(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function _assertClassBrand(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _defineProperties5(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey5(o.key), o);
  }
}
function _createClass5(e, r, t) {
  return r && _defineProperties5(e.prototype, r), t && _defineProperties5(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _classCallCheck5(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _createForOfIteratorHelper4(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray5(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _taggedTemplateLiteral2(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), !0).forEach(function(r2) {
      _defineProperty4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty4(e, r, t) {
  return (r = _toPropertyKey5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey5(t) {
  var i = _toPrimitive5(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive5(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _toConsumableArray5(r) {
  return _arrayWithoutHoles5(r) || _iterableToArray5(r) || _unsupportedIterableToArray5(r) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray5(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray5(r, a) : void 0;
  }
}
function _iterableToArray5(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles5(r) {
  if (Array.isArray(r)) return _arrayLikeToArray5(r);
}
function _arrayLikeToArray5(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function toMaximizerName(_ref) {
  var name = _ref.name, id = _ref.id;
  return name.includes(";") ? "\xB6".concat(id) : name;
}
function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$updateOnLo, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;
  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    updateOnLocationChange: (_addendums$updateOnLo = addendums.updateOnLocationChange) !== null && _addendums$updateOnLo !== void 0 ? _addendums$updateOnLo : defaultOptions.updateOnLocationChange,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(_toConsumableArray5(defaultOptions.forceEquip), _toConsumableArray5((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(_toConsumableArray5(defaultOptions.preventEquip), _toConsumableArray5((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(function(item14) {
      var _addendums$forceEquip2;
      return !defaultOptions.forceEquip.includes(item14) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item14));
    }),
    bonusEquip: new Map([].concat(_toConsumableArray5(defaultOptions.bonusEquip), _toConsumableArray5((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(_toConsumableArray5(defaultOptions.preventSlot), _toConsumableArray5((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: _objectSpread2(_objectSpread2({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}
var defaultMaximizeOptions = {
  updateOnFamiliarChange: !0,
  updateOnCanEquipChanged: !0,
  updateOnLocationChange: !1,
  useOutfitCaching: !0,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: /* @__PURE__ */ new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: !1,
  modes: {}
};
function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
}
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka", "jillcandle"], modeableItems = {
  backupcamera: $item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral2(["backup camera"]))),
  umbrella: $item(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral2(["unbreakable umbrella"]))),
  snowsuit: $item(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral2(["Snow Suit"]))),
  edpiece: $item(_templateObject410 || (_templateObject410 = _taggedTemplateLiteral2(["The Crown of Ed the Undying"]))),
  retrocape: $item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral2(["unwrapped knock-off retro superhero cape"]))),
  parka: $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral2(["Jurassic Parka"]))),
  jillcandle: $item(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral2(["LED candle"])))
}, modeableState = {
  backupcamera: function() {
    return (0, import_kolmafia6.getProperty)("backupCameraMode");
  },
  umbrella: function() {
    return (0, import_kolmafia6.getProperty)("umbrellaState");
  },
  snowsuit: function() {
    return (0, import_kolmafia6.getProperty)("snowsuit");
  },
  edpiece: function() {
    return (0, import_kolmafia6.getProperty)("edPiece");
  },
  retrocape: function() {
    return (0, import_kolmafia6.getProperty)("retroCapeSuperhero") + " " + (0, import_kolmafia6.getProperty)("retroCapeWashingInstructions");
  },
  parka: function() {
    return (0, import_kolmafia6.getProperty)("parkaMode");
  },
  jillcandle: function() {
    return (0, import_kolmafia6.getProperty)("ledCandleMode");
  }
};
function getCurrentModes() {
  var modes = {}, _iterator = _createForOfIteratorHelper4(modeableCommands), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var key = _step.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[key]) && (modes[key] = modeableState[key]());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return modes;
}
function applyModes(modes) {
  var _iterator2 = _createForOfIteratorHelper4(modeableCommands), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var command = _step2.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[command]) && modes[command] !== void 0 && modeableState[command]() !== modes[command] && (0, import_kolmafia6.cliExecute)(command + " " + modes[command]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
var cachedSlots = $slots(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral2(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"]))), CacheEntry = /* @__PURE__ */ _createClass5(function CacheEntry2(equipment, rider, familiar10, canEquipItemCount2, modes) {
  _classCallCheck5(this, CacheEntry2), _defineProperty4(this, "equipment", void 0), _defineProperty4(this, "rider", void 0), _defineProperty4(this, "familiar", void 0), _defineProperty4(this, "canEquipItemCount", void 0), _defineProperty4(this, "modes", void 0), this.equipment = equipment, this.rider = rider, this.familiar = familiar10, this.canEquipItemCount = canEquipItemCount2, this.modes = modes;
}), _outfitSlots = /* @__PURE__ */ new WeakMap(), _useHistory = /* @__PURE__ */ new WeakMap(), _maxSize = /* @__PURE__ */ new WeakMap(), OutfitLRUCache = /* @__PURE__ */ function() {
  function OutfitLRUCache2(maxSize) {
    _classCallCheck5(this, OutfitLRUCache2), _classPrivateFieldInitSpec(this, _outfitSlots, []), _classPrivateFieldInitSpec(this, _useHistory, []), _classPrivateFieldInitSpec(this, _maxSize, void 0), _classPrivateFieldSet(_maxSize, this, maxSize);
  }
  return _createClass5(OutfitLRUCache2, [{
    key: "checkConsistent",
    value: function() {
      if (_classPrivateFieldGet(_useHistory, this).length !== _classPrivateFieldGet(_outfitSlots, this).length || !_toConsumableArray5(_classPrivateFieldGet(_useHistory, this)).sort().every(function(value, index) {
        return value === index;
      }))
        throw new Error("Outfit cache consistency failed.");
    }
  }, {
    key: "promote",
    value: function(index) {
      _classPrivateFieldSet(_useHistory, this, [index].concat(_toConsumableArray5(_classPrivateFieldGet(_useHistory, this).filter(function(i) {
        return i !== index;
      })))), this.checkConsistent();
    }
  }, {
    key: "get",
    value: function(key) {
      var index = _classPrivateFieldGet(_outfitSlots, this).indexOf(key);
      if (!(index < 0))
        return this.promote(index), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function(key) {
      var lastUseIndex = void 0;
      if (_classPrivateFieldGet(_outfitSlots, this).length >= _classPrivateFieldGet(_maxSize, this)) {
        if (lastUseIndex = _classPrivateFieldGet(_useHistory, this).pop(), lastUseIndex === void 0)
          throw new Error("Outfit cache consistency failed.");
        return _classPrivateFieldGet(_useHistory, this).splice(0, 0, lastUseIndex), _classPrivateFieldGet(_outfitSlots, this)[lastUseIndex] = key, this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(_outfitSlots, this).push(key) - 1;
        return _classPrivateFieldGet(_useHistory, this).splice(0, 0, index), this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function() {
      _classPrivateFieldSet(_outfitSlots, this, []), _classPrivateFieldSet(_useHistory, this, []);
    }
  }]);
}();
_defineProperty4(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");
function saveOutfit(name) {
  (0, import_kolmafia6.cliExecute)("outfit save ".concat(name));
}
var cachedObjectives = {}, outfitCache = new OutfitLRUCache(6), cachedStats = [0, 0, 0], cachedCanEquipItemCount = 0;
function canEquipItemCount() {
  var stats = $stats(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral2(["Muscle, Mysticality, Moxie"]))).map(function(stat) {
    return Math.min((0, import_kolmafia6.myBasestat)(stat), 300);
  });
  return stats.every(function(value, index) {
    return value === cachedStats[index];
  }) || (cachedStats = stats, cachedCanEquipItemCount = import_kolmafia6.Item.all().filter(function(item14) {
    return (0, import_kolmafia6.canEquip)(item14);
  }).length), cachedCanEquipItemCount;
}
function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];
  return entry ? options.updateOnFamiliarChange && (0, import_kolmafia6.myFamiliar)() !== entry.familiar ? (logger_default.warning("Equipment found in maximize cache but familiar is different."), null) : options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount() ? (logger_default.warning("Equipment found in maximize cache but equippable item list is out of date."), null) : entry : null;
}
function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : void 0;
  if (outfitName) {
    (0, import_kolmafia6.isWearingOutfit)(outfitName) || (0, import_kolmafia6.outfit)(outfitName);
    var familiarEquip = entry.equipment.get($slot(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral2(["familiar"]))));
    familiarEquip && (0, import_kolmafia6.equip)($slot(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral2(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = _createForOfIteratorHelper4(entry.equipment), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray4(_step3.value, 2), slot = _step3$value[0], item14 = _step3$value[1];
        (0, import_kolmafia6.equippedItem)(slot) !== item14 && (0, import_kolmafia6.availableAmount)(item14) > 0 && (0, import_kolmafia6.equip)(slot, item14);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);
      logger_default.info("Saving equipment to outfit ".concat(_outfitName, ".")), saveOutfit(_outfitName);
    }
  }
  (0, import_kolmafia6.equippedAmount)($item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral2(["Crown of Thrones"])))) && (0, import_kolmafia6.enthroneFamiliar)(entry.rider.get($item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral2(["Crown of Thrones"])))) || $familiar.none), (0, import_kolmafia6.equippedAmount)($item(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) && (0, import_kolmafia6.bjornifyFamiliar)(entry.rider.get($item(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) || $familiar.none), applyModes(_objectSpread2(_objectSpread2({}, entry.modes), options.modes));
}
var slotStructure = [$slots(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral2(["hat"]))), $slots(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral2(["back"]))), $slots(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral2(["shirt"]))), $slots(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral2(["weapon, off-hand"]))), $slots(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral2(["pants"]))), $slots(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral2(["acc1, acc2, acc3"]))), $slots(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral2(["familiar"])))];
function verifyCached(entry) {
  var warn2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, success = !0, _iterator4 = _createForOfIteratorHelper4(slotStructure), _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var slotGroup = _step4.value, desiredSlots = slotGroup.map(function(slot) {
        var _entry$equipment$get;
        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(function(_ref2) {
        var _ref3 = _slicedToArray4(_ref2, 2), item14 = _ref3[1];
        return item14 !== null;
      }), desiredSet = desiredSlots.map(function(_ref4) {
        var _ref5 = _slicedToArray4(_ref4, 2), item14 = _ref5[1];
        return item14;
      }), equippedSet = desiredSlots.map(function(_ref6) {
        var _ref7 = _slicedToArray4(_ref6, 1), slot = _ref7[0];
        return (0, import_kolmafia6.equippedItem)(slot);
      });
      setEqual(desiredSet, equippedSet) || (warn2 && logger_default.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), ".")), success = !1);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return (0, import_kolmafia6.equippedAmount)($item(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral2(["Crown of Thrones"])))) && entry.rider.get($item(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral2(["Crown of Thrones"])))) !== (0, import_kolmafia6.myEnthronedFamiliar)() && (warn2 && logger_default.warning("Failed to apply ".concat(entry.rider.get($item(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral2(["Crown of Thrones"])))), " in ").concat($item(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral2(["Crown of Thrones"]))), ".")), success = !1), (0, import_kolmafia6.equippedAmount)($item(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) && entry.rider.get($item(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) !== (0, import_kolmafia6.myBjornedFamiliar)() && (warn2 && logger_default.warning("Failed to apply".concat(entry.rider.get($item(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), " in ").concat($item(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral2(["Buddy Bjorn"]))), ".")), success = !1), success;
}
function saveCached(cacheKey, options) {
  var equipment = /* @__PURE__ */ new Map(), rider = /* @__PURE__ */ new Map(), _iterator5 = _createForOfIteratorHelper4(cachedSlots), _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0, import_kolmafia6.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if ((0, import_kolmafia6.equippedAmount)($item(_templateObject352 || (_templateObject352 = _taggedTemplateLiteral2(["card sleeve"])))) > 0 && equipment.set($slot(_templateObject362 || (_templateObject362 = _taggedTemplateLiteral2(["card-sleeve"]))), (0, import_kolmafia6.equippedItem)($slot(_templateObject372 || (_templateObject372 = _taggedTemplateLiteral2(["card-sleeve"]))))), (0, import_kolmafia6.equippedAmount)($item(_templateObject382 || (_templateObject382 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && rider.set($item(_templateObject392 || (_templateObject392 = _taggedTemplateLiteral2(["Crown of Thrones"]))), (0, import_kolmafia6.myEnthronedFamiliar)()), (0, import_kolmafia6.equippedAmount)($item(_templateObject402 || (_templateObject402 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && rider.set($item(_templateObject412 || (_templateObject412 = _taggedTemplateLiteral2(["Buddy Bjorn"]))), (0, import_kolmafia6.myBjornedFamiliar)()), options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = _createForOfIteratorHelper4(options.preventSlot), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    options.preventSlot.includes($slot(_templateObject422 || (_templateObject422 = _taggedTemplateLiteral2(["buddy-bjorn"])))) && rider.delete($item(_templateObject432 || (_templateObject432 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), options.preventSlot.includes($slot(_templateObject442 || (_templateObject442 = _taggedTemplateLiteral2(["crown-of-thrones"])))) && rider.delete($item(_templateObject452 || (_templateObject452 = _taggedTemplateLiteral2(["Crown of Thrones"]))));
  }
  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = _createForOfIteratorHelper4(import_kolmafia6.Slot.all()), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        var _slot = _step7.value;
        options.onlySlot.includes(_slot) || equipment.delete(_slot);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    options.onlySlot.includes($slot(_templateObject462 || (_templateObject462 = _taggedTemplateLiteral2(["buddy-bjorn"])))) || rider.delete($item(_templateObject472 || (_templateObject472 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), options.onlySlot.includes($slot(_templateObject482 || (_templateObject482 = _taggedTemplateLiteral2(["crown-of-thrones"])))) || rider.delete($item(_templateObject492 || (_templateObject492 = _taggedTemplateLiteral2(["Crown of Thrones"]))));
  }
  var entry = new CacheEntry(equipment, rider, (0, import_kolmafia6.myFamiliar)(), canEquipItemCount(), _objectSpread2(_objectSpread2({}, getCurrentModes()), options.modes));
  if (cachedObjectives[cacheKey] = entry, options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger_default.info("Saving equipment to outfit ".concat(outfitName, ".")), saveOutfit(outfitName);
  }
}
function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options), forceEquip = fullOptions.forceEquip, preventEquip = fullOptions.preventEquip, bonusEquip = fullOptions.bonusEquip, onlySlot = fullOptions.onlySlot, preventSlot = fullOptions.preventSlot, forceUpdate = fullOptions.forceUpdate, objective = _toConsumableArray5(new Set([].concat(_toConsumableArray5(objectives.sort()), _toConsumableArray5(forceEquip.map(function(item14) {
    return '"equip '.concat(toMaximizerName(item14), '"');
  }).sort()), _toConsumableArray5(preventEquip.map(function(item14) {
    return '-"equip '.concat(toMaximizerName(item14), '"');
  }).sort()), _toConsumableArray5(onlySlot.map(function(slot) {
    return "".concat(slot);
  }).sort()), _toConsumableArray5(preventSlot.map(function(slot) {
    return "-".concat(slot);
  }).sort()), _toConsumableArray5(Array.from(bonusEquip.entries()).filter(function(_ref8) {
    var _ref9 = _slicedToArray4(_ref8, 2), bonus = _ref9[1];
    return bonus !== 0;
  }).map(function(_ref10) {
    var _ref11 = _slicedToArray4(_ref10, 2), item14 = _ref11[0], bonus = _ref11[1];
    return "".concat(Math.round(bonus * 100) / 100, ' "bonus ').concat(toMaximizerName(item14), '"');
  }).sort())))).join(", "), untouchedSlots = cachedSlots.filter(function(slot) {
    return preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot);
  }), cacheKey = [objective].concat(_toConsumableArray5(untouchedSlots.map(function(slot) {
    return "".concat(slot, ":").concat((0, import_kolmafia6.equippedItem)(slot));
  }).sort()), [have($effect(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral2(["Offhand Remarkable"])))), options.updateOnLocationChange && (0, import_kolmafia6.myLocation)()]).join("; "), cacheEntry = checkCache(cacheKey, fullOptions);
  if (cacheEntry && !forceUpdate) {
    if (verifyCached(cacheEntry, !1)) return !0;
    if (logger_default.info("Equipment found in maximize cache, equipping..."), applyCached(cacheEntry, fullOptions), verifyCached(cacheEntry))
      return logger_default.info("Equipped cached ".concat(cacheKey)), !0;
    logger_default.warning("Maximize cache application failed, maximizing...");
  }
  var result = (0, import_kolmafia6.maximize)(objective, !1);
  return saveCached(cacheKey, fullOptions), result;
}
function mergeOptionalOptions(optionsA, optionsB) {
  for (var _len = arguments.length, keys = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++)
    keys[_key - 2] = arguments[_key];
  return keys.reduce(function(current2, key) {
    return _objectSpread2(_objectSpread2({}, current2), (optionsA[key] || optionsB[key]) === void 0 ? {} : _defineProperty4({}, key, optionsA[key] || optionsB[key]));
  }, {});
}
var _maximizeParameters = /* @__PURE__ */ new WeakMap(), _maximizeOptions = /* @__PURE__ */ new WeakMap(), Requirement = /* @__PURE__ */ function() {
  function Requirement2(maximizeParameters, maximizeOptions) {
    _classCallCheck5(this, Requirement2), _classPrivateFieldInitSpec(this, _maximizeParameters, void 0), _classPrivateFieldInitSpec(this, _maximizeOptions, void 0), _classPrivateFieldSet(_maximizeParameters, this, maximizeParameters), _classPrivateFieldSet(_maximizeOptions, this, maximizeOptions);
  }
  return _createClass5(Requirement2, [{
    key: "maximizeParameters",
    get: function() {
      return _classPrivateFieldGet(_maximizeParameters, this);
    }
  }, {
    key: "maximizeOptions",
    get: function() {
      return _classPrivateFieldGet(_maximizeOptions, this);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     *
     * @param other Requirement to merge with.
     * @returns A new merged Requirement
     */
  }, {
    key: "merge",
    value: function(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot, optionsA = this.maximizeOptions, optionsB = other.maximizeOptions, optionalBooleans = mergeOptionalOptions(optionsA, optionsB, "updateOnFamiliarChange", "updateOnCanEquipChanged", "updateOnLocationChange", "forceUpdate");
      return new Requirement2([].concat(_toConsumableArray5(this.maximizeParameters), _toConsumableArray5(other.maximizeParameters)), _objectSpread2(_objectSpread2({}, optionalBooleans), {}, {
        forceEquip: [].concat(_toConsumableArray5((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), _toConsumableArray5((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(function(x) {
          var _other$maximizeOption2;
          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(_toConsumableArray5((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), _toConsumableArray5((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(function(x) {
          var _other$maximizeOption4;
          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(_toConsumableArray5((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), _toConsumableArray5((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(_toConsumableArray5((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), _toConsumableArray5((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(_toConsumableArray5((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), _toConsumableArray5((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : []))
      }));
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     *
     * @param allRequirements Requirements to merge
     * @returns Merged requirements
     */
  }, {
    key: "maximize",
    value: (
      /**
       * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
       *
       * @returns Whether the maximize call succeeded.
       */
      function() {
        return maximizeCached(this.maximizeParameters, this.maximizeOptions);
      }
    )
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     *
     * @param requirements Requirements to maximize on
     */
  }], [{
    key: "merge",
    value: function(allRequirements) {
      return allRequirements.reduce(function(x, y) {
        return x.merge(y);
      }, new Requirement2([], {}));
    }
  }, {
    key: "maximize",
    value: function() {
      for (var _len2 = arguments.length, requirements = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        requirements[_key2] = arguments[_key2];
      Requirement2.merge(requirements).maximize();
    }
  }]);
}();
function clearMaximizerCache() {
  outfitCache.clear();
  for (var member in cachedObjectives) delete cachedObjectives[member];
}

// src/actions/ActionSource.ts
function _classCallCheck6(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties6(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey6(o.key), o);
  }
}
function _createClass6(e, r, t) {
  return r && _defineProperties6(e.prototype, r), t && _defineProperties6(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toConsumableArray6(r) {
  return _arrayWithoutHoles6(r) || _iterableToArray6(r) || _unsupportedIterableToArray6(r) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray6(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray6(r, a) : void 0;
  }
}
function _iterableToArray6(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles6(r) {
  if (Array.isArray(r)) return _arrayLikeToArray6(r);
}
function _arrayLikeToArray6(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), !0).forEach(function(r2) {
      _defineProperty5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty5(e, r, t) {
  return (r = _toPropertyKey6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey6(t) {
  var i = _toPrimitive6(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive6(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function mergeConstraints() {
  for (var _len = arguments.length, allConstraints = new Array(_len), _key = 0; _key < _len; _key++)
    allConstraints[_key] = arguments[_key];
  var familiars = allConstraints.map(function(constraints) {
    return constraints.familiar;
  }).filter(Boolean);
  if (familiars.length > 1)
    return null;
  var familiar10 = familiars.find(function(familiar11) {
    return familiar11;
  });
  return _objectSpread3(_objectSpread3({
    equipmentRequirements: function() {
      return Requirement.merge(_toConsumableArray6(allConstraints.map(function(constraints) {
        var _constraints$equipmen, _constraints$equipmen2;
        return (_constraints$equipmen = (_constraints$equipmen2 = constraints.equipmentRequirements) === null || _constraints$equipmen2 === void 0 ? void 0 : _constraints$equipmen2.call(constraints)) !== null && _constraints$equipmen !== void 0 ? _constraints$equipmen : new Requirement([], {});
      })));
    },
    preparation: function() {
      for (var success = !0, _i = 0, _allConstraints = allConstraints; _i < _allConstraints.length; _i++) {
        var constraints = _allConstraints[_i];
        success = success && (!constraints.preparation || constraints.preparation());
      }
      return success;
    }
  }, familiar10 ? {
    familiar: familiar10
  } : {}), {}, {
    cost: function() {
      return sum(allConstraints, function(constraints) {
        var _constraints$cost, _constraints$cost2;
        return (_constraints$cost = (_constraints$cost2 = constraints.cost) === null || _constraints$cost2 === void 0 ? void 0 : _constraints$cost2.call(constraints)) !== null && _constraints$cost !== void 0 ? _constraints$cost : 0;
      });
    }
  });
}
var ActionSource = /* @__PURE__ */ function() {
  function ActionSource2(source, potential, macro) {
    var constraints = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    _classCallCheck6(this, ActionSource2), _defineProperty5(this, "source", void 0), _defineProperty5(this, "potential", void 0), _defineProperty5(this, "macro", void 0), _defineProperty5(this, "constraints", void 0), this.source = source, this.potential = potential, this.macro = macro, this.constraints = constraints;
  }
  return _createClass6(ActionSource2, [{
    key: "name",
    value: function() {
      return this.source.toString();
    }
    /**
     * @returns Whether the action is available.
     */
  }, {
    key: "available",
    value: function() {
      return this.potential() > 0;
    }
    /**
     * @returns Cost in meat per usage of the action.
     */
  }, {
    key: "cost",
    value: function() {
      return this.constraints.cost ? this.constraints.cost() : 0;
    }
    /**
     * @returns Whether the action costs 0 meat to use.
     */
  }, {
    key: "isFree",
    value: function() {
      return !this.cost || this.cost() === 0;
    }
    /**
     * @returns Whether unlimited uses of the action are available.
     */
  }, {
    key: "isUnlimited",
    value: function() {
      return this.potential() === 1 / 0;
    }
    /**
     * Create a compound action source with merged constraints.
     *
     * @param others Other actions to have available.
     * @returns Merged constraints, or null if they are inconsistent.
     */
  }, {
    key: "merge",
    value: function() {
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        others[_key2] = arguments[_key2];
      var actions = [this].concat(others), constraints = mergeConstraints.apply(void 0, _toConsumableArray6(actions.map(function(action) {
        return action.constraints;
      })));
      return constraints === null ? null : new ActionSource2(actions.flatMap(function(action) {
        return action.source;
      }), function() {
        return sum(actions, function(action) {
          return action.potential();
        });
      }, Macro.step.apply(Macro, _toConsumableArray6(actions.map(function(action) {
        return action.macro;
      }))), constraints);
    }
    /**
     * Perform all preparation necessary to make this action available.
     *
     * @param otherRequirements Any other equipment requirements.
     * @returns Whether preparation succeeded.
     */
  }, {
    key: "prepare",
    value: function(otherRequirements) {
      var _this$constraints$fam, _this$constraints;
      if ((_this$constraints$fam = (_this$constraints = this.constraints).familiar) !== null && _this$constraints$fam !== void 0 && _this$constraints$fam.call(_this$constraints) && !(0, import_kolmafia7.useFamiliar)(this.constraints.familiar()))
        return !1;
      if (this.constraints.equipmentRequirements) {
        var requirement = otherRequirements ? otherRequirements.merge(this.constraints.equipmentRequirements()) : this.constraints.equipmentRequirements();
        if (!requirement.maximize()) return !1;
      }
      return this.constraints.preparation ? this.constraints.preparation() : !0;
    }
    /**
     * Perform all preparation necessary to make this action available.
     * Throws an error if preparation fails.
     *
     * @param otherRequirements Any other equipment requirements.
     */
  }, {
    key: "ensure",
    value: function(otherRequirements) {
      if (!this.prepare(otherRequirements))
        throw new Error("Failed to prepare action ".concat(this.name(), "."));
    }
  }]);
}();
_defineProperty5(ActionSource, "defaultPriceFunction", function(item14) {
  return (0, import_kolmafia7.mallPrice)(item14) > 0 ? (0, import_kolmafia7.mallPrice)(item14) : 1 / 0;
});
function filterAction(action, constraints) {
  var _constraints$requireF, _constraints$requireU, _constraints$noFamili, _constraints$noRequir, _constraints$noPrepar, _constraints$maximumC, _constraints$maximumC2;
  return action.available() && (constraints.allowedAction === void 0 || constraints.allowedAction(action)) && !((_constraints$requireF = constraints.requireFamiliar) !== null && _constraints$requireF !== void 0 && _constraints$requireF.call(constraints) && !action.constraints.familiar) && !((_constraints$requireU = constraints.requireUnlimited) !== null && _constraints$requireU !== void 0 && _constraints$requireU.call(constraints) && !action.isUnlimited()) && !((_constraints$noFamili = constraints.noFamiliar) !== null && _constraints$noFamili !== void 0 && _constraints$noFamili.call(constraints) && action.constraints.familiar) && !((_constraints$noRequir = constraints.noRequirements) !== null && _constraints$noRequir !== void 0 && _constraints$noRequir.call(constraints) && action.constraints.equipmentRequirements) && !((_constraints$noPrepar = constraints.noPreparation) !== null && _constraints$noPrepar !== void 0 && _constraints$noPrepar.call(constraints) && action.constraints.preparation) && action.cost() <= ((_constraints$maximumC = (_constraints$maximumC2 = constraints.maximumCost) === null || _constraints$maximumC2 === void 0 ? void 0 : _constraints$maximumC2.call(constraints)) !== null && _constraints$maximumC !== void 0 ? _constraints$maximumC : 0);
}
function findActionSource(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, validActions = actions.filter(function(actions2) {
    return filterAction(actions2, constraints);
  });
  return validActions.length < 1 ? null : validActions.reduce(function(a, b) {
    return a.cost() <= b.cost() ? a : b;
  });
}
function actionSourcesAvailable(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return sum(actions.filter(function(action) {
    return filterAction(action, constraints != null ? constraints : {});
  }), function(action) {
    return action.potential();
  });
}

// src/actions/Banish.ts
init_kolmafia_polyfill();
var import_kolmafia9 = require("kolmafia");

// src/resources/2017/AsdonMartin.ts
var AsdonMartin_exports = {};
__export(AsdonMartin_exports, {
  Driving: function() {
    return Driving;
  },
  drive: function() {
    return drive;
  },
  fillTo: function() {
    return fillTo;
  },
  fillWithInventoryTo: function() {
    return fillWithInventoryTo;
  },
  have: function() {
    return have2;
  },
  insertFuel: function() {
    return insertFuel;
  },
  installed: function() {
    return installed;
  },
  isFuelItem: function() {
    return isFuelItem;
  }
});
init_kolmafia_polyfill();
var import_kolmafia8 = require("kolmafia");
var _templateObject51, _templateObject211, _templateObject311, _templateObject411, _templateObject53, _templateObject63, _templateObject73, _templateObject83, _templateObject93, _templateObject103, _templateObject113, _templateObject123, _templateObject133;
function _slicedToArray5(r, e) {
  return _arrayWithHoles5(r) || _iterableToArrayLimit5(r, e) || _unsupportedIterableToArray7(r, e) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray7(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray7(r, a) : void 0;
  }
}
function _arrayLikeToArray7(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit5(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles5(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral3(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var PriceAge = /* @__PURE__ */ function(PriceAge2) {
  return PriceAge2[PriceAge2.HISTORICAL = 0] = "HISTORICAL", PriceAge2[PriceAge2.RECENT = 1] = "RECENT", PriceAge2[PriceAge2.TODAY = 2] = "TODAY", PriceAge2;
}(PriceAge || {});
function installed() {
  return (0, import_kolmafia8.getWorkshed)() === $item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral3(["Asdon Martin keyfob (on ring)"])));
}
function have2() {
  return installed() || have($item(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral3(["Asdon Martin keyfob (on ring)"]))));
}
var fuelSkiplist = $items(_templateObject311 || (_templateObject311 = _taggedTemplateLiteral3(['cup of "tea", thermos of "whiskey", Lucky Lindy, Bee\'s Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"'])));
function priceTooOld(item14) {
  return (0, import_kolmafia8.historicalPrice)(item14) === 0 || (0, import_kolmafia8.historicalAge)(item14) >= 7;
}
function historicalPriceOrMax(item14) {
  var historical = (0, import_kolmafia8.historicalPrice)(item14);
  return historical < 0 ? 999999999 : historical;
}
function mallPriceOrMax(item14) {
  var mall = (0, import_kolmafia8.mallPrice)(item14);
  return mall < 0 ? 999999999 : mall;
}
function price(item14, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL: {
      var historical = historicalPriceOrMax(item14);
      return historical === 0 ? mallPriceOrMax(item14) : historical;
    }
    case PriceAge.RECENT:
      return priceTooOld(item14) ? mallPriceOrMax(item14) : historicalPriceOrMax(item14);
    case PriceAge.TODAY:
      return mallPriceOrMax(item14);
  }
}
function inventoryItems() {
  return import_kolmafia8.Item.all().filter(isFuelItem).filter(function(item14) {
    return have(item14) && [100, (0, import_kolmafia8.autosellPrice)(item14)].includes(price(item14, PriceAge.RECENT));
  });
}
function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : PriceAge.RECENT, units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}
function isFuelItem(it) {
  return !(0, import_kolmafia8.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}
function getBestFuels() {
  var allFuel = import_kolmafia8.Item.all().filter(isFuelItem);
  allFuel.filter(function(item14) {
    return (0, import_kolmafia8.historicalPrice)(item14) === 0;
  }).length > 100 && ((0, import_kolmafia8.mallPrices)("food"), (0, import_kolmafia8.mallPrices)("booze"));
  var keyHistorical = function(item14) {
    return calculateFuelUnitCost(item14, PriceAge.HISTORICAL);
  };
  allFuel.sort(function(x, y) {
    return keyHistorical(x) - keyHistorical(y);
  });
  var bestUnitCost = keyHistorical(allFuel[0]), firstBadIndex = allFuel.findIndex(function(item14) {
    return keyHistorical(item14) > 5 * bestUnitCost;
  }), potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel;
  potentialFuel.filter(function(item14) {
    return priceTooOld(item14);
  }).length > 100 && ((0, import_kolmafia8.mallPrices)("food"), (0, import_kolmafia8.mallPrices)("booze"));
  var key1 = function(item14) {
    return -getAverageAdventures(item14);
  }, key2 = function(item14) {
    return calculateFuelUnitCost(item14, PriceAge.RECENT);
  };
  potentialFuel.sort(function(x, y) {
    return key1(x) - key1(y);
  }), potentialFuel.sort(function(x, y) {
    return key2(x) - key2(y);
  });
  var candidates = potentialFuel.slice(0, 10), key3 = function(item14) {
    return calculateFuelUnitCost(item14, PriceAge.TODAY);
  };
  if (candidates.sort(function(x, y) {
    return key3(x) - key3(y);
  }), calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100)
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. This means something went wrong.");
  return candidates;
}
function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, result = (0, import_kolmafia8.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat(it.id, "&go=Convert%21"));
  return result.includes("The display updates with a");
}
function fillTo(targetUnits) {
  if (!installed()) return !1;
  for (; (0, import_kolmafia8.getFuel)() < targetUnits; ) {
    var _ref = (0, import_kolmafia8.canInteract)() ? getBestFuels() : [$item(_templateObject411 || (_templateObject411 = _taggedTemplateLiteral3(["loaf of soda bread"]))), void 0], _ref2 = _slicedToArray5(_ref, 2), bestFuel = _ref2[0], secondBest = _ref2[1], count = Math.ceil(targetUnits / getAverageAdventures(bestFuel)), ceiling = void 0;
    if (secondBest) {
      var efficiencyOfSecondBest = (0, import_kolmafia8.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }
    if ((0, import_kolmafia8.canInteract)() ? ceiling ? (0, import_kolmafia8.buy)(count, bestFuel, ceiling) : (0, import_kolmafia8.buy)(count, bestFuel) : (0, import_kolmafia8.retrieveItem)(count, bestFuel), !insertFuel(bestFuel, Math.min((0, import_kolmafia8.itemAmount)(bestFuel), count)))
      throw new Error("Failed to fuel Asdon Martin.");
  }
  return (0, import_kolmafia8.getFuel)() >= targetUnits;
}
function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort(function(a, b) {
    return getAverageAdventures(b) / (0, import_kolmafia8.autosellPrice)(b) - getAverageAdventures(a) / (0, import_kolmafia8.autosellPrice)(a);
  });
  if (options.length === 0) return !1;
  var best = options[0];
  if ((0, import_kolmafia8.autosellPrice)(best) / getAverageAdventures(best) > 100) return !1;
  var amountToUse = clamp(Math.ceil(targetUnits / getAverageAdventures(best)), 0, (0, import_kolmafia8.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
function fillWithInventoryTo(targetUnits) {
  if (!installed()) return !1;
  for (var continueFuelingFromInventory = !0; (0, import_kolmafia8.getFuel)() < targetUnits && continueFuelingFromInventory; )
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  return fillTo(targetUnits);
}
var Driving = {
  Obnoxiously: $effect(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral3(["Driving Obnoxiously"]))),
  Stealthily: $effect(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral3(["Driving Stealthily"]))),
  Wastefully: $effect(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral3(["Driving Wastefully"]))),
  Safely: $effect(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral3(["Driving Safely"]))),
  Recklessly: $effect(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral3(["Driving Recklessly"]))),
  Intimidatingly: $effect(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral3(["Driving Intimidatingly"]))),
  Quickly: $effect(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral3(["Driving Quickly"]))),
  Observantly: $effect(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral3(["Driving Observantly"]))),
  Waterproofly: $effect(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral3(["Driving Waterproofly"])))
};
function drive(style) {
  var turns2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, preferInventory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!Object.values(Driving).includes(style) || !installed()) return !1;
  if ((0, import_kolmafia8.haveEffect)(style) >= turns2) return !0;
  var fuelNeeded = 37 * Math.ceil((turns2 - (0, import_kolmafia8.haveEffect)(style)) / 30);
  for ((preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded); (0, import_kolmafia8.getFuel)() >= 37 && (0, import_kolmafia8.haveEffect)(style) < turns2; )
    (0, import_kolmafia8.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  return (0, import_kolmafia8.haveEffect)(style) >= turns2;
}

// src/actions/Banish.ts
var _templateObject54, _templateObject213, _templateObject313, _templateObject413, _templateObject55, _templateObject64, _templateObject74, _templateObject84, _templateObject94, _templateObject104, _templateObject114, _templateObject124, _templateObject134, _templateObject143, _templateObject153, _templateObject163, _templateObject173, _templateObject183, _templateObject193, _templateObject203, _templateObject214, _templateObject223, _templateObject233, _templateObject243, _templateObject253, _templateObject263, _templateObject273, _templateObject283, _templateObject293, _templateObject303, _templateObject314, _templateObject323, _templateObject333, _templateObject343, _templateObject353, _templateObject363, _templateObject373, _templateObject383, _templateObject393, _templateObject403, _templateObject414, _templateObject423, _templateObject433, _templateObject443;
function _toConsumableArray7(r) {
  return _arrayWithoutHoles7(r) || _iterableToArray7(r) || _unsupportedIterableToArray8(r) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray8(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray8(r, a) : void 0;
  }
}
function _iterableToArray7(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles7(r) {
  if (Array.isArray(r)) return _arrayLikeToArray8(r);
}
function _arrayLikeToArray8(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral4(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var scrapbookChargesLastUpdated = get("_lastCombatStarted"), asdonMartinSource = new ActionSource($skill(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral4(["Asdon Martin: Spring-Loaded Front Bumper"]))), function() {
  if (!installed()) return 0;
  var banishes = get("banishedMonsters").split(":"), bumperIndex = banishes.map(function(string) {
    return string.toLowerCase();
  }).indexOf("spring-loaded front bumper");
  return bumperIndex === -1 || (0, import_kolmafia9.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
}, Macro.trySkill($skill(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral4(["Asdon Martin: Spring-Loaded Front Bumper"])))), {
  preparation: function() {
    return fillTo(50);
  }
}), banishSources = [
  // Free limited sources
  new ActionSource($skill(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral4(["Snokebomb"]))), function() {
    return have($skill(_templateObject413 || (_templateObject413 = _taggedTemplateLiteral4(["Snokebomb"])))) ? 3 - get("_snokebombUsed") : 0;
  }, Macro.skill($skill(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral4(["Snokebomb"])))), {
    preparation: function() {
      return (0, import_kolmafia9.restoreMp)(50);
    }
  }),
  new ActionSource($skill(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral4(["Emotionally Chipped"]))), function() {
    return have($skill(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral4(["Emotionally Chipped"])))) ? 3 - get("_feelHatredUsed") : 0;
  }, Macro.skill($skill(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral4(["Feel Hatred"]))))),
  new ActionSource($item(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral4(["Kremlin's Greatest Briefcase"]))), function() {
    return have($item(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral4(["Kremlin's Greatest Briefcase"])))) ? 3 - get("_kgbTranquilizerDartUses") : 0;
  }, Macro.skill($skill(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral4(["KGB tranquilizer dart"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral4(["Kremlin's Greatest Briefcase"])))
      });
    }
  }),
  new ActionSource($item(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral4(["latte lovers member's mug"]))), function() {
    return have($item(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral4(["latte lovers member's mug"])))) && !get("_latteBanishUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral4(["Throw Latte on Opponent"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral4(["latte lovers member's mug"])))
      });
    }
  }),
  new ActionSource($item(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral4(["Lil' Doctor\u2122 bag"]))), function() {
    return have($item(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral4(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_reflexHammerUsed") : 0;
  }, Macro.skill($skill(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral4(["Reflex Hammer"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral4(["Lil' Doctor\u2122 bag"])))
      });
    }
  }),
  new ActionSource($item(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral4(["mafia middle finger ring"]))), function() {
    return have($item(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral4(["mafia middle finger ring"])))) && (0, import_kolmafia9.canEquip)($item(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral4(["mafia middle finger ring"])))) && !get("_mafiaMiddleFingerRingUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral4(["Show them your ring"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral4(["mafia middle finger ring"])))
      });
    }
  }),
  new ActionSource($item(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral4(["V for Vivala mask"]))), function() {
    return have($item(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral4(["V for Vivala mask"])))) && !get("_vmaskBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral4(["Creepy Grin"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral4(["V for Vivala mask"])))
      });
    },
    preparation: function() {
      return (0, import_kolmafia9.restoreMp)(30);
    }
  }),
  new ActionSource($item(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral4(["stinky cheese eye"]))), function() {
    return getFoldGroup($item(_templateObject314 || (_templateObject314 = _taggedTemplateLiteral4(["stinky cheese eye"])))).some(function(item14) {
      return have(item14);
    }) && !get("_stinkyCheeseBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral4(["Give Your Opponent the Stinkeye"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral4(["stinky cheese eye"])))
      });
    },
    preparation: function() {
      return have($item(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral4(["stinky cheese eye"])))) || (0, import_kolmafia9.cliExecute)("fold stinky cheese eye"), have($item(_templateObject353 || (_templateObject353 = _taggedTemplateLiteral4(["stinky cheese eye"]))));
    }
  }),
  new ActionSource($skill(_templateObject363 || (_templateObject363 = _taggedTemplateLiteral4(["Show your boring familiar pictures"]))), function() {
    return have($item(_templateObject373 || (_templateObject373 = _taggedTemplateLiteral4(["familiar scrapbook"])))) ? (scrapbookChargesLastUpdated !== get("_lastCombatStarted") && ((0, import_kolmafia9.visitUrl)("desc_item.php?whichitem=463063785"), scrapbookChargesLastUpdated = get("_lastCombatStarted")), Math.floor(get("scrapbookCharges") / 100)) : 0;
  }, Macro.skill($skill(_templateObject383 || (_templateObject383 = _taggedTemplateLiteral4(["Show your boring familiar pictures"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject393 || (_templateObject393 = _taggedTemplateLiteral4(["familiar scrapbook"])))
      });
    }
  }),
  new ActionSource($item(_templateObject403 || (_templateObject403 = _taggedTemplateLiteral4(["human musk"]))), function() {
    return Math.max(0, 3 - get("_humanMuskUses"));
  }, Macro.item($item(_templateObject414 || (_templateObject414 = _taggedTemplateLiteral4(["human musk"])))), {
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)($item(_templateObject423 || (_templateObject423 = _taggedTemplateLiteral4(["human musk"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject433 || (_templateObject433 = _taggedTemplateLiteral4(["human musk"]))));
    }
  })
].concat(_toConsumableArray7($items(_templateObject443 || (_templateObject443 = _taggedTemplateLiteral4(["Louder Than Bomb, divine champagne popper, tennis ball"]))).map(function(item14) {
  return new ActionSource(item14, function() {
    return 1 / 0;
  }, Macro.item(item14), {
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)(item14);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item14);
    }
  });
})));
function tryFindBanish(constraints) {
  var source = findActionSource(banishSources, constraints);
  return source && asdonMartinSource.available() && (source = asdonMartinSource.merge(source)), source;
}
function ensureBanish(constraints) {
  var source = tryFindBanish(constraints);
  if (!source)
    throw new Error("Failed to ensure Banish source");
  return source;
}

// src/actions/FreeKill.ts
init_kolmafia_polyfill();
var import_kolmafia10 = require("kolmafia");
var _templateObject56, _templateObject215, _templateObject315, _templateObject415, _templateObject57, _templateObject65, _templateObject75, _templateObject85, _templateObject95, _templateObject105, _templateObject115, _templateObject125, _templateObject135, _templateObject144, _templateObject154, _templateObject164, _templateObject174, _templateObject184, _templateObject194, _templateObject204, _templateObject216, _templateObject224, _templateObject234, _templateObject244, _templateObject254, _templateObject264, _templateObject274, _templateObject284, _templateObject294, _templateObject304, _templateObject316, _templateObject324, _templateObject334, _templateObject344, _templateObject354, _templateObject364, _templateObject374, _templateObject384, _templateObject394, _templateObject404, _templateObject416, _templateObject424, _templateObject434, _templateObject444, _templateObject453;
function _taggedTemplateLiteral5(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _toConsumableArray8(r) {
  return _arrayWithoutHoles8(r) || _iterableToArray8(r) || _unsupportedIterableToArray9(r) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray9(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray9(r, a) : void 0;
  }
}
function _iterableToArray8(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles8(r) {
  if (Array.isArray(r)) return _arrayLikeToArray9(r);
}
function _arrayLikeToArray9(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var freeKillSources = [
  // Free limited sources
  new ActionSource($skill(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"]))), function() {
    return !get("_gingerbreadMobHitUsed") && have($skill(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"])))) ? 1 : 0;
  }, Macro.skill($skill(_templateObject315 || (_templateObject315 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"])))), {
    preparation: function() {
      return (0, import_kolmafia10.restoreMp)(30);
    }
  }),
  new ActionSource($skill(_templateObject415 || (_templateObject415 = _taggedTemplateLiteral5(["Shattering Punch"]))), function() {
    return have($skill(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral5(["Shattering Punch"])))) ? 3 - get("_shatteringPunchUsed") : 0;
  }, Macro.skill($skill(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral5(["Shattering Punch"])))), {
    preparation: function() {
      return (0, import_kolmafia10.restoreMp)(30);
    }
  }),
  new ActionSource($item(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral5(["replica bat-oomerang"]))), function() {
    return have($item(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral5(["replica bat-oomerang"])))) ? 3 - get("_usedReplicaBatoomerang") : 0;
  }, Macro.item($item(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral5(["replica bat-oomerang"]))))),
  new ActionSource($item(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral5(["The Jokester's gun"]))), function() {
    return !get("_firedJokestersGun") && have($item(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral5(["The Jokester's gun"])))) && (0, import_kolmafia10.canEquip)($item(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral5(["The Jokester's gun"])))) ? 1 : 0;
  }, Macro.skill($skill(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral5(["Fire the Jokester's Gun"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral5(["The Jokester's gun"])))
      });
    }
  }),
  new ActionSource($item(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"]))), function() {
    return have($item(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_chestXRayUsed") : 0;
  }, Macro.skill($skill(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral5(["Chest X-Ray"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"])))
      });
    }
  }),
  new ActionSource($skill(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral5(["Asdon Martin: Missile Launcher"]))), function() {
    return !get("_missileLauncherUsed") && installed() ? 1 : 0;
  }, Macro.skill($skill(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral5(["Asdon Martin: Missile Launcher"])))), {
    preparation: function() {
      return fillTo(100);
    }
  }),
  // Heavy Rains
  new ActionSource($skill(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral5(["Lightning Strike"]))), function() {
    return have($skill(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral5(["Lightning Strike"])))) ? Math.floor((0, import_kolmafia10.myLightning)() / 20) : 0;
  }, Macro.skill($skill(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral5(["Lightning Strike"]))))),
  // Expensive limited sources
  new ActionSource($item(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral5(["powdered madness"]))), function() {
    return 5 - get("_powderedMadnessUses");
  }, Macro.item($item(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral5(["powdered madness"])))), {
    preparation: function() {
      return (0, import_kolmafia10.retrieveItem)($item(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral5(["powdered madness"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral5(["powdered madness"]))));
    }
  }),
  new ActionSource($familiar(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral5(["Puck Man"]))), function() {
    return have($familiar(_templateObject294 || (_templateObject294 = _taggedTemplateLiteral5(["Puck Man"])))) ? 20 - get("_powerPillUses") : 0;
  }, Macro.item($item(_templateObject304 || (_templateObject304 = _taggedTemplateLiteral5(["power pill"])))), {
    familiar: function() {
      return $familiar(_templateObject316 || (_templateObject316 = _taggedTemplateLiteral5(["Puck Man"])));
    },
    preparation: function() {
      return (0, import_kolmafia10.retrieveItem)($item(_templateObject324 || (_templateObject324 = _taggedTemplateLiteral5(["power pill"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject334 || (_templateObject334 = _taggedTemplateLiteral5(["power pill"]))));
    }
  }),
  new ActionSource($familiar(_templateObject344 || (_templateObject344 = _taggedTemplateLiteral5(["Ms. Puck Man"]))), function() {
    return have($familiar(_templateObject354 || (_templateObject354 = _taggedTemplateLiteral5(["Ms. Puck Man"])))) ? 20 - get("_powerPillUses") : 0;
  }, Macro.item($item(_templateObject364 || (_templateObject364 = _taggedTemplateLiteral5(["power pill"])))), {
    familiar: function() {
      return $familiar(_templateObject374 || (_templateObject374 = _taggedTemplateLiteral5(["Ms. Puck Man"])));
    },
    preparation: function() {
      return (0, import_kolmafia10.retrieveItem)($item(_templateObject384 || (_templateObject384 = _taggedTemplateLiteral5(["power pill"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject394 || (_templateObject394 = _taggedTemplateLiteral5(["power pill"]))));
    }
  }),
  // Expensive unlimited sources
  new ActionSource($skill(_templateObject404 || (_templateObject404 = _taggedTemplateLiteral5(["Shocking Lick"]))), function() {
    return 1 / 0;
  }, Macro.skill($skill(_templateObject416 || (_templateObject416 = _taggedTemplateLiteral5(["Shocking Lick"])))), {
    preparation: function() {
      return get("shockingLickCharges") === 0 && (0, import_kolmafia10.retrieveItem)($item(_templateObject424 || (_templateObject424 = _taggedTemplateLiteral5(["battery (9-Volt)"])))) && (0, import_kolmafia10.use)($item(_templateObject434 || (_templateObject434 = _taggedTemplateLiteral5(["battery (9-Volt)"])))), get("shockingLickCharges") > 0;
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject444 || (_templateObject444 = _taggedTemplateLiteral5(["battery (AAA)"])))) * 4;
    }
  })
].concat(_toConsumableArray8($items(_templateObject453 || (_templateObject453 = _taggedTemplateLiteral5(["Daily Affirmation: Think Win-Lose, superduperheated metal"]))).map(function(item14) {
  return new ActionSource(item14, function() {
    return 1 / 0;
  }, Macro.item(item14), {
    preparation: function() {
      return (0, import_kolmafia10.retrieveItem)(item14);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item14);
    }
  });
})));
function tryFindFreeKill(constraints) {
  return findActionSource(freeKillSources, constraints);
}
function ensureFreeKill(constraints) {
  var source = tryFindFreeKill(constraints);
  if (!source)
    throw new Error("Failed to ensure Free Kill source");
  return source;
}

// src/actions/FreeRun.ts
init_kolmafia_polyfill();
var import_kolmafia13 = require("kolmafia");

// src/resources/2009/Bandersnatch.ts
var Bandersnatch_exports = {};
__export(Bandersnatch_exports, {
  canRunaway: function() {
    return canRunaway;
  },
  couldRunaway: function() {
    return couldRunaway;
  },
  getMaxRunaways: function() {
    return getMaxRunaways;
  },
  getRemainingRunaways: function() {
    return getRemainingRunaways;
  },
  getRunaways: function() {
    return getRunaways;
  },
  have: function() {
    return have3;
  },
  prepareRunaway: function() {
    return prepareRunaway;
  }
});
init_kolmafia_polyfill();
var import_kolmafia11 = require("kolmafia");
var _templateObject58, _templateObject217, _templateObject317;
function _createForOfIteratorHelper5(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray10(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray10(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray10(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray10(r, a) : void 0;
  }
}
function _arrayLikeToArray10(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral6(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar = $familiar(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral6(["Frumious Bandersnatch"])));
function have3() {
  return have(familiar);
}
function getRunaways() {
  return get("_banderRunaways");
}
function getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.floor(totalFamiliarWeight(familiar, considerWeightAdjustment) / 5);
}
function getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}
function couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have3() && getRemainingRunaways(considerWeightAdjustment) > 0;
}
var odeSkill = $skill(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral6(["The Ode to Booze"]))), odeEffect = $effect(_templateObject317 || (_templateObject317 = _taggedTemplateLiteral6(["Ode to Booze"])));
function canRunaway() {
  return isCurrentFamiliar(familiar) && couldRunaway() && have(odeEffect);
}
function prepareRunaway(songsToRemove) {
  if (!have(odeEffect)) {
    if (!have(odeSkill))
      return !1;
    if (!canRememberSong()) {
      var activeSongs = getActiveSongs(), _iterator = _createForOfIteratorHelper5(songsToRemove), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var song2 = _step.value;
          if (activeSongs.includes(song2) && uneffect(song2))
            break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    if (!(0, import_kolmafia11.useSkill)(odeSkill))
      return !1;
  }
  return (0, import_kolmafia11.useFamiliar)(familiar);
}

// src/resources/2011/StompingBoots.ts
var StompingBoots_exports = {};
__export(StompingBoots_exports, {
  canRunaway: function() {
    return canRunaway2;
  },
  couldRunaway: function() {
    return couldRunaway2;
  },
  getMaxRunaways: function() {
    return getMaxRunaways2;
  },
  getRemainingRunaways: function() {
    return getRemainingRunaways2;
  },
  getRunaways: function() {
    return getRunaways2;
  },
  have: function() {
    return have4;
  },
  prepareRunaway: function() {
    return prepareRunaway2;
  }
});
init_kolmafia_polyfill();
var import_kolmafia12 = require("kolmafia");
var _templateObject59;
function _taggedTemplateLiteral7(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar2 = $familiar(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral7(["Pair of Stomping Boots"])));
function have4() {
  return have(familiar2);
}
function getRunaways2() {
  return get("_banderRunaways");
}
function getMaxRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.floor(totalFamiliarWeight(familiar2, considerWeightAdjustment) / 5);
}
function getRemainingRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways2(considerWeightAdjustment) - getRunaways2());
}
function couldRunaway2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have4() && getRemainingRunaways2(considerWeightAdjustment) > 0;
}
function canRunaway2() {
  return isCurrentFamiliar(familiar2) && couldRunaway2();
}
function prepareRunaway2() {
  return (0, import_kolmafia12.useFamiliar)(familiar2);
}

// src/actions/FreeRun.ts
var _templateObject60, _templateObject218, _templateObject318, _templateObject417, _templateObject510, _templateObject66, _templateObject76, _templateObject86, _templateObject96, _templateObject106, _templateObject116, _templateObject126, _templateObject136, _templateObject145, _templateObject155, _templateObject165, _templateObject175, _templateObject185, _templateObject195, _templateObject205, _templateObject219, _templateObject225, _templateObject235, _templateObject245, _templateObject255;
function _toConsumableArray9(r) {
  return _arrayWithoutHoles9(r) || _iterableToArray9(r) || _unsupportedIterableToArray11(r) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray11(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray11(r, a) : void 0;
  }
}
function _iterableToArray9(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles9(r) {
  if (Array.isArray(r)) return _arrayLikeToArray11(r);
}
function _arrayLikeToArray11(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral8(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var everythingLooksGreen = function() {
  var otherClause = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
    return !0;
  };
  return function() {
    return otherClause() && !have($effect(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral8(["Everything Looks Green"])))) ? 1 : 0;
  };
}, freeRunSources = [
  // Free unlimited source
  new ActionSource($item(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral8(["spring shoes"]))), everythingLooksGreen(function() {
    return have($item(_templateObject318 || (_templateObject318 = _taggedTemplateLiteral8(["spring shoes"]))));
  }), Macro.skill($skill(_templateObject417 || (_templateObject417 = _taggedTemplateLiteral8(["Spring Away"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject510 || (_templateObject510 = _taggedTemplateLiteral8(["spring shoes"])))
      });
    }
  }),
  // Free limited sources
  new ActionSource($familiar(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral8(["Frumious Bandersnatch"]))), function() {
    return (have($effect(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral8(["Ode to Booze"])))) || getSongCount() < getSongLimit()) && couldRunaway() ? getRemainingRunaways() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    preparation: function() {
      return ensureEffect($effect(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral8(["Ode to Booze"])))), have($effect(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral8(["Ode to Booze"]))));
    },
    familiar: function() {
      return $familiar(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral8(["Frumious Bandersnatch"])));
    }
  }),
  new ActionSource($familiar(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral8(["Pair of Stomping Boots"]))), function() {
    return couldRunaway2() ? getRemainingRunaways2() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    familiar: function() {
      return $familiar(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral8(["Pair of Stomping Boots"])));
    }
  }),
  new ActionSource($item(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral8(["navel ring of navel gazing"]))), function() {
    return have($item(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral8(["navel ring of navel gazing"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral8(["navel ring of navel gazing"])))
      });
    }
  }),
  new ActionSource($item(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral8(["Greatest American Pants"]))), function() {
    return have($item(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral8(["Greatest American Pants"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral8(["Greatest American Pants"])))
      });
    }
  }),
  new ActionSource($item(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral8(["peppermint parasol"]))), function() {
    return Math.max(0, 3 - get("_navelRunaways"));
  }, Macro.item($item(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral8(["peppermint parasol"])))), {
    preparation: function() {
      return (0, import_kolmafia13.retrieveItem)($item(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral8(["peppermint parasol"]))));
    },
    cost: function() {
      return Math.min(ActionSource.defaultPriceFunction($item(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral8(["peppermint sprout"])))) * 5, ActionSource.defaultPriceFunction($item(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral8(["peppermint parasol"]))))) / 10;
    }
    // Breaks after 10 successful runaways.
  })
].concat(_toConsumableArray9($items(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral8(["green smoke bomb, tattered scrap of paper, GOTO, T.U.R.D.S. Key"]))).map(function(item14) {
  return new ActionSource(item14, everythingLooksGreen(), Macro.item(item14), {
    preparation: function() {
      return (0, import_kolmafia13.retrieveItem)(item14);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item14);
    }
  });
})), _toConsumableArray9($items(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral8(["fish-oil smoke bomb, giant eraser"]))).map(function(item14) {
  return new ActionSource(item14, function() {
    return have(item14) ? 1 : 0;
  }, Macro.item(item14), {
    preparation: function() {
      return have(item14);
    },
    cost: function() {
      return 0;
    }
  });
})));
function tryFindFreeRun(constraints) {
  var source = findActionSource(freeRunSources, constraints);
  return source;
}
function ensureFreeRun(constraints) {
  var source = tryFindFreeRun(constraints);
  if (!source)
    throw new Error("Failed to ensure Free Run source");
  return source;
}

// src/ascend.ts
init_kolmafia_polyfill();
var import_kolmafia71 = require("kolmafia");

// src/moonSign.ts
init_kolmafia_polyfill();
var MoonSigns = ["Mongoose", "Wallaby", "Vole", "Platypus", "Opossum", "Marmot", "Wombat", "Blender", "Packrat"];
function signNameToId(moon) {
  return MoonSigns.indexOf(moon) + 1;
}
function signIdToName(id) {
  return MoonSigns[id - 1] || "None";
}

// src/resources/index.ts
init_kolmafia_polyfill();

// src/resources/2006/CommaChameleon.ts
var CommaChameleon_exports = {};
__export(CommaChameleon_exports, {
  currentFamiliar: function() {
    return currentFamiliar;
  },
  have: function() {
    return have5;
  },
  transform: function() {
    return transform;
  }
});
init_kolmafia_polyfill();
var import_kolmafia14 = require("kolmafia");
var _templateObject61;
function _taggedTemplateLiteral9(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar3 = $familiar(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral9(["Comma Chameleon"])));
function have5() {
  return have(familiar3);
}
function transform(fam) {
  if (currentFamiliar() === fam)
    return !0;
  var equipment = (0, import_kolmafia14.familiarEquipment)(fam);
  return equipment !== $item.none || !have(equipment) ? !1 : ((0, import_kolmafia14.visitUrl)("inv_equip.php?which=2&action=equip&whichitem=".concat((0, import_kolmafia14.toInt)(equipment), "&pwd")), !0);
}
function currentFamiliar() {
  return get("commaFamiliar");
}

// src/resources/2008/Stickers.ts
var Stickers_exports = {};
__export(Stickers_exports, {
  currentStickers: function() {
    return currentStickers;
  },
  foldWeapon: function() {
    return foldWeapon;
  },
  have: function() {
    return have6;
  },
  makeSword: function() {
    return makeSword;
  },
  setStickers: function() {
    return setStickers;
  },
  stickers: function() {
    return stickers;
  },
  weapon: function() {
    return weapon;
  }
});
init_kolmafia_polyfill();
var import_kolmafia15 = require("kolmafia");
var _templateObject67, _templateObject220, _templateObject319, _templateObject418, _templateObject511, _templateObject68, _templateObject77, _templateObject87, _templateObject97, _templateObject107, _templateObject117;
function _taggedTemplateLiteral10(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var stickers = {
  unicorn: $item(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral10(["scratch 'n' sniff unicorn sticker"]))),
  apple: $item(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral10(["scratch 'n' sniff apple sticker"]))),
  UPC: $item(_templateObject319 || (_templateObject319 = _taggedTemplateLiteral10(["scratch 'n' sniff UPC sticker"]))),
  wrestler: $item(_templateObject418 || (_templateObject418 = _taggedTemplateLiteral10(["scratch 'n' sniff wrestler sticker"]))),
  dragon: $item(_templateObject511 || (_templateObject511 = _taggedTemplateLiteral10(["scratch 'n' sniff dragon sticker"]))),
  rockband: $item(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral10(["scratch 'n' sniff rock band sticker"])))
};
function have6() {
  return (0, import_kolmafia15.haveSkill)($skill(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral10(["Summon Stickers"]))));
}
function weapon() {
  var _find;
  return (_find = $items(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral10(["scratch 'n' sniff sword, scratch 'n' sniff crossbow"]))).find(function(i) {
    return (0, import_kolmafia15.availableAmount)(i);
  })) !== null && _find !== void 0 ? _find : null;
}
var weapons = {
  sword: $item(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral10(["scratch 'n' sniff sword"]))),
  crossbow: $item(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral10(["scratch 'n' sniff crossbow"])))
};
function makeSword(sticker) {
  weapon() || (0, import_kolmafia15.visitUrl)("bedazzle.php?action=juststick&sticker=".concat(stickers[sticker].id, "&pwd"));
}
function foldWeapon(mode) {
  var currentWep = weapon();
  return currentWep ? weapons[mode] === currentWep ? !0 : ((0, import_kolmafia15.visitUrl)("bedazzle.php?action=fold&pwd"), weapons[mode] === currentWep) : !1;
}
function currentStickers() {
  return $slots(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral10(["sticker1, sticker2, sticker3"]))).map(function(s) {
    return (0, import_kolmafia15.equippedItem)(s);
  });
}
function setStickers() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++)
    options[_key] = arguments[_key];
  for (var _loop = function() {
    var s = _options[_i];
    s && (0, import_kolmafia15.retrieveItem)(stickers[s], options.filter(function(x) {
      return x === s;
    }).length);
  }, _i = 0, _options = options; _i < _options.length; _i++)
    _loop();
  (0, import_kolmafia15.visitUrl)("bedazzle.php");
  for (var start = currentStickers(), i = 0; i <= 2; i++) {
    var sticker = options[i];
    if (sticker) {
      var item14 = stickers[sticker];
      start[i] !== item14 && ((0, import_kolmafia15.visitUrl)("bedazzle.php?action=peel&slot=".concat(i + 1, "&pwd")), (0, import_kolmafia15.visitUrl)("bedazzle.php?action=stick&slot=".concat(i + 1, "&sticker=").concat(item14.id, "&pwd")));
    }
  }
  return currentStickers();
}

// src/resources/2009/SpookyPutty.ts
var SpookyPutty_exports = {};
__export(SpookyPutty_exports, {
  getSpookyPuttySheetCopiesMade: function() {
    return getSpookyPuttySheetCopiesMade;
  },
  getSpookyPuttySheetMonster: function() {
    return getSpookyPuttySheetMonster;
  },
  have: function() {
    return have7;
  },
  prepareSpookyPuttySheet: function() {
    return prepareSpookyPuttySheet;
  },
  useSpookyPuttySheet: function() {
    return useSpookyPuttySheet;
  }
});
init_kolmafia_polyfill();
var import_kolmafia16 = require("kolmafia");
var _templateObject69;
function _taggedTemplateLiteral11(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var sheet = $item(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral11(["Spooky Putty sheet"])));
function have7() {
  return getFoldGroup(sheet).some(function(item14) {
    return have(item14);
  });
}
function getSpookyPuttySheetCopiesMade() {
  return Math.max(0, get("spookyPuttyCopiesMade"));
}
function prepareSpookyPuttySheet() {
  return have7() ? have(sheet) ? !0 : (0, import_kolmafia16.cliExecute)("fold Spooky putty sheet") : !1;
}
function getSpookyPuttySheetMonster() {
  return get("spookyPuttyMonster");
}
function useSpookyPuttySheet() {
  return (0, import_kolmafia16.use)(sheet);
}

// src/resources/2010/CrownOfThrones.ts
var CrownOfThrones_exports = {};
__export(CrownOfThrones_exports, {
  createModifierValueFunction: function() {
    return createModifierValueFunction;
  },
  createRiderMode: function() {
    return createRiderMode;
  },
  getModifier: function() {
    return getModifier;
  },
  hasRiderMode: function() {
    return hasRiderMode;
  },
  pickRider: function() {
    return pickRider;
  },
  ridingFamiliars: function() {
    return ridingFamiliars;
  },
  valueRider: function() {
    return valueRider;
  }
});
init_kolmafia_polyfill();
var import_kolmafia17 = require("kolmafia");
var _templateObject70, _templateObject221, _templateObject320, _templateObject419, _templateObject512, _templateObject610, _templateObject78, _templateObject88, _templateObject98, _templateObject108, _templateObject118, _templateObject127, _templateObject137, _templateObject146, _templateObject156, _templateObject166, _templateObject176, _templateObject186, _templateObject196, _templateObject206, _templateObject2110, _templateObject226, _templateObject236, _templateObject246, _templateObject256, _templateObject265, _templateObject275, _templateObject285, _templateObject295, _templateObject305, _templateObject3110, _templateObject325, _templateObject335, _templateObject345, _templateObject355, _templateObject365, _templateObject375, _templateObject385, _templateObject395, _templateObject405, _templateObject4110, _templateObject425, _templateObject435, _templateObject445, _templateObject454, _templateObject463, _templateObject473, _templateObject483, _templateObject493, _templateObject502, _templateObject513, _templateObject522, _templateObject532, _templateObject542, _templateObject552, _templateObject562, _templateObject572, _templateObject582, _templateObject592, _templateObject602, _templateObject612, _templateObject622, _templateObject632, _templateObject642, _templateObject652, _templateObject662, _templateObject672, _templateObject682, _templateObject692, _templateObject702, _templateObject71, _templateObject722, _templateObject732, _templateObject742, _templateObject752, _templateObject762, _templateObject772, _templateObject782, _templateObject79, _templateObject80, _templateObject81, _templateObject822, _templateObject832, _templateObject842, _templateObject852, _templateObject862, _templateObject872, _templateObject882, _templateObject89, _templateObject90, _templateObject91, _templateObject922, _templateObject932, _templateObject942, _templateObject952, _templateObject962, _templateObject972, _templateObject982, _templateObject99, _templateObject100, _templateObject101;
function ownKeys4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys4(Object(t), !0).forEach(function(r2) {
      _defineProperty6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty6(e, r, t) {
  return (r = _toPropertyKey7(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey7(t) {
  var i = _toPrimitive7(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive7(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _toConsumableArray10(r) {
  return _arrayWithoutHoles10(r) || _iterableToArray10(r) || _unsupportedIterableToArray12(r) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray12(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray12(r, a) : void 0;
  }
}
function _iterableToArray10(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles10(r) {
  if (Array.isArray(r)) return _arrayLikeToArray12(r);
}
function _arrayLikeToArray12(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral12(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var ridingFamiliars = [{
  familiar: $familiar(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral12(["Puck Man"]))),
  drops: $items(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral12(["yellow pixel"]))),
  probability: 0.25,
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject320 || (_templateObject320 = _taggedTemplateLiteral12(["Ms. Puck Man"]))),
  drops: $items(_templateObject419 || (_templateObject419 = _taggedTemplateLiteral12(["yellow pixel"]))),
  probability: 0.25,
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject512 || (_templateObject512 = _taggedTemplateLiteral12(["Grimstone Golem"]))),
  drops: $items(_templateObject610 || (_templateObject610 = _taggedTemplateLiteral12(["grimstone mask"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_grimstoneMaskDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral12(["Knob Goblin Organ Grinder"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral12(["Happy Medium"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral12(["Garbage Fire"]))),
  drops: $items(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral12(["burning newspaper"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_garbageFireDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral12(["Machine Elf"]))),
  drops: $items(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral12(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"]))),
  probability: 0.2,
  dropPredicate: function() {
    return get("_abstractionDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral12(["Trick-or-Treating Tot"]))),
  drops: $items(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral12(["hoarded candy wad"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_hoardedCandyDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral12(["Warbear Drone"]))),
  drops: $items(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral12(["warbear whosit"]))),
  probability: 1 / 4.5
}, {
  familiar: $familiar(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral12(["Li'l Xenomorph"]))),
  drops: $items(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral12(["lunar isotope"]))),
  probability: 0.05
}, {
  familiar: $familiar(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral12(["Pottery Barn Owl"]))),
  drops: $items(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral12(["volcanic ash"]))),
  probability: 0.1
}, {
  familiar: $familiar(_templateObject2110 || (_templateObject2110 = _taggedTemplateLiteral12(["Grim Brother"]))),
  drops: $items(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral12(["grim fairy tale"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_grimFairyTaleDropsCrown") < 2;
  }
}, {
  familiar: $familiar(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral12(["Optimistic Candle"]))),
  drops: $items(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral12(["glob of melted wax"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_optimisticCandleDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral12(["Adventurous Spelunker"]))),
  drops: $items(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral12(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_oreDropsCrown") < 6;
  }
}, {
  familiar: $familiar(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral12(["Twitching Space Critter"]))),
  drops: $items(_templateObject285 || (_templateObject285 = _taggedTemplateLiteral12(["space beast fur"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_spaceFurDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject295 || (_templateObject295 = _taggedTemplateLiteral12(["Party Mouse"]))),
  drops: 50,
  probability: 0.05
}, {
  familiar: $familiar(_templateObject305 || (_templateObject305 = _taggedTemplateLiteral12(["Yule Hound"]))),
  drops: $items(_templateObject3110 || (_templateObject3110 = _taggedTemplateLiteral12(["candy cane"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject325 || (_templateObject325 = _taggedTemplateLiteral12(["Gluttonous Green Ghost"]))),
  drops: $items(_templateObject335 || (_templateObject335 = _taggedTemplateLiteral12(["bean burrito, enchanted bean burrito, jumping bean burrito"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject345 || (_templateObject345 = _taggedTemplateLiteral12(["Reassembled Blackbird"]))),
  drops: $items(_templateObject355 || (_templateObject355 = _taggedTemplateLiteral12(["blackberry"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject365 || (_templateObject365 = _taggedTemplateLiteral12(["Reconstituted Crow"]))),
  drops: $items(_templateObject375 || (_templateObject375 = _taggedTemplateLiteral12(["blackberry"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject385 || (_templateObject385 = _taggedTemplateLiteral12(["Hunchbacked Minion"]))),
  drops: /* @__PURE__ */ new Map([[$item(_templateObject395 || (_templateObject395 = _taggedTemplateLiteral12(["disembodied brain"]))), 0.02], [$item(_templateObject405 || (_templateObject405 = _taggedTemplateLiteral12(["skeleton bone"]))), 0.98]]),
  probability: 1
}, {
  familiar: $familiar(_templateObject4110 || (_templateObject4110 = _taggedTemplateLiteral12(["Reanimated Reanimator"]))),
  drops: $items(_templateObject425 || (_templateObject425 = _taggedTemplateLiteral12(["hot wing, broken skull"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject435 || (_templateObject435 = _taggedTemplateLiteral12(["Attention-Deficit Demon"]))),
  drops: $items(_templateObject445 || (_templateObject445 = _taggedTemplateLiteral12(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject454 || (_templateObject454 = _taggedTemplateLiteral12(["Piano Cat"]))),
  drops: $items(_templateObject463 || (_templateObject463 = _taggedTemplateLiteral12(["beertini, papaya slung, salty slug, tomato daiquiri"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject473 || (_templateObject473 = _taggedTemplateLiteral12(["Golden Monkey"]))),
  drops: $items(_templateObject483 || (_templateObject483 = _taggedTemplateLiteral12(["gold nuggets"]))),
  probability: 0.5
}, {
  familiar: $familiar(_templateObject493 || (_templateObject493 = _taggedTemplateLiteral12(["Robot Reindeer"]))),
  drops: $items(_templateObject502 || (_templateObject502 = _taggedTemplateLiteral12(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject513 || (_templateObject513 = _taggedTemplateLiteral12(["Stocking Mimic"]))),
  drops: $items(_templateObject522 || (_templateObject522 = _taggedTemplateLiteral12(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject532 || (_templateObject532 = _taggedTemplateLiteral12(["BRICKO chick"]))),
  drops: $items(_templateObject542 || (_templateObject542 = _taggedTemplateLiteral12(["BRICKO brick"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject552 || (_templateObject552 = _taggedTemplateLiteral12(["Cotton Candy Carnie"]))),
  drops: $items(_templateObject562 || (_templateObject562 = _taggedTemplateLiteral12(["cotton candy pinch"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject572 || (_templateObject572 = _taggedTemplateLiteral12(["Untamed Turtle"]))),
  drops: $items(_templateObject582 || (_templateObject582 = _taggedTemplateLiteral12(["snailmail bits, turtlemail bits, turtle wax"]))),
  probability: 0.35
}, {
  familiar: $familiar(_templateObject592 || (_templateObject592 = _taggedTemplateLiteral12(["Astral Badger"]))),
  drops: $items(_templateObject602 || (_templateObject602 = _taggedTemplateLiteral12(["spooky mushroom, Knob mushroom, Knoll mushroom"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject612 || (_templateObject612 = _taggedTemplateLiteral12(["Green Pixie"]))),
  drops: $items(_templateObject622 || (_templateObject622 = _taggedTemplateLiteral12(["bottle of tequila"]))),
  probability: 0.2
}, {
  familiar: $familiar(_templateObject632 || (_templateObject632 = _taggedTemplateLiteral12(["Angry Goat"]))),
  drops: $items(_templateObject642 || (_templateObject642 = _taggedTemplateLiteral12(["goat cheese pizza"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject652 || (_templateObject652 = _taggedTemplateLiteral12(["Adorable Seal Larva"]))),
  drops: $items(_templateObject662 || (_templateObject662 = _taggedTemplateLiteral12(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"]))),
  probability: 0.35
}, {
  familiar: $familiar(_templateObject672 || (_templateObject672 = _taggedTemplateLiteral12(["Ancient Yuletide Troll"]))),
  drops: $items(_templateObject682 || (_templateObject682 = _taggedTemplateLiteral12(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject692 || (_templateObject692 = _taggedTemplateLiteral12(["Sweet Nutcracker"]))),
  drops: $items(_templateObject702 || (_templateObject702 = _taggedTemplateLiteral12(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral12(["Casagnova Gnome"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject722 || (_templateObject722 = _taggedTemplateLiteral12(["Coffee Pixie"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject732 || (_templateObject732 = _taggedTemplateLiteral12(["Dancing Frog"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject742 || (_templateObject742 = _taggedTemplateLiteral12(["Grouper Groupie"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject752 || (_templateObject752 = _taggedTemplateLiteral12(["Hand Turkey"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject762 || (_templateObject762 = _taggedTemplateLiteral12(["Hippo Ballerina"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject772 || (_templateObject772 = _taggedTemplateLiteral12(["Jitterbug"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject782 || (_templateObject782 = _taggedTemplateLiteral12(["Leprechaun"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral12(["Obtuse Angel"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral12(["Psychedelic Bear"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral12(["Robortender"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject822 || (_templateObject822 = _taggedTemplateLiteral12(["Ghost of Crimbo Commerce"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject832 || (_templateObject832 = _taggedTemplateLiteral12(["Hobo Monkey"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject842 || (_templateObject842 = _taggedTemplateLiteral12(["Rockin' Robin"]))),
  drops: 60,
  probability: 1
}, {
  familiar: $familiar(_templateObject852 || (_templateObject852 = _taggedTemplateLiteral12(["Feral Kobold"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject862 || (_templateObject862 = _taggedTemplateLiteral12(["Oily Woim"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject872 || (_templateObject872 = _taggedTemplateLiteral12(["Cat Burglar"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject882 || (_templateObject882 = _taggedTemplateLiteral12(["Misshapen Animal Skeleton"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral12(["Gelatinous Cubeling"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral12(["Frozen Gravy Fairy"]))),
  drops: $items(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral12(["cold nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject922 || (_templateObject922 = _taggedTemplateLiteral12(["Stinky Gravy Fairy"]))),
  drops: $items(_templateObject932 || (_templateObject932 = _taggedTemplateLiteral12(["stench nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject942 || (_templateObject942 = _taggedTemplateLiteral12(["Sleazy Gravy Fairy"]))),
  drops: $items(_templateObject952 || (_templateObject952 = _taggedTemplateLiteral12(["sleaze nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject962 || (_templateObject962 = _taggedTemplateLiteral12(["Spooky Gravy Fairy"]))),
  drops: $items(_templateObject972 || (_templateObject972 = _taggedTemplateLiteral12(["spooky nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject982 || (_templateObject982 = _taggedTemplateLiteral12(["Mini Kiwi"]))),
  drops: $items(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral12(["mini kiwi"]))),
  probability: 0.08
}, {
  familiar: $familiar(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral12(["Flaming Gravy Fairy"]))),
  // drops a hot nugget every combat, 5 of which can be used to make a hot wad
  drops: $items(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral12(["hot nuggets"]))),
  probability: 1
}], FULL_RIDING_LIST = [].concat(ridingFamiliars, _toConsumableArray10(import_kolmafia17.Familiar.all().filter(function(f) {
  return !ridingFamiliars.some(function(_ref) {
    var familiar10 = _ref.familiar;
    return familiar10 === f;
  });
}).map(function(familiar10) {
  return {
    familiar: familiar10,
    drops: 0,
    probability: 1
  };
})));
function valueRider(rider, modifierValueFunction, dropsValueFunction) {
  var ignoreLimitedDrops = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * (typeof rider.drops == "number" ? rider.drops : dropsValueFunction(rider.drops)) : 0, modifierValue = modifierValueFunction(rider.familiar);
  return dropValue + modifierValue;
}
var riderModes = /* @__PURE__ */ new Map(), DEFAULTS = {
  modifierValueFunction: function() {
    return 0;
  },
  dropsValueFunction: function() {
    return 0;
  },
  ignoreLimitedDrops: !1,
  excludeCurrentFamiliar: !0
};
function createRiderMode(name, details) {
  return riderModes.set(name, _objectSpread4(_objectSpread4({}, DEFAULTS), details));
}
function hasRiderMode(name) {
  return riderModes.has(name);
}
var riderLists = /* @__PURE__ */ new Map();
function pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData) return null;
  var modifierValueFunction = modeData.modifierValueFunction, dropsValueFunction = modeData.dropsValueFunction, ignoreLimitedDrops = modeData.ignoreLimitedDrops, excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;
  riderLists.has(mode) || riderLists.set(mode, FULL_RIDING_LIST.filter(function(_ref2) {
    var familiar10 = _ref2.familiar;
    return have(familiar10);
  }).map(function(rider) {
    return _objectSpread4(_objectSpread4({}, rider), {}, {
      value: valueRider(rider, modifierValueFunction, dropsValueFunction, ignoreLimitedDrops)
    });
  }).sort(function(_ref3, _ref4) {
    var a = _ref3.value, b = _ref4.value;
    return b - a;
  }));
  var list = riderLists.get(mode);
  if (list) {
    var riderToReturn = list.find(function(_ref5) {
      var _dropPredicate, dropPredicate = _ref5.dropPredicate, familiar10 = _ref5.familiar;
      return ((_dropPredicate = dropPredicate == null ? void 0 : dropPredicate()) !== null && _dropPredicate !== void 0 ? _dropPredicate : !0) && (!excludeCurrentFamiliar || (0, import_kolmafia17.myFamiliar)() !== familiar10);
    });
    return riderToReturn != null ? riderToReturn : null;
  }
  return null;
}
function getModifier(modifier, familiar10) {
  return (0, import_kolmafia17.numericModifier)("Throne:".concat(familiar10), modifier);
}
function createModifierValueFunction(modifiers, functions) {
  return function(familiar10) {
    return sum(modifiers, function(modifier) {
      return functions[modifier](getModifier(modifier, familiar10));
    });
  };
}

// src/resources/2010/LookingGlass.ts
var LookingGlass_exports = {};
__export(LookingGlass_exports, {
  findTeaPartyHatLength: function() {
    return findTeaPartyHatLength;
  },
  findTeaPartyHats: function() {
    return findTeaPartyHats;
  },
  haveTeaPartyHat: function() {
    return haveTeaPartyHat;
  },
  tryTeaPartyBuff: function() {
    return tryTeaPartyBuff;
  }
});
init_kolmafia_polyfill();
var import_kolmafia18 = require("kolmafia");
var _templateObject109, _templateObject227, _templateObject321, _templateObject420, _templateObject514;
function _taggedTemplateLiteral13(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var firstTeaPartyEffect = $effect(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral13(["Assaulted with Pepper"]))), lastTeaPartyEffect = $effect(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral13(["Oleaginous Soles"])));
function validTeaPartyHat(item14, characters) {
  return (0, import_kolmafia18.toSlot)(item14) !== $slot(_templateObject321 || (_templateObject321 = _taggedTemplateLiteral13(["hat"]))) || !(0, import_kolmafia18.canEquip)(item14) ? !1 : characters <= 5 ? item14.nameLength <= 5 : characters >= 30 ? item14.nameLength >= 30 : characters === item14.nameLength;
}
function findTeaPartyHatLength(effect2) {
  var effectId = effect2.id;
  if (effectId < firstTeaPartyEffect.id || effectId > lastTeaPartyEffect.id)
    throw new Error("Invalid Mad Tea Party effect ".concat(effect2));
  return Math.floor(effectId - firstTeaPartyEffect.id + 5);
}
function findTeaPartyHats(effect2) {
  var characters = findTeaPartyHatLength(effect2);
  if (!characters)
    throw new Error("Invalid Mad Tea Party effect ".concat(effect2));
  return import_kolmafia18.Item.all().filter(function(item14) {
    return validTeaPartyHat(item14, characters);
  });
}
function haveTeaPartyHat(effect2) {
  var characters = findTeaPartyHatLength(effect2);
  if (!characters)
    throw new Error("Invalid Mad Tea Party effect ".concat(effect2));
  return import_kolmafia18.Item.all().find(function(item14) {
    return validTeaPartyHat(item14, characters) && have(item14);
  }) !== void 0;
}
function tryTeaPartyBuff(effect2) {
  if (get("_madTeaParty"))
    return !1;
  var characters = findTeaPartyHatLength(effect2);
  if (!characters)
    throw new Error("Invalid Mad Tea Party effect ".concat(effect2));
  if (!haveTeaPartyHat(effect2) || (ensureEffect($effect(_templateObject420 || (_templateObject420 = _taggedTemplateLiteral13(["Down the Rabbit Hole"])))), !have($effect(_templateObject514 || (_templateObject514 = _taggedTemplateLiteral13(["Down the Rabbit Hole"]))))))
    return !1;
  var turns2 = (0, import_kolmafia18.haveEffect)(effect2);
  return (0, import_kolmafia18.cliExecute)("hatter ".concat(characters)), have(effect2) && (0, import_kolmafia18.haveEffect)(effect2) > turns2;
}

// src/resources/2011/ObtuseAngel.ts
var ObtuseAngel_exports = {};
__export(ObtuseAngel_exports, {
  BadlyRomanticArrow: function() {
    return BadlyRomanticArrow;
  },
  canUseBadlyRomanticArrow: function() {
    return canUseBadlyRomanticArrow;
  },
  couldUseBadlyRomanticArrow: function() {
    return couldUseBadlyRomanticArrow;
  },
  getBadlyRomanticArrowMonster: function() {
    return getBadlyRomanticArrowMonster;
  },
  getBadlyRomanticArrowUses: function() {
    return getBadlyRomanticArrowUses;
  },
  have: function() {
    return have8;
  },
  haveBadlyRomanticArrowUsesRemaining: function() {
    return haveBadlyRomanticArrowUsesRemaining;
  },
  prepareBadlyRomanticArrow: function() {
    return prepareBadlyRomanticArrow;
  }
});
init_kolmafia_polyfill();
var import_kolmafia19 = require("kolmafia");

// src/Copier.ts
init_kolmafia_polyfill();
function _defineProperties7(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey8(o.key), o);
  }
}
function _createClass7(e, r, t) {
  return r && _defineProperties7(e.prototype, r), t && _defineProperties7(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _classCallCheck7(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperty7(e, r, t) {
  return (r = _toPropertyKey8(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey8(t) {
  var i = _toPrimitive8(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive8(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var Copier = /* @__PURE__ */ _createClass7(function Copier2(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  _classCallCheck7(this, Copier2), _defineProperty7(this, "couldCopy", void 0), _defineProperty7(this, "prepare", void 0), _defineProperty7(this, "canCopy", void 0), _defineProperty7(this, "copiedMonster", void 0), _defineProperty7(this, "fightCopy", null), this.couldCopy = couldCopy, this.prepare = prepare, this.canCopy = canCopy, this.copiedMonster = copiedMonster, fightCopy && (this.fightCopy = fightCopy);
});

// src/resources/2011/ObtuseAngel.ts
var _templateObject110;
function _taggedTemplateLiteral14(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar4 = $familiar(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral14(["Obtuse Angel"])));
function have8() {
  return have(familiar4);
}
function getBadlyRomanticArrowUses() {
  return Math.max(0, get("_badlyRomanticArrows"));
}
function haveBadlyRomanticArrowUsesRemaining() {
  return getBadlyRomanticArrowUses() === 0;
}
function couldUseBadlyRomanticArrow() {
  return have8() && haveBadlyRomanticArrowUsesRemaining();
}
function prepareBadlyRomanticArrow() {
  return (0, import_kolmafia19.useFamiliar)(familiar4);
}
function canUseBadlyRomanticArrow() {
  return isCurrentFamiliar(familiar4) && haveBadlyRomanticArrowUsesRemaining();
}
function getBadlyRomanticArrowMonster() {
  return get("romanticTarget");
}
var BadlyRomanticArrow = new Copier(function() {
  return couldUseBadlyRomanticArrow();
}, function() {
  return prepareBadlyRomanticArrow();
}, function() {
  return canUseBadlyRomanticArrow();
}, function() {
  return getBadlyRomanticArrowMonster();
});

// src/resources/2012/RainDoh.ts
var RainDoh_exports = {};
__export(RainDoh_exports, {
  getRainDohBlackBoxCopiesMade: function() {
    return getRainDohBlackBoxCopiesMade;
  },
  getRainDohBlackBoxMonster: function() {
    return getRainDohBlackBoxMonster;
  },
  have: function() {
    return have9;
  },
  useRainDohBlackBox: function() {
    return useRainDohBlackBox;
  }
});
init_kolmafia_polyfill();
var import_kolmafia20 = require("kolmafia");
var _templateObject111;
function _taggedTemplateLiteral15(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var box = $item(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral15(["Rain-Doh black box"])));
function have9() {
  return getFoldGroup(box).some(function(item14) {
    return have(item14);
  });
}
function getRainDohBlackBoxCopiesMade() {
  return Math.max(0, get("_raindohCopiesMade"));
}
function getRainDohBlackBoxMonster() {
  return get("rainDohMonster");
}
function useRainDohBlackBox() {
  return (0, import_kolmafia20.use)(box);
}

// src/resources/2012/ReagnimatedGnome.ts
var ReagnimatedGnome_exports = {};
__export(ReagnimatedGnome_exports, {
  bodyParts: function() {
    return bodyParts;
  },
  choosePart: function() {
    return choosePart;
  },
  chosenParts: function() {
    return chosenParts;
  },
  expectedAdvsPerCombat: function() {
    return expectedAdvsPerCombat;
  },
  have: function() {
    return have10;
  }
});
init_kolmafia_polyfill();
var import_kolmafia21 = require("kolmafia");
var _templateObject119, _templateObject228, _templateObject326, _templateObject421, _templateObject515, _templateObject611;
function _taggedTemplateLiteral16(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have10() {
  return have($familiar(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral16(["Reagnimated Gnome"]))));
}
var bodyParts = {
  ears: $item(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral16(["gnomish swimmer's ears"]))),
  lung: $item(_templateObject326 || (_templateObject326 = _taggedTemplateLiteral16(["gnomish coal miner's lung"]))),
  elbow: $item(_templateObject421 || (_templateObject421 = _taggedTemplateLiteral16(["gnomish tennis elbow"]))),
  kgnee: $item(_templateObject515 || (_templateObject515 = _taggedTemplateLiteral16(["gnomish housemaid's kgnee"]))),
  foot: $item(_templateObject611 || (_templateObject611 = _taggedTemplateLiteral16(["gnomish athlete's foot"])))
};
function chosenParts() {
  return Object.values(bodyParts).filter(function(part) {
    return have(part);
  });
}
function choosePart(part) {
  return have10() ? have(bodyParts[part]) ? !0 : ((0, import_kolmafia21.visitUrl)("arena.php"), (0, import_kolmafia21.runChoice)(4), chosenParts().includes(bodyParts[part])) : !1;
}
function expectedAdvsPerCombat(weight) {
  return Math.min(0.01 + weight / 1e3 * 0.99, 1);
}

// src/resources/2013/Florist.ts
var Florist_exports = {};
__export(Florist_exports, {
  AloeGuvnor: function() {
    return AloeGuvnor;
  },
  ArcticMoss: function() {
    return ArcticMoss;
  },
  Artichoker: function() {
    return Artichoker;
  },
  BamBoo: function() {
    return BamBoo;
  },
  BlusteryPuffball: function() {
    return BlusteryPuffball;
  },
  CannedSpinach: function() {
    return CannedSpinach;
  },
  CeleryStalker: function() {
    return CeleryStalker;
  },
  Chillterelle: function() {
    return Chillterelle;
  },
  Crookweed: function() {
    return Crookweed;
  },
  DeadlyCinnamon: function() {
    return DeadlyCinnamon;
  },
  DisLichen: function() {
    return DisLichen;
  },
  Duckweed: function() {
    return Duckweed;
  },
  ElectricEelgrass: function() {
    return ElectricEelgrass;
  },
  FoulToadstool: function() {
    return FoulToadstool;
  },
  HornOfPlenty: function() {
    return HornOfPlenty;
  },
  Impatiens: function() {
    return Impatiens;
  },
  Kelptomaniac: function() {
    return Kelptomaniac;
  },
  LettuceSpray: function() {
    return LettuceSpray;
  },
  LooseMorels: function() {
    return LooseMorels;
  },
  MaxHeadshroom: function() {
    return MaxHeadshroom;
  },
  OrcaOrchid: function() {
    return OrcaOrchid;
  },
  PitcherPlant: function() {
    return PitcherPlant;
  },
  Portlybella: function() {
    return Portlybella;
  },
  RabidDogwood: function() {
    return RabidDogwood;
  },
  RadishRadish: function() {
    return RadishRadish;
  },
  RedFern: function() {
    return RedFern;
  },
  Rutabeggar: function() {
    return Rutabeggar;
  },
  Sargassum: function() {
    return Sargassum;
  },
  SeltzerWatercress: function() {
    return SeltzerWatercress;
  },
  ShuffleTruffle: function() {
    return ShuffleTruffle;
  },
  SkunkCabbage: function() {
    return SkunkCabbage;
  },
  SmokeRa: function() {
    return SmokeRa;
  },
  Snori: function() {
    return Snori;
  },
  Spankton: function() {
    return Spankton;
  },
  SpiderPlant: function() {
    return SpiderPlant;
  },
  StealingMagnolia: function() {
    return StealingMagnolia;
  },
  SubSeaRose: function() {
    return SubSeaRose;
  },
  UpSeaDaisy: function() {
    return UpSeaDaisy;
  },
  WarLily: function() {
    return WarLily;
  },
  WizardsWig: function() {
    return WizardsWig;
  },
  all: function() {
    return all;
  },
  flowersAvailableFor: function() {
    return flowersAvailableFor;
  },
  flowersIn: function() {
    return flowersIn;
  },
  have: function() {
    return have11;
  },
  isFull: function() {
    return isFull;
  }
});
init_kolmafia_polyfill();
var import_kolmafia23 = require("kolmafia");

// src/modifier.ts
init_kolmafia_polyfill();
var import_kolmafia22 = require("kolmafia");

// src/modifierTypes.ts
init_kolmafia_polyfill();
var stringModifiers = ["Class", "Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Effect", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Avatar", "Rollover Effect", "Skill", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie", "Plumber Stat", "Recipe", "Evaluated Modifiers"], stringModifiersSet = new Set(stringModifiers), booleanModifiers = ["Softcore Only", "Single Equip", "Always Fumble", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Randomly", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Alters Page Text", "Attacks Can't Miss", "Pirate", "Blind", "Breakable", "Drops Items", "Drops Meat", "Volleyball or Sombrero", "Extra Pickpocket", "Negative Status Resist"], booleanModifiersSet = new Set(booleanModifiers), numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water", "Spleen Drop", "Potion Drop", "Sauce Spell Damage", "Monster Level Percent", "Food Fairy", "Booze Fairy", "Candy Fairy", "Food Fairy Effectiveness", "Booze Fairy Effectiveness", "Candy Fairy Effectiveness", "Damage Aura", "Sporadic Damage Aura", "Thorns", "Sporadic Thorns", "Stomach Capacity", "Liver Capacity", "Spleen Capacity", "Free Rests", "Leaves", "Elf Warfare Effectiveness", "Pirate Warfare Effectiveness", "MPC Drop", "Piece of Twelve Drop", "Combat Item Damage Percent", "Avoid Attack", "Damage vs. Bugbears", "Damage vs. Werewolves", "Damage vs. Zombies", "Damage vs. Ghosts", "Damage vs. Vampires", "Damage vs. Skeletons", "Damage vs. Undead"], numericModifiersSet = new Set(numericModifiers);

// src/modifier.ts
function _slicedToArray6(r, e) {
  return _arrayWithHoles6(r) || _iterableToArrayLimit6(r, e) || _unsupportedIterableToArray13(r, e) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray13(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray13(r, a) : void 0;
  }
}
function _arrayLikeToArray13(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit6(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles6(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys5(Object(t), !0).forEach(function(r2) {
      _defineProperty8(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty8(e, r, t) {
  return (r = _toPropertyKey9(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey9(t) {
  var i = _toPrimitive9(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive9(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function isBooleanModifier(modifier) {
  return booleanModifiersSet.has(modifier);
}
function isNumericModifier(modifier) {
  return numericModifiersSet.has(modifier);
}
function isStringModifier(modifier) {
  return stringModifiersSet.has(modifier);
}
function get2(name, subject) {
  if (isBooleanModifier(name))
    return subject === void 0 ? (0, import_kolmafia22.booleanModifier)(name) : (0, import_kolmafia22.booleanModifier)(subject, name);
  if (isNumericModifier(name))
    return subject === void 0 ? (0, import_kolmafia22.numericModifier)(name) : (0, import_kolmafia22.numericModifier)(subject, name);
  if (isStringModifier(name))
    return subject === void 0 ? (0, import_kolmafia22.stringModifier)(name) : (0, import_kolmafia22.stringModifier)(subject, name);
}
function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = _objectSpread5(_objectSpread5({}, modifiers1), modifiers2);
  for (var modifier in modifiers1)
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (isNumericModifier(modifier)) {
        var _modifiers1$modifier, _modifiers2$modifier;
        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }
      if (isBooleanModifier(modifier)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;
        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : !1) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : !1);
      }
    }
  return returnValue;
}
function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++)
    modifierss[_key] = arguments[_key];
  return modifierss.reduce(function(a, b) {
    return pairwiseMerge(a, b);
  }, {});
}
function getTotalModifier(modifier) {
  for (var _len2 = arguments.length, subjects = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
    subjects[_key2 - 1] = arguments[_key2];
  return sum(subjects, function(subject) {
    return get2(modifier, subject);
  });
}
function parseModifiers(pref) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$numeric = _ref.numeric, numeric = _ref$numeric === void 0 ? Number : _ref$numeric, _ref$str = _ref.str, str = _ref$str === void 0 ? String : _ref$str, _ref$bool = _ref.bool, bool = _ref$bool === void 0 ? function(val) {
    return val === "true";
  } : _ref$bool;
  return Object.entries((0, import_kolmafia22.splitModifiers)((0, import_kolmafia22.getProperty)(pref))).reduce(function(acc, _ref2) {
    var _ref3 = _slicedToArray6(_ref2, 2), key = _ref3[0], value = _ref3[1];
    return _objectSpread5(_objectSpread5({}, acc), {}, _defineProperty8({}, key, isBooleanModifier(key) ? bool(value) : isNumericModifier(key) ? numeric(value) : str(value)));
  }, {});
}

// src/resources/2013/Florist.ts
function _toConsumableArray11(r) {
  return _arrayWithoutHoles11(r) || _iterableToArray11(r) || _unsupportedIterableToArray14(r) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray14(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray14(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray14(r, a) : void 0;
  }
}
function _iterableToArray11(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles11(r) {
  if (Array.isArray(r)) return _arrayLikeToArray14(r);
}
function _arrayLikeToArray14(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck8(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties8(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey10(o.key), o);
  }
}
function _createClass8(e, r, t) {
  return r && _defineProperties8(e.prototype, r), t && _defineProperties8(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty9(e, r, t) {
  return (r = _toPropertyKey10(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey10(t) {
  var i = _toPrimitive10(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive10(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var Flower = /* @__PURE__ */ function() {
  function Flower2(name, id, environment, modifier) {
    var territorial = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    _classCallCheck8(this, Flower2), _defineProperty9(this, "name", void 0), _defineProperty9(this, "id", void 0), _defineProperty9(this, "environment", void 0), _defineProperty9(this, "modifier", void 0), _defineProperty9(this, "territorial", void 0), this.name = name, this.id = id, this.environment = environment, this.modifier = modifier, this.territorial = territorial;
  }
  return _createClass8(Flower2, [{
    key: "isPlantedHere",
    value: function() {
      var _get2, _Flower$plantNamesInZ, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get2 = get("lastAdventure")) !== null && _get2 !== void 0 ? _get2 : $location.none, plantedHere = (_Flower$plantNamesInZ = Flower2.plantNamesInZone(location)) === null || _Flower$plantNamesInZ === void 0 ? void 0 : _Flower$plantNamesInZ.includes(this.name);
      return plantedHere !== void 0 && plantedHere;
    }
  }, {
    key: "available",
    value: function() {
      var _get2, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get2 = get("lastAdventure")) !== null && _get2 !== void 0 ? _get2 : $location.none;
      return this.environment === location.environment && !get("_floristPlantsUsed").includes(this.name) && !this.isPlantedHere(location);
    }
  }, {
    key: "dig",
    value: function() {
      if (!this.isPlantedHere()) return !1;
      var flowers = Flower2.plantNamesInZone();
      if (!flowers[2]) return !1;
      var plantNumber = flowers.indexOf(this.name);
      return Flower2.visit(), (0, import_kolmafia23.runChoice)(2, "plnti=".concat(plantNumber)), !this.isPlantedHere();
    }
  }, {
    key: "plant",
    value: function() {
      return this.isPlantedHere() ? !0 : isFull() ? !1 : (Flower2.visit(), (0, import_kolmafia23.runChoice)(1, "plant=".concat(this.id)), this.isPlantedHere());
    }
  }], [{
    key: "visit",
    value: function() {
      (0, import_kolmafia23.visitUrl)("place.php?whichplace=forestvillage&action=fv_friar");
    }
  }, {
    key: "plantNamesInZone",
    value: function() {
      var _get3, _getFloristPlants$loc, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get3 = get("lastAdventure")) !== null && _get3 !== void 0 ? _get3 : $location.none;
      return (_getFloristPlants$loc = (0, import_kolmafia23.getFloristPlants)()[location.toString()]) !== null && _getFloristPlants$loc !== void 0 ? _getFloristPlants$loc : [];
    }
  }, {
    key: "plantsInZone",
    value: function() {
      var _get4, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get4 = get("lastAdventure")) !== null && _get4 !== void 0 ? _get4 : $location.none;
      return this.plantNamesInZone(location).map(function(flowerName) {
        return toFlower(flowerName);
      }).filter(notNull);
    }
  }, {
    key: "modifiersInZone",
    value: function() {
      var _get5, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get5 = get("lastAdventure")) !== null && _get5 !== void 0 ? _get5 : $location.none, plants = this.plantsInZone(location);
      if (!plants) return {};
      var modifiers = plants.map(function(plant) {
        return plant.modifier;
      }).map(function(modifier) {
        return typeof modifier == "string" ? {} : modifier;
      });
      return mergeModifiers.apply(void 0, _toConsumableArray11(modifiers));
    }
  }]);
}();
function have11() {
  return (0, import_kolmafia23.floristAvailable)();
}
function toFlower(name) {
  var _all$find;
  return (_all$find = all.find(function(flower) {
    return name === flower.name;
  })) !== null && _all$find !== void 0 ? _all$find : null;
}
function flowersIn(location) {
  var returnValue = [];
  return Flower.plantNamesInZone(location).map(toFlower).forEach(function(flower) {
    flower && returnValue.push(flower);
  }), returnValue;
}
function flowersAvailableFor() {
  var _get6, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get6 = get("lastAdventure")) !== null && _get6 !== void 0 ? _get6 : $location.none;
  return all.filter(function(flower) {
    return flower.available(location);
  });
}
function isFull() {
  var _get7, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (_get7 = get("lastAdventure")) !== null && _get7 !== void 0 ? _get7 : $location.none;
  return flowersIn(location).length === 3;
}
var RabidDogwood = new Flower("Rabid Dogwood", 1, "outdoor", {
  "Monster Level": 30
}, !0), Rutabeggar = new Flower("Rutabeggar", 2, "outdoor", {
  "Item Drop": 25
}, !0), RadishRadish = new Flower("Rad-ish Radish", 3, "outdoor", {
  "Moxie Experience": 5
}, !0), Artichoker = new Flower("Artichoker", 4, "outdoor", "Delevels Enemy"), SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks Attacks"), SkunkCabbage = new Flower("Skunk Cabbage", 6, "outdoor", {
  "Stench Damage": 12.5
}), DeadlyCinnamon = new Flower("Deadly Cinnamon", 7, "outdoor", {
  "Hot Damage": 12.5
}), CeleryStalker = new Flower("Celery Stalker", 8, "outdoor", {
  "Spooky Damage": 12.5
}), LettuceSpray = new Flower("Lettus Spray", 9, "outdoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 29
}), SeltzerWatercress = new Flower("Seltzer Watercress", 10, "outdoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), WarLily = new Flower("War Lily", 11, "indoor", {
  "Monster Level": 30
}, !0), StealingMagnolia = new Flower("Stealing Magnolia", 12, "indoor", {
  "Item Drop": 25
}, !0), CannedSpinach = new Flower("Canned Spinach", 13, "indoor", {
  "Muscle Experience": 5
}, !0), Impatiens = new Flower("Impatiens", 14, "indoor", {
  Initiative: 25
}), SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison"), RedFern = new Flower("Red Fern", 16, "indoor", "Delevels Enemy"), BamBoo = new Flower("BamBOO!", 17, "indoor", {
  "Spooky Damage": 12.5
}), ArcticMoss = new Flower("Arctic Moss", 18, "indoor", {
  "Cold Damage": 12.5
}), AloeGuvnor = new Flower("Aloe Guv'nor", 19, "indoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
}), PitcherPlant = new Flower("Pitcher Plant", 20, "indoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), BlusteryPuffball = new Flower("Blustery Puffball", 21, "underground", {
  "Monster Level": 30
}, !0), HornOfPlenty = new Flower("Horn of Plenty", 22, "underground", {
  "Item Drop": 25
}, !0), WizardsWig = new Flower("Wizard's Wig", 23, "underground", {
  "Mysticality Experience": 5
}, !0), ShuffleTruffle = new Flower("Shuffle Truffle", 24, "underground", {
  Initiative: 25
}), DisLichen = new Flower("Dis Lichen", 25, "underground", "Delevels Enemy"), LooseMorels = new Flower("Loose Morels", 26, "underground", {
  "Sleaze Damage": 12.5
}), FoulToadstool = new Flower("Foul Toadstool", 27, "underground", {
  "Stench Damage": 12.5
}), Chillterelle = new Flower("Chillterelle", 28, "underground", {
  "Cold Damage": 12.5
}), Portlybella = new Flower("Portlybella", 29, "underground", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
}), MaxHeadshroom = new Flower("Max Headshroom", 30, "underground", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), Spankton = new Flower("Spankton", 31, "underwater", "Delevels Enemy", !0), Kelptomaniac = new Flower("Kelptomaniac", 32, "underwater", {
  "Item Drop": 40
}, !0), Crookweed = new Flower("Crookweed", 33, "underwater", {
  "Meat Drop": 60
}, !0), ElectricEelgrass = new Flower("Electric Eelgrass", 34, "underwater", "Blocks Attacks"), Duckweed = new Flower("Duckweed", 35, "underwater", "Blocks Attacks"), OrcaOrchid = new Flower("Orca Orchid", 36, "underwater", {
  "Weapon Damage": 12.5
}), Sargassum = new Flower("Sargassum", 37, "underwater", {
  "Stench Damage": 12.5
}), SubSeaRose = new Flower("Sub-Sea Rose", 38, "underwater", {
  "Cold Damage": 12.5
}), Snori = new Flower("Snori", 39, "underwater", {
  "HP Regen Min": 20,
  "HP Regen Max": 30,
  "MP Regen Min": 10,
  "MP Regen Max": 20
}), UpSeaDaisy = new Flower("Up Sea Daisy", 40, "underwater", {
  Experience: 30
}), all = Object.freeze([RabidDogwood, Rutabeggar, RadishRadish, Artichoker, SmokeRa, SkunkCabbage, DeadlyCinnamon, CeleryStalker, LettuceSpray, SeltzerWatercress, WarLily, StealingMagnolia, CannedSpinach, Impatiens, SpiderPlant, RedFern, BamBoo, ArcticMoss, AloeGuvnor, PitcherPlant, BlusteryPuffball, HornOfPlenty, WizardsWig, ShuffleTruffle, DisLichen, LooseMorels, FoulToadstool, Chillterelle, Portlybella, MaxHeadshroom, Spankton, Kelptomaniac, Crookweed, ElectricEelgrass, Duckweed, OrcaOrchid, Sargassum, SubSeaRose, Snori, UpSeaDaisy]);

// src/resources/2013/JungMan.ts
var JungMan_exports = {};
__export(JungMan_exports, {
  JAR_ITEMS: function() {
    return JAR_ITEMS;
  },
  Jar: function() {
    return Jar;
  },
  canJickJar: function() {
    return canJickJar;
  },
  have: function() {
    return have12;
  },
  makeJar: function() {
    return makeJar;
  }
});
init_kolmafia_polyfill();
var import_kolmafia24 = require("kolmafia");
var _templateObject120, _templateObject229, _templateObject327, _templateObject426, _templateObject516, _templateObject613, _templateObject710, _templateObject810;
function _slicedToArray7(r, e) {
  return _arrayWithHoles7(r) || _iterableToArrayLimit7(r, e) || _unsupportedIterableToArray15(r, e) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray15(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray15(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray15(r, a) : void 0;
  }
}
function _arrayLikeToArray15(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit7(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles7(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty10(e, r, t) {
  return (r = _toPropertyKey11(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey11(t) {
  var i = _toPrimitive11(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive11(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _taggedTemplateLiteral17(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar5 = $familiar(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral17(["Angry Jung Man"])));
function have12() {
  return (0, import_kolmafia24.haveFamiliar)(familiar5);
}
var Jar = /* @__PURE__ */ function(Jar2) {
  return Jar2.SUSPICIOUS_GUY = "susguy", Jar2.GOURD_CAPTAIN = "gourdcaptain", Jar2.CRACKPOT_MYSTIC = "mystic", Jar2.OLD_MAN = "oldman", Jar2.PRETENTIOUS_ARTIST = "artist", Jar2.MEATSMITH = "meatsmith", Jar2.JICK = "jick", Jar2;
}({}), PLACES = _defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10({}, Jar.PRETENTIOUS_ARTIST, ["place", "town_wrong"]), Jar.GOURD_CAPTAIN, ["place", "town_right"]), Jar.CRACKPOT_MYSTIC, ["shop", "mystic"]), Jar.OLD_MAN, ["place", "sea_oldman"]), Jar.MEATSMITH, ["shop", "meatsmith"]), Jar.JICK, ["showplayer", "1"]), Jar.SUSPICIOUS_GUY, ["tavern"]), JAR_ITEMS = _defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10(_defineProperty10({}, Jar.SUSPICIOUS_GUY, $item(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral17(["jar of psychoses (The Suspicious-Looking Guy)"])))), Jar.GOURD_CAPTAIN, $item(_templateObject327 || (_templateObject327 = _taggedTemplateLiteral17(["jar of psychoses (The Captain of the Gourd)"])))), Jar.CRACKPOT_MYSTIC, $item(_templateObject426 || (_templateObject426 = _taggedTemplateLiteral17(["jar of psychoses (The Crackpot Mystic)"])))), Jar.OLD_MAN, $item(_templateObject516 || (_templateObject516 = _taggedTemplateLiteral17(["jar of psychoses (The Old Man)"])))), Jar.PRETENTIOUS_ARTIST, $item(_templateObject613 || (_templateObject613 = _taggedTemplateLiteral17(["jar of psychoses (The Pretentious Artist)"])))), Jar.MEATSMITH, $item(_templateObject710 || (_templateObject710 = _taggedTemplateLiteral17(["jar of psychoses (The Meatsmith)"])))), Jar.JICK, $item(_templateObject810 || (_templateObject810 = _taggedTemplateLiteral17(["jar of psychoses (Jick)"]))));
function getJungUrl(jar) {
  var _PLACES$jar = _slicedToArray7(PLACES[jar], 2), page = _PLACES$jar[0], answer = _PLACES$jar[1], question = page === "showplayer" ? "who" : "which".concat(page), params = [["action", "jung"], ["whichperson", jar]];
  return answer && params.push([question, answer]), "".concat(page, ".php?").concat(params.map(function(pair) {
    return pair.join("=");
  }).join("&"));
}
function canJickJar() {
  return get("_jickJarAvailable") === "unknown" && (0, import_kolmafia24.visitUrl)("showplayer.php?who=1"), get("_jickJarAvailable") === "true" && !get("_psychoJarFilled");
}
function makeJar(jar) {
  if (jar === Jar.JICK && !canJickJar()) return !1;
  var result = (0, import_kolmafia24.visitUrl)(getJungUrl(jar));
  return result.includes("You open up the jar and look into the patient's eyes.");
}

// src/resources/2014/ConspiracyIsland.ts
var ConspiracyIsland_exports = {};
__export(ConspiracyIsland_exports, {
  QUESTS: function() {
    return QUESTS;
  },
  activateOmega: function() {
    return activateOmega;
  },
  activateProtocol: function() {
    return activateProtocol;
  },
  completedOneTimeQuests: function() {
    return completedOneTimeQuests;
  },
  getOmega: function() {
    return getOmega;
  },
  getQuest: function() {
    return getQuest;
  },
  turnInQuest: function() {
    return turnInQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia25 = require("kolmafia");
var _templateObject121, _templateObject230, _templateObject328, _templateObject427, _templateObject517, _templateObject614, _templateObject711, _templateObject811, _templateObject910, _templateObject1010, _templateObject1110;
function _taggedTemplateLiteral18(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _classCallCheck9(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties9(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey12(o.key), o);
  }
}
function _createClass9(e, r, t) {
  return r && _defineProperties9(e.prototype, r), t && _defineProperties9(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty11(e, r, t) {
  return (r = _toPropertyKey12(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey12(t) {
  var i = _toPrimitive12(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive12(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var ConspiracyQuest = /* @__PURE__ */ function() {
  function ConspiracyQuest2(prop, reward, complete, location, requirements) {
    _classCallCheck9(this, ConspiracyQuest2), _defineProperty11(this, "prop", void 0), _defineProperty11(this, "reward", void 0), _defineProperty11(this, "complete", void 0), _defineProperty11(this, "location", void 0), _defineProperty11(this, "requirements", void 0), this.prop = prop, this.reward = reward, this.complete = complete, this.location = location, this.requirements = requirements != null ? requirements : new Requirement([], {});
  }
  return _createClass9(ConspiracyQuest2, [{
    key: "isOneTime",
    value: function() {
      return this.reward !== 30;
    }
  }, {
    key: "isStarted",
    value: function() {
      return questStep(this.prop) >= 0;
    }
  }, {
    key: "isFinished",
    value: function() {
      return questStep(this.prop) === 999;
    }
  }, {
    key: "isActive",
    value: function() {
      return this.isStarted() && !this.isFinished();
    }
  }, {
    key: "isReadyToTurnIn",
    value: function() {
      return questStep(this.prop) === this.complete;
    }
  }]);
}(), QUESTS = [new ConspiracyQuest("questESpClipper", 20, 1, $location(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral18(["The Mansion of Dr. Weirdeaux"])))), new ConspiracyQuest("questESpEVE", 30, 1, $location(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral18(["The Secret Government Laboratory"])))), new ConspiracyQuest("questESpFakeMedium", 30, 1, $location(_templateObject328 || (_templateObject328 = _taggedTemplateLiteral18(["The Secret Government Laboratory"])))), new ConspiracyQuest("questESpGore", 20, 2, $location(_templateObject427 || (_templateObject427 = _taggedTemplateLiteral18(["The Secret Government Laboratory"]))), new Requirement(["Meat Drop"], {
  forceEquip: [$item(_templateObject517 || (_templateObject517 = _taggedTemplateLiteral18(["gore bucket"])))]
})), new ConspiracyQuest("questESpJunglePun", 20, 2, $location(_templateObject614 || (_templateObject614 = _taggedTemplateLiteral18(["The Deep Dark Jungle"]))), new Requirement(["Mysticality"], {
  forceEquip: [$item(_templateObject711 || (_templateObject711 = _taggedTemplateLiteral18(["encrypted micro-cassette recorder"])))]
})), new ConspiracyQuest("questESpOutOfOrder", 30, 2, $location(_templateObject811 || (_templateObject811 = _taggedTemplateLiteral18(["The Deep Dark Jungle"]))), new Requirement(["Initiative"], {
  forceEquip: [$item(_templateObject910 || (_templateObject910 = _taggedTemplateLiteral18(["GPS-tracking wristwatch"])))]
})), new ConspiracyQuest("questESpSerum", 30, 1, $location(_templateObject1010 || (_templateObject1010 = _taggedTemplateLiteral18(["The Mansion of Dr. Weirdeaux"])))), new ConspiracyQuest("questESpSmokes", 30, 1, $location(_templateObject1110 || (_templateObject1110 = _taggedTemplateLiteral18(["The Deep Dark Jungle"]))))];
function completedOneTimeQuests() {
  return QUESTS.filter(function(q) {
    return q.isOneTime();
  }).every(function(q) {
    return q.isFinished();
  });
}
function activateProtocol(protocol) {
  (0, import_kolmafia25.visitUrl)("place.php?whichplace=airport_spooky_bunker&action=si_controlpanel"), (0, import_kolmafia25.runChoice)(protocol);
}
function getOmega() {
  return get("controlPanelOmega");
}
function activateOmega() {
  var completeAllQuests = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
  if (!get("_controlPanelUsed")) {
    for (var i = 1; i <= 9; i++) {
      var active = get("controlPanel".concat(i), !1);
      if (!active) {
        activateProtocol(i);
        break;
      }
    }
    getOmega() < 99 || !completedOneTimeQuests() && completeAllQuests || (activateProtocol(1), activateProtocol(10));
  }
}
function visitRadio() {
  return (0, import_kolmafia25.visitUrl)("place.php?whichplace=airport_spooky&action=airport2_radio");
}
function getQuest() {
  var accept = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, active = QUESTS.find(function(q) {
    return q.isActive();
  });
  if (active) return active;
  if (!accept) return null;
  for (var _loop = function() {
    var _QUESTS$find, page = visitRadio();
    if (!(0, import_kolmafia25.handlingChoice)()) return {
      v: null
    };
    if (page.includes("try again tomorrow")) return {
      v: null
    };
    var quest = get("_questESp");
    if (quest !== "") return {
      v: (_QUESTS$find = QUESTS.find(function(q) {
        return q.prop === quest;
      })) !== null && _QUESTS$find !== void 0 ? _QUESTS$find : null
    };
  }, _ret, i = 0; i < 11; i++)
    if (_ret = _loop(), _ret) return _ret.v;
  return null;
}
function turnInQuest() {
  var quest = getQuest();
  return quest != null && quest.isReadyToTurnIn() ? (visitRadio(), (0, import_kolmafia25.runChoice)(1), quest.isFinished()) : !1;
}

// src/resources/2014/CrimboShrub.ts
var CrimboShrub_exports = {};
__export(CrimboShrub_exports, {
  decorate: function() {
    return decorate;
  },
  have: function() {
    return have13;
  }
});
init_kolmafia_polyfill();
var import_kolmafia26 = require("kolmafia");
var _templateObject128, _templateObject231, _templateObject329, _templateObject428;
function _taggedTemplateLiteral19(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have13() {
  return have($familiar(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral19(["Crimbo Shrub"]))));
}
var Toppers = {
  Muscle: 1,
  Mysticality: 2,
  Moxie: 3
}, Lights = {
  "Prismatic Damage": 1,
  "Hot Damage": 2,
  "Cold Damage": 3,
  "Stench Damage": 4,
  "Spooky Damage": 5,
  "Sleaze Damage": 6
}, Garland = {
  "HP Regen": 1,
  "PvP Fights": 2,
  Blocking: 3
}, Gifts = {
  "Yellow Ray": 1,
  "Red Ray": 2,
  Gifts: 3
}, Prefs = {
  Muscle: "Muscle",
  Mysticality: "Mysticality",
  Moxie: "Moxie",
  Prismatic: "Prismatic Damage",
  Hot: "Hot Damage",
  Cold: "Cold Damage",
  Stench: "Stench Damage",
  Spooky: "Spooky Damage",
  Sleaze: "Sleaze Damage",
  HP: "HP Regen",
  PvP: "PvP Fights",
  blocking: "Blocking",
  yellow: "Yellow Ray",
  meat: "Red Ray",
  gifts: "Gifts"
};
function isDecoratedWith(topper, lights, garland, gifts) {
  var decorations = [get("shrubTopper"), get("shrubLights"), get("shrubGarland"), get("shrubGifts")].map(function(x) {
    return Prefs[x];
  });
  return [topper, lights, garland, gifts].every(function(x, i) {
    return x === decorations[i];
  });
}
function decorate(topper, lights, garland, gifts) {
  return have13() ? (get("_shrubDecorated") || (have($item(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral19(["box of old Crimbo decorations"])))) || (0, import_kolmafia26.useFamiliar)($familiar(_templateObject329 || (_templateObject329 = _taggedTemplateLiteral19(["Crimbo Shrub"])))), directlyUse($item(_templateObject428 || (_templateObject428 = _taggedTemplateLiteral19(["box of old Crimbo decorations"])))), (0, import_kolmafia26.visitUrl)("choice.php?whichchoice=999&pwd=&option=1&topper=".concat(Toppers[topper], "&lights=").concat(Lights[lights], "&garland=").concat(Garland[garland], "&gift=").concat(Gifts[gifts]))), isDecoratedWith(topper, lights, garland, gifts)) : !1;
}

// src/resources/2014/DNALab.ts
var DNALab_exports = {};
__export(DNALab_exports, {
  getEffect: function() {
    return getEffect2;
  },
  getTonic: function() {
    return getTonic;
  },
  have: function() {
    return have14;
  },
  hybridize: function() {
    return hybridize;
  },
  installed: function() {
    return installed2;
  },
  isHybridized: function() {
    return isHybridized;
  },
  makeTonic: function() {
    return makeTonic;
  },
  phylumFor: function() {
    return phylumFor;
  },
  tonicsLeft: function() {
    return tonicsLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia27 = require("kolmafia");
var _templateObject129, _templateObject237, _templateObject330, _templateObject429, _templateObject518, _templateObject615, _templateObject712, _templateObject812, _templateObject911, _templateObject1011, _templateObject1111, _templateObject1210, _templateObject138, _templateObject147, _templateObject157, _templateObject167, _templateObject177, _templateObject187, _templateObject197, _templateObject207, _templateObject2111, _templateObject2210, _templateObject238, _templateObject247, _templateObject257, _templateObject266, _templateObject276, _templateObject286, _templateObject296, _templateObject306, _templateObject3111, _templateObject3210, _templateObject336, _templateObject346, _templateObject356, _templateObject366, _templateObject376, _templateObject386, _templateObject396, _templateObject406, _templateObject4111, _templateObject4210, _templateObject436, _templateObject446, _templateObject455, _templateObject464, _templateObject474, _templateObject484, _templateObject494, _templateObject503, _templateObject519, _templateObject523, _templateObject533, _templateObject543, _templateObject553, _templateObject563, _templateObject573, _templateObject583, _templateObject593, _templateObject603, _templateObject616, _templateObject623, _templateObject633, _templateObject643, _templateObject653, _templateObject663, _templateObject673, _templateObject683, _templateObject693, _templateObject703, _templateObject713, _templateObject723, _templateObject733, _templateObject743, _templateObject753, _templateObject763, _templateObject773, _templateObject783, _templateObject792, _templateObject802, _templateObject813, _templateObject823, _templateObject833, _templateObject843, _templateObject853;
function _slicedToArray8(r, e) {
  return _arrayWithHoles8(r) || _iterableToArrayLimit8(r, e) || _unsupportedIterableToArray16(r, e) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray16(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray16(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray16(r, a) : void 0;
  }
}
function _arrayLikeToArray16(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit8(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles8(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral20(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var lab = $item(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral20(["Little Geneticist DNA-Splicing Lab"])));
function have14() {
  return have(lab) || (0, import_kolmafia27.getWorkshed)() === lab;
}
function installed2() {
  return (0, import_kolmafia27.getWorkshed)() === lab;
}
var phylaEffects = /* @__PURE__ */ new Map([[$phylum(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral20(["beast"]))), $effect(_templateObject330 || (_templateObject330 = _taggedTemplateLiteral20(["Human-Beast Hybrid"])))], [$phylum(_templateObject429 || (_templateObject429 = _taggedTemplateLiteral20(["bug"]))), $effect(_templateObject518 || (_templateObject518 = _taggedTemplateLiteral20(["Human-Insect Hybrid"])))], [$phylum(_templateObject615 || (_templateObject615 = _taggedTemplateLiteral20(["constellation"]))), $effect(_templateObject712 || (_templateObject712 = _taggedTemplateLiteral20(["Human-Constellation Hybrid"])))], [$phylum(_templateObject812 || (_templateObject812 = _taggedTemplateLiteral20(["construct"]))), $effect(_templateObject911 || (_templateObject911 = _taggedTemplateLiteral20(["Human-Machine Hybrid"])))], [$phylum(_templateObject1011 || (_templateObject1011 = _taggedTemplateLiteral20(["demon"]))), $effect(_templateObject1111 || (_templateObject1111 = _taggedTemplateLiteral20(["Human-Demon Hybrid"])))], [$phylum(_templateObject1210 || (_templateObject1210 = _taggedTemplateLiteral20(["dude"]))), $effect(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral20(["Human-Human Hybrid"])))], [$phylum(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral20(["elemental"]))), $effect(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral20(["Human-Elemental Hybrid"])))], [$phylum(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral20(["elf"]))), $effect(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral20(["Human-Elf Hybrid"])))], [$phylum(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral20(["fish"]))), $effect(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral20(["Human-Fish Hybrid"])))], [$phylum(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral20(["goblin"]))), $effect(_templateObject2111 || (_templateObject2111 = _taggedTemplateLiteral20(["Human-Goblin Hybrid"])))], [$phylum(_templateObject2210 || (_templateObject2210 = _taggedTemplateLiteral20(["hippy"]))), $effect(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral20(["Human-Hobo Hybrid"])))], [$phylum(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral20(["horror"]))), $effect(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral20(["Human-Horror Hybrid"])))], [$phylum(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral20(["humanoid"]))), $effect(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral20(["Human-Humanoid Hybrid"])))], [$phylum(_templateObject286 || (_templateObject286 = _taggedTemplateLiteral20(["mer-kin"]))), $effect(_templateObject296 || (_templateObject296 = _taggedTemplateLiteral20(["Human-Mer-kin Hybrid"])))], [$phylum(_templateObject306 || (_templateObject306 = _taggedTemplateLiteral20(["orc"]))), $effect(_templateObject3111 || (_templateObject3111 = _taggedTemplateLiteral20(["Human-Orc Hybrid"])))], [$phylum(_templateObject3210 || (_templateObject3210 = _taggedTemplateLiteral20(["penguin"]))), $effect(_templateObject336 || (_templateObject336 = _taggedTemplateLiteral20(["Human-Penguin Hybrid"])))], [$phylum(_templateObject346 || (_templateObject346 = _taggedTemplateLiteral20(["pirate"]))), $effect(_templateObject356 || (_templateObject356 = _taggedTemplateLiteral20(["Human-Pirate Hybrid"])))], [$phylum(_templateObject366 || (_templateObject366 = _taggedTemplateLiteral20(["plant"]))), $effect(_templateObject376 || (_templateObject376 = _taggedTemplateLiteral20(["Human-Plant Hybrid"])))], [$phylum(_templateObject386 || (_templateObject386 = _taggedTemplateLiteral20(["slime"]))), $effect(_templateObject396 || (_templateObject396 = _taggedTemplateLiteral20(["Human-Slime Hybrid"])))], [$phylum(_templateObject406 || (_templateObject406 = _taggedTemplateLiteral20(["undead"]))), $effect(_templateObject4111 || (_templateObject4111 = _taggedTemplateLiteral20(["Human-Undead Hybrid"])))], [$phylum(_templateObject4210 || (_templateObject4210 = _taggedTemplateLiteral20(["weird"]))), $effect(_templateObject436 || (_templateObject436 = _taggedTemplateLiteral20(["Human-Weird Thing Hybrid"])))]]), phylaTonics = /* @__PURE__ */ new Map([[$phylum(_templateObject446 || (_templateObject446 = _taggedTemplateLiteral20(["beast"]))), $item(_templateObject455 || (_templateObject455 = _taggedTemplateLiteral20(["Gene Tonic: Beast"])))], [$phylum(_templateObject464 || (_templateObject464 = _taggedTemplateLiteral20(["bug"]))), $item(_templateObject474 || (_templateObject474 = _taggedTemplateLiteral20(["Gene Tonic: Insect"])))], [$phylum(_templateObject484 || (_templateObject484 = _taggedTemplateLiteral20(["constellation"]))), $item(_templateObject494 || (_templateObject494 = _taggedTemplateLiteral20(["Gene Tonic: Constellation"])))], [$phylum(_templateObject503 || (_templateObject503 = _taggedTemplateLiteral20(["construct"]))), $item(_templateObject519 || (_templateObject519 = _taggedTemplateLiteral20(["Gene Tonic: Construct"])))], [$phylum(_templateObject523 || (_templateObject523 = _taggedTemplateLiteral20(["demon"]))), $item(_templateObject533 || (_templateObject533 = _taggedTemplateLiteral20(["Gene Tonic: Demon"])))], [$phylum(_templateObject543 || (_templateObject543 = _taggedTemplateLiteral20(["dude"]))), $item(_templateObject553 || (_templateObject553 = _taggedTemplateLiteral20(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject563 || (_templateObject563 = _taggedTemplateLiteral20(["elemental"]))), $item(_templateObject573 || (_templateObject573 = _taggedTemplateLiteral20(["Gene Tonic: Elemental"])))], [$phylum(_templateObject583 || (_templateObject583 = _taggedTemplateLiteral20(["elf"]))), $item(_templateObject593 || (_templateObject593 = _taggedTemplateLiteral20(["Gene Tonic: Elf"])))], [$phylum(_templateObject603 || (_templateObject603 = _taggedTemplateLiteral20(["fish"]))), $item(_templateObject616 || (_templateObject616 = _taggedTemplateLiteral20(["Gene Tonic: Fish"])))], [$phylum(_templateObject623 || (_templateObject623 = _taggedTemplateLiteral20(["goblin"]))), $item(_templateObject633 || (_templateObject633 = _taggedTemplateLiteral20(["Gene Tonic: Goblin"])))], [$phylum(_templateObject643 || (_templateObject643 = _taggedTemplateLiteral20(["hippy"]))), $item(_templateObject653 || (_templateObject653 = _taggedTemplateLiteral20(["Gene Tonic: Hobo"])))], [$phylum(_templateObject663 || (_templateObject663 = _taggedTemplateLiteral20(["horror"]))), $item(_templateObject673 || (_templateObject673 = _taggedTemplateLiteral20(["Gene Tonic: Horror"])))], [$phylum(_templateObject683 || (_templateObject683 = _taggedTemplateLiteral20(["humanoid"]))), $item(_templateObject693 || (_templateObject693 = _taggedTemplateLiteral20(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject703 || (_templateObject703 = _taggedTemplateLiteral20(["mer-kin"]))), $item(_templateObject713 || (_templateObject713 = _taggedTemplateLiteral20(["Gene Tonic: Mer-kin"])))], [$phylum(_templateObject723 || (_templateObject723 = _taggedTemplateLiteral20(["orc"]))), $item(_templateObject733 || (_templateObject733 = _taggedTemplateLiteral20(["Gene Tonic: Orc"])))], [$phylum(_templateObject743 || (_templateObject743 = _taggedTemplateLiteral20(["penguin"]))), $item(_templateObject753 || (_templateObject753 = _taggedTemplateLiteral20(["Gene Tonic: Penguin"])))], [$phylum(_templateObject763 || (_templateObject763 = _taggedTemplateLiteral20(["pirate"]))), $item(_templateObject773 || (_templateObject773 = _taggedTemplateLiteral20(["Gene Tonic: Pirate"])))], [$phylum(_templateObject783 || (_templateObject783 = _taggedTemplateLiteral20(["plant"]))), $item(_templateObject792 || (_templateObject792 = _taggedTemplateLiteral20(["Gene Tonic: Plant"])))], [$phylum(_templateObject802 || (_templateObject802 = _taggedTemplateLiteral20(["slime"]))), $item(_templateObject813 || (_templateObject813 = _taggedTemplateLiteral20(["Gene Tonic: Slime"])))], [$phylum(_templateObject823 || (_templateObject823 = _taggedTemplateLiteral20(["undead"]))), $item(_templateObject833 || (_templateObject833 = _taggedTemplateLiteral20(["Gene Tonic: Undead"])))], [$phylum(_templateObject843 || (_templateObject843 = _taggedTemplateLiteral20(["weird"]))), $item(_templateObject853 || (_templateObject853 = _taggedTemplateLiteral20(["Gene Tonic: Weird"])))]]), tonicEffects = Array.from(phylaEffects.values());
function isHybridized(tonic) {
  if (!tonic) return installed2() && get("_dnaHybrid");
  var tonicEffect = tonic instanceof import_kolmafia27.Effect ? tonic : tonic instanceof import_kolmafia27.Phylum ? getEffect2(tonic) : (0, import_kolmafia27.toEffect)(get2("Effect", tonic));
  return tonicEffects.includes(tonicEffect) && (0, import_kolmafia27.haveEffect)(tonicEffect) === 2147483647;
}
function getTonic(phylum) {
  var _phylaTonics$get;
  return (_phylaTonics$get = phylaTonics.get(phylum)) !== null && _phylaTonics$get !== void 0 ? _phylaTonics$get : $item.none;
}
function getEffect2(phylum) {
  var _phylaEffects$get;
  return (_phylaEffects$get = phylaEffects.get(phylum)) !== null && _phylaEffects$get !== void 0 ? _phylaEffects$get : $effect.none;
}
function phylumFor(dnatype) {
  if (dnatype instanceof import_kolmafia27.Effect) {
    var phylumPair = Array.from(phylaEffects.entries()).find(function(_ref) {
      var _ref2 = _slicedToArray8(_ref, 2), effect2 = _ref2[1];
      return effect2 === dnatype;
    });
    return phylumPair ? phylumPair[0] : null;
  } else {
    var _phylumPair = Array.from(phylaTonics.entries()).find(function(_ref3) {
      var _ref4 = _slicedToArray8(_ref3, 2), tonic = _ref4[1];
      return tonic === dnatype;
    });
    return _phylumPair ? _phylumPair[0] : null;
  }
}
function hybridize() {
  if (get("_dnaHybrid") || !installed2()) return !1;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return !1;
  var tonicPotion = getTonic(currentSyringe), expectedEffect = (0, import_kolmafia27.toEffect)(get2("Effect", tonicPotion));
  return (0, import_kolmafia27.cliExecute)("camp dnainject"), isHybridized(expectedEffect);
}
function makeTonic() {
  var amount2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  if (!installed2()) return !1;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return !1;
  var tonicPotion = getTonic(currentSyringe), amountToMake = clamp(amount2, 0, tonicsLeft()), startingAmount = (0, import_kolmafia27.itemAmount)(tonicPotion);
  return (0, import_kolmafia27.cliExecute)("camp dnapotion ".concat(amountToMake)), (0, import_kolmafia27.itemAmount)(tonicPotion) - startingAmount === amountToMake;
}
function tonicsLeft() {
  return clamp(3 - get("_dnaPotionsMade"), 0, 3);
}

// src/resources/2014/WinterGarden.ts
var WinterGarden_exports = {};
__export(WinterGarden_exports, {
  UnfinishedIceSculpture: function() {
    return UnfinishedIceSculpture;
  },
  couldUseUnfinishedIceSculpture: function() {
    return couldUseUnfinishedIceSculpture;
  },
  getUnfinishedIceSculptureMonster: function() {
    return getUnfinishedIceSculptureMonster;
  },
  have: function() {
    return have15;
  },
  haveUnfinishedIceSculpture: function() {
    return haveUnfinishedIceSculpture;
  },
  isUnfinishedIceSculptureUsed: function() {
    return isUnfinishedIceSculptureUsed;
  }
});
init_kolmafia_polyfill();
var _templateObject130, _templateObject239, _templateObject331, _templateObject430;
function _taggedTemplateLiteral21(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have15() {
  return haveInCampground($item(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral21(["packet of winter seeds"]))));
}
function haveUnfinishedIceSculpture() {
  return have($item(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral21(["unfinished ice sculpture"]))));
}
function isUnfinishedIceSculptureUsed() {
  return get("_iceSculptureUsed");
}
function couldUseUnfinishedIceSculpture() {
  return have($item(_templateObject331 || (_templateObject331 = _taggedTemplateLiteral21(["unfinished ice sculpture"])))) && !have($item(_templateObject430 || (_templateObject430 = _taggedTemplateLiteral21(["ice sculpture"]))));
}
function getUnfinishedIceSculptureMonster() {
  return get("iceSculptureMonster");
}
var UnfinishedIceSculpture = new Copier(function() {
  return couldUseUnfinishedIceSculpture();
}, null, function() {
  return couldUseUnfinishedIceSculpture();
}, function() {
  return getUnfinishedIceSculptureMonster();
});

// src/resources/2015/BarrelShrine.ts
var BarrelShrine_exports = {};
__export(BarrelShrine_exports, {
  have: function() {
    return have16;
  },
  smashParty: function() {
    return smashParty;
  }
});
init_kolmafia_polyfill();
var import_kolmafia28 = require("kolmafia");
var _templateObject131;
function _taggedTemplateLiteral22(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var BARRELS = $items(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral22(["little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel"])));
function have16() {
  return get("barrelShrineUnlocked");
}
function smashParty() {
  if (have16()) {
    var total = sum(BARRELS, import_kolmafia28.availableAmount);
    if (!(total <= 0)) {
      (0, import_kolmafia28.visitUrl)("inv_use.php?pwd&whichitem=8568&choice=1");
      for (var i = 0; i < total / 100; i++)
        (0, import_kolmafia28.runChoice)(2);
    }
  }
}

// src/resources/2015/ChateauMantegna.ts
var ChateauMantegna_exports = {};
__export(ChateauMantegna_exports, {
  ceilings: function() {
    return ceilings;
  },
  changeCeiling: function() {
    return changeCeiling;
  },
  changeDesk: function() {
    return changeDesk;
  },
  changeNightstand: function() {
    return changeNightstand;
  },
  desks: function() {
    return desks;
  },
  fightPainting: function() {
    return fightPainting;
  },
  getCeiling: function() {
    return getCeiling;
  },
  getDesk: function() {
    return getDesk;
  },
  getNightstand: function() {
    return getNightstand;
  },
  have: function() {
    return have17;
  },
  nightstands: function() {
    return nightstands;
  },
  paintingFought: function() {
    return paintingFought;
  },
  paintingMonster: function() {
    return paintingMonster;
  }
});
init_kolmafia_polyfill();
var import_kolmafia29 = require("kolmafia");
function have17() {
  return get("chateauAvailable");
}
function paintingMonster() {
  return get("chateauMonster");
}
function paintingFought() {
  return get("_chateauMonsterFought");
}
function fightPainting() {
  return (0, import_kolmafia29.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", !1), import_kolmafia29.runCombat.apply(void 0, arguments);
}
var desks = ["fancy stationery set", "Swiss piggy bank", "continental juice bar"], ceilings = ["antler chandelier", "ceiling fan", "artificial skylight"], nightstands = ["foreign language tapes", "bowl of potpourri", "electric muscle stimulator"];
function getDesk() {
  var _desks$find;
  return (_desks$find = desks.find(function(desk) {
    return Object.keys((0, import_kolmafia29.getChateau)()).includes(desk);
  })) !== null && _desks$find !== void 0 ? _desks$find : null;
}
function getCeiling() {
  var _ceilings$find;
  return (_ceilings$find = ceilings.find(function(ceiling) {
    return Object.keys((0, import_kolmafia29.getChateau)()).includes(ceiling);
  })) !== null && _ceilings$find !== void 0 ? _ceilings$find : null;
}
function getNightstand() {
  var _nightstands$find;
  return (_nightstands$find = nightstands.find(function(nightstand) {
    return Object.keys((0, import_kolmafia29.getChateau)()).includes(nightstand);
  })) !== null && _nightstands$find !== void 0 ? _nightstands$find : null;
}
function changeDesk(desk) {
  return getDesk() === desk ? !0 : desks.includes(desk) ? ((0, import_kolmafia29.buy)(import_kolmafia29.Item.get(desk)), getDesk() === desk) : !1;
}
function changeCeiling(ceiling) {
  return getCeiling() === ceiling ? !0 : ceilings.includes(ceiling) ? ((0, import_kolmafia29.buy)(import_kolmafia29.Item.get(ceiling)), getCeiling() === ceiling) : !1;
}
function changeNightstand(nightstand) {
  return getNightstand() === nightstand ? !0 : nightstands.includes(nightstand) ? ((0, import_kolmafia29.buy)(import_kolmafia29.Item.get(nightstand)), getNightstand() === nightstand) : !1;
}

// src/resources/2015/DeckOfEveryCard.ts
var DeckOfEveryCard_exports = {};
__export(DeckOfEveryCard_exports, {
  cards: function() {
    return cards;
  },
  cheatCard: function() {
    return cheatCard;
  },
  getCardsDrawn: function() {
    return getCardsDrawn;
  },
  getCardsSeen: function() {
    return getCardsSeen;
  },
  getRemainingCheats: function() {
    return getRemainingCheats;
  },
  getRemainingDraws: function() {
    return getRemainingDraws;
  },
  have: function() {
    return have18;
  }
});
init_kolmafia_polyfill();
var import_kolmafia30 = require("kolmafia");
var _templateObject139;
function _taggedTemplateLiteral23(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have18() {
  return have($item(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral23(["Deck of Every Card"]))));
}
var cards = Object.freeze(["X of Clubs", "X of Diamonds", "X of Hearts", "X of Spades", "X of Papayas", "X of Kumquats", "X of Salads", "X of Cups", "X of Coins", "X of Swords", "X of Wands", "XVI - The Tower", "Professor Plum", "Spare Tire", "Extra Tank", "Sheep", "Year of Plenty", "Mine", "Laboratory", "Plains", "Swamp", "Mountain", "Forest", "Island", "Lead Pipe", "Rope", "Wrench", "Candlestick", "Knife", "Revolver", "Gift Card", "1952 Mickey Mantle", "XXI - The World", "III - The Empress", "VI - The Lovers", "Healing Salve", "Dark Ritual", "Lightning Bolt", "Giant Growth", "Ancestral Recall", "XI - Strength", "I - The Magician", "0 - The Fool", "X - The Wheel of Fortune", "The Race Card", "Green Card", "IV - The Emperor", "IX - The Hermit", "Werewolf", "The Hive", "XVII - The Star", "VII - The Chariot", "XV - The Devil", "V - The Hierophant", "Fire Elemental", "Christmas Card", "Go Fish", "Goblin Sapper", "II - The High Priestess", "XIV - Temperance", "XVIII - The Moon", "Hunky Fireman Card", "Aquarius Horoscope", "XII - The Hanged Man", "Suit Warehouse Discount Card", "Pirate Birthday Card", "Plantable Greeting Card", "Slimer Trading Card", "XIII - Death", "Unstable Portal"]);
function getCardsDrawn() {
  return clamp(get("_deckCardsDrawn"), 0, 15);
}
function getRemainingDraws() {
  return 15 - getCardsDrawn();
}
function getRemainingCheats() {
  return Math.floor(getRemainingDraws() / 5);
}
function getCardsSeen() {
  return get("_deckCardsSeen") ? get("_deckCardsSeen").split("|") : [];
}
function cheatCard(card) {
  return getCardsSeen().includes(card) ? !0 : getRemainingDraws() < 5 ? !1 : (0, import_kolmafia30.cliExecute)("cheat ".concat(card));
}

// src/resources/2015/Dinseylandfill.ts
var Dinseylandfill_exports = {};
__export(Dinseylandfill_exports, {
  acceptQuest: function() {
    return acceptQuest;
  },
  activeQuest: function() {
    return activeQuest;
  },
  available: function() {
    return available;
  },
  canFightWartDinsey: function() {
    return canFightWartDinsey;
  },
  coasterNextTurn: function() {
    return coasterNextTurn;
  },
  disposeGarbage: function() {
    return disposeGarbage;
  },
  foughtWartDinseyThisLife: function() {
    return foughtWartDinseyThisLife;
  },
  hasActiveQuest: function() {
    return hasActiveQuest;
  },
  hasDisposedGarbage: function() {
    return hasDisposedGarbage;
  },
  hasQuest: function() {
    return hasQuest;
  },
  have: function() {
    return have19;
  },
  keyCardsLocations: function() {
    return keyCardsLocations;
  },
  questComplete: function() {
    return questComplete;
  },
  quests: function() {
    return quests;
  },
  turnInQuest: function() {
    return turnInQuest2;
  }
});
init_kolmafia_polyfill();
var import_kolmafia31 = require("kolmafia");
var _templateObject140, _templateObject240, _templateObject337, _templateObject431, _templateObject520, _templateObject617, _templateObject714, _templateObject814, _templateObject912, _templateObject1012, _templateObject1112, _templateObject1211, _templateObject1310, _templateObject148, _templateObject158, _templateObject168, _templateObject178, _templateObject188, _templateObject198, _templateObject208, _templateObject2112, _templateObject2211, _templateObject2310, _templateObject248, _templateObject258, _templateObject267, _templateObject277;
function _createForOfIteratorHelper6(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray17(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray17(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray17(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray17(r, a) : void 0;
  }
}
function _arrayLikeToArray17(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral24(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _classCallCheck10(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties10(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey13(o.key), o);
  }
}
function _createClass10(e, r, t) {
  return r && _defineProperties10(e.prototype, r), t && _defineProperties10(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty12(e, r, t) {
  return (r = _toPropertyKey13(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey13(t) {
  var i = _toPrimitive13(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive13(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function have19() {
  return get("stenchAirportAlways");
}
function available() {
  return have19() || get("_stenchAirportToday");
}
var QuestData = /* @__PURE__ */ function() {
  function QuestData2(name, priority, questNameKiosk, questNameQuestLog, questStateProperty, questProgressProperty, questProgressLimit, canUseWanderers, requiredItem, questLocation) {
    _classCallCheck10(this, QuestData2), _defineProperty12(this, "name", void 0), _defineProperty12(this, "priority", void 0), _defineProperty12(this, "questNameKiosk", void 0), _defineProperty12(this, "questNameQuestLog", void 0), _defineProperty12(this, "questStateProperty", void 0), _defineProperty12(this, "questProgressProperty", void 0), _defineProperty12(this, "questProgressLimit", void 0), _defineProperty12(this, "canUseWanderers", void 0), _defineProperty12(this, "requiredItem", void 0), _defineProperty12(this, "questLocation", void 0), this.name = name, this.priority = priority, this.questNameKiosk = questNameKiosk, this.questNameQuestLog = questNameQuestLog, this.questStateProperty = questStateProperty, this.questProgressProperty = questProgressProperty, this.questProgressLimit = questProgressLimit, this.canUseWanderers = canUseWanderers, this.requiredItem = requiredItem, this.questLocation = questLocation;
  }
  return _createClass10(QuestData2, [{
    key: "currentQuest",
    value: function() {
      return get(this.questStateProperty) !== "unstarted";
    }
  }]);
}(), kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk", maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels", quests = [new QuestData("lube", 1, "Track Maintenance", "Super Luber", "questEStSuperLuber", "", 0, !1, $item(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral24(["lube-shoes"]))), $location(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral24(["Barf Mountain"])))), new QuestData("fuel", 0, "Electrical Maintenance", "Give Me Fuel", "questEStGiveMeFuel", "", 0, !1, $item(_templateObject337 || (_templateObject337 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject431 || (_templateObject431 = _taggedTemplateLiteral24(["The Toxic Teacups"])))), new QuestData("sexism", 2, "Sexism Reduction", "Social Justice Adventurer I", "questEStSocialJusticeI", "dinseySocialJusticeIProgress", 15, !0, $item(_templateObject520 || (_templateObject520 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject617 || (_templateObject617 = _taggedTemplateLiteral24(["Pirates of the Garbage Barges"])))), new QuestData("racism", 3, "Racism Reduction", "Social Justice Adventurer II", "questEStSocialJusticeII", "dinseySocialJusticeIIProgress", 15, !0, $item(_templateObject714 || (_templateObject714 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject814 || (_templateObject814 = _taggedTemplateLiteral24(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("fun", 4, "Compulsory Fun", "Whistling Zippity-Doo-Dah", "questEStZippityDooDah", "dinseyFunProgress", 15, !0, $item(_templateObject912 || (_templateObject912 = _taggedTemplateLiteral24(["Dinsey mascot mask"]))), $location(_templateObject1012 || (_templateObject1012 = _taggedTemplateLiteral24(["The Toxic Teacups"])))), new QuestData("trash", 6, "Waterway Debris Removal", "Teach a Man to Fish Trash", "questEStFishTrash", "dinseyFilthLevel", 0, !0, $item(_templateObject1112 || (_templateObject1112 = _taggedTemplateLiteral24(["trash net"]))), $location(_templateObject1211 || (_templateObject1211 = _taggedTemplateLiteral24(["Pirates of the Garbage Barges"])))), new QuestData("bear", 5, "Bear Removal", "Nasty, Nasty Bears", "questEStNastyBears", "dinseyNastyBearsDefeated", 8, !1, $item(_templateObject1310 || (_templateObject1310 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral24(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("food", 7, "Guest Sustenance Assurance", "Will Work With Food", "questEStWorkWithFood", "dinseyTouristsFed", 30, !1, $item(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral24(["Barf Mountain"]))))];
function disposeGarbage() {
  return hasDisposedGarbage() ? !1 : (!hasDisposedGarbage() && have($item(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral24(["bag of park garbage"])))) && ((0, import_kolmafia31.visitUrl)(maintUrl), (0, import_kolmafia31.runChoice)(6)), hasDisposedGarbage());
}
function hasQuest() {
  return quests.some(function(q) {
    return q.currentQuest();
  });
}
var BLANK_QUEST = new QuestData("", -1, "", "", "", "", -1, !1, $item(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral24(["none"]))), $location(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral24(["none"]))));
function activeQuest() {
  return quests.find(function(q) {
    return q.currentQuest();
  }) || BLANK_QUEST;
}
function questComplete() {
  var quest = activeQuest();
  return quest !== BLANK_QUEST && get(quest.questStateProperty) === "finished";
}
function hasActiveQuest() {
  return hasQuest() && !questComplete();
}
function acceptQuest(priority) {
  var _quests$find$priority, _quests$find;
  if (hasQuest())
    return !1;
  var page = (0, import_kolmafia31.visitUrl)(kioskUrl), choice = 6, at = (0, import_kolmafia31.indexOf)(page, "Available Assignments");
  if (at == -1)
    return !1;
  var jobs = [];
  quests.forEach(function(quest2) {
    jobs.push(quest2.name);
  });
  var priorityNum = typeof priority == "string" ? (_quests$find$priority = (_quests$find = quests.find(function(q) {
    return q.name === priority;
  })) === null || _quests$find === void 0 ? void 0 : _quests$find.priority) !== null && _quests$find$priority !== void 0 ? _quests$find$priority : 7 : priority, availableJobs = [], jobChoices = [["none", 999]], _iterator = _createForOfIteratorHelper6(quests), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var quest = _step.value, job = quest.name, jobAt = (0, import_kolmafia31.indexOf)(page, job, at);
      if (jobAt != -1) {
        availableJobs.push(quest), jobChoices.push([job, jobAt]);
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var bestJob = availableJobs.sort(function(a, b) {
    return a.priority - b.priority;
  })[0], sortedChoices = jobChoices.sort(function(a, b) {
    return a[1] - b[1];
  });
  if (bestJob.priority <= priorityNum)
    for (var index in sortedChoices) {
      var jobName = sortedChoices[index][0];
      if (jobName === bestJob.name) {
        choice = parseInt(index) + 1;
        break;
      }
    }
  return (0, import_kolmafia31.runChoice)(choice), hasQuest();
}
function turnInQuest2() {
  questComplete() && (activeQuest().name === "racism" && _set("questEStSocialJusticeI", "unstarted"), (0, import_kolmafia31.visitUrl)(kioskUrl), (0, import_kolmafia31.runChoice)(3));
}
var keyCardsLocations = /* @__PURE__ */ new Map([[$item(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral24(["keycard \u03B1"]))), $location(_templateObject2112 || (_templateObject2112 = _taggedTemplateLiteral24(["Barf Mountain"])))], [$item(_templateObject2211 || (_templateObject2211 = _taggedTemplateLiteral24(["keycard \u03B2"]))), $location(_templateObject2310 || (_templateObject2310 = _taggedTemplateLiteral24(["Pirates of the Garbage Barges"])))], [$item(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral24(["keycard \u03B3"]))), $location(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral24(["The Toxic Teacups"])))], [$item(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral24(["keycard \u03B4"]))), $location(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral24(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))]]);
function canFightWartDinsey() {
  return Array.from(keyCardsLocations.keys()).every(function(keycard) {
    return have(keycard);
  }) && !foughtWartDinseyThisLife() && getRemainingLiver() >= 0 && (0, import_kolmafia31.myAdventures)() > 0;
}
function coasterNextTurn() {
  return get("dinseyRollercoasterNext");
}
function foughtWartDinseyThisLife() {
  return get("lastWartDinseyDefeated") === (0, import_kolmafia31.myAscensions)();
}
function hasDisposedGarbage() {
  return get("_dinseyGarbageDisposed");
}

// src/resources/2015/MayoClinic.ts
var MayoClinic_exports = {};
__export(MayoClinic_exports, {
  Mayo: function() {
    return Mayo;
  },
  have: function() {
    return have20;
  },
  installed: function() {
    return installed3;
  },
  setMayoMinder: function() {
    return setMayoMinder;
  }
});
init_kolmafia_polyfill();
var import_kolmafia32 = require("kolmafia");
var _templateObject141, _templateObject241, _templateObject338, _templateObject437, _templateObject521, _templateObject618, _templateObject715, _templateObject815, _templateObject913, _templateObject1013;
function _taggedTemplateLiteral25(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Mayo = {
  nex: $item(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral25(["Mayonex"]))),
  diol: $item(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral25(["Mayodiol"]))),
  zapine: $item(_templateObject338 || (_templateObject338 = _taggedTemplateLiteral25(["Mayozapine"]))),
  flex: $item(_templateObject437 || (_templateObject437 = _taggedTemplateLiteral25(["Mayoflex"])))
};
function installed3() {
  return (0, import_kolmafia32.getWorkshed)() === $item(_templateObject521 || (_templateObject521 = _taggedTemplateLiteral25(["portable Mayo Clinic"])));
}
function have20() {
  return have($item(_templateObject618 || (_templateObject618 = _taggedTemplateLiteral25(["portable Mayo Clinic"])))) || installed3();
}
function setMayoMinder(mayo) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return (0, import_kolmafia32.getWorkshed)() !== $item(_templateObject715 || (_templateObject715 = _taggedTemplateLiteral25(["portable Mayo Clinic"]))) ? !1 : Object.values(Mayo).includes(mayo) ? get("mayoInMouth") && get("mayoInMouth") !== mayo.name ? (logger_default.error("Currently have incorrect mayo in mouth"), !1) : ((0, import_kolmafia32.retrieveItem)(quantity, mayo), have($item(_templateObject815 || (_templateObject815 = _taggedTemplateLiteral25(["Mayo Minder\u2122"])))) || (0, import_kolmafia32.buy)($item(_templateObject913 || (_templateObject913 = _taggedTemplateLiteral25(["Mayo Minder\u2122"])))), get("mayoMinderSetting") !== mayo.name && withChoice(1076, mayo.id - 8260, function() {
    return (0, import_kolmafia32.use)($item(_templateObject1013 || (_templateObject1013 = _taggedTemplateLiteral25(["Mayo Minder\u2122"]))));
  }), get("mayoMinderSetting") === mayo.name) : (logger_default.error("Invalid mayo selected"), !1);
}

// src/resources/2016/GingerBread.ts
var GingerBread_exports = {};
__export(GingerBread_exports, {
  LOCATIONS: function() {
    return LOCATIONS;
  },
  available: function() {
    return available2;
  },
  availableLocations: function() {
    return availableLocations;
  },
  canJudgeFudge: function() {
    return canJudgeFudge;
  },
  getMidnightChoiceId: function() {
    return getMidnightChoiceId;
  },
  getNoonChoiceId: function() {
    return getNoonChoiceId;
  },
  minutesToMidnight: function() {
    return minutesToMidnight;
  },
  minutesToNoon: function() {
    return minutesToNoon;
  }
});
init_kolmafia_polyfill();
var import_kolmafia33 = require("kolmafia");
var _templateObject149, _templateObject249, _templateObject339, _templateObject438, _templateObject524, _templateObject619, _templateObject716, _templateObject816, _templateObject914;
function _taggedTemplateLiteral26(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function available2() {
  return (get("gingerbreadCityAvailable") || get("_gingerbreadCityToday")) && turns() < availableTurns();
}
function turns() {
  return get("_gingerbreadCityTurns") + (get("_gingerbreadClockAdvanced") ? 5 : 0);
}
function availableTurns() {
  return 20 + (get("gingerExtraAdventures") ? 10 : 0);
}
function minutesToMidnight() {
  return 19 - turns();
}
function minutesToNoon() {
  return 9 - turns();
}
var LOCATIONS = Object.freeze($locations(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral26(["Gingerbread Civic Center, Gingerbread Train Station, Gingerbread Industrial Zone, Gingerbread Upscale Retail District, Gingerbread Sewers"]))));
function availableLocations() {
  return LOCATIONS.filter(function(l) {
    return (0, import_kolmafia33.canAdventure)(l);
  });
}
var NOONS = /* @__PURE__ */ new Map([[$location(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral26(["Gingerbread Train Station"]))), 1204], [$location(_templateObject339 || (_templateObject339 = _taggedTemplateLiteral26(["Gingerbread Civic Center"]))), 1202], [$location(_templateObject438 || (_templateObject438 = _taggedTemplateLiteral26(["Gingerbread Industrial Zone"]))), 1206], [$location(_templateObject524 || (_templateObject524 = _taggedTemplateLiteral26(["Gingerbread Upscale Retail District"]))), 1208]]), MIDNIGHTS = /* @__PURE__ */ new Map([[$location(_templateObject619 || (_templateObject619 = _taggedTemplateLiteral26(["Gingerbread Train Station"]))), 1205], [$location(_templateObject716 || (_templateObject716 = _taggedTemplateLiteral26(["Gingerbread Civic Center"]))), 1203], [$location(_templateObject816 || (_templateObject816 = _taggedTemplateLiteral26(["Gingerbread Industrial Zone"]))), 1207], [$location(_templateObject914 || (_templateObject914 = _taggedTemplateLiteral26(["Gingerbread Upscale Retail District"]))), 1209]]);
function getNoonChoiceId(location) {
  var _NOONS$get;
  return (_NOONS$get = NOONS.get(location)) !== null && _NOONS$get !== void 0 ? _NOONS$get : 0;
}
function getMidnightChoiceId(location) {
  var _MIDNIGHTS$get;
  return (_MIDNIGHTS$get = MIDNIGHTS.get(location)) !== null && _MIDNIGHTS$get !== void 0 ? _MIDNIGHTS$get : 0;
}
function canJudgeFudge() {
  return !!(minutesToNoon() >= 0 || minutesToMidnight() >= 0 && get("_gingerbreadColumnDestroyed"));
}

// src/resources/2016/SourceTerminal.ts
var SourceTerminal_exports = {};
__export(SourceTerminal_exports, {
  Buffs: function() {
    return Buffs;
  },
  Digitize: function() {
    return Digitize;
  },
  Items: function() {
    return Items;
  },
  RolloverBuffs: function() {
    return RolloverBuffs;
  },
  Skills: function() {
    return Skills;
  },
  canDigitize: function() {
    return canDigitize;
  },
  couldDigitize: function() {
    return couldDigitize;
  },
  duplicateUsesRemaining: function() {
    return duplicateUsesRemaining;
  },
  educate: function() {
    return educate;
  },
  enhance: function() {
    return enhance;
  },
  enhanceBuffDuration: function() {
    return enhanceBuffDuration;
  },
  enhanceUsesRemaining: function() {
    return enhanceUsesRemaining;
  },
  enquiry: function() {
    return enquiry;
  },
  enquiryBuffDuration: function() {
    return enquiryBuffDuration;
  },
  extrude: function() {
    return extrude;
  },
  getChips: function() {
    return getChips;
  },
  getDigitizeMonster: function() {
    return getDigitizeMonster;
  },
  getDigitizeMonsterCount: function() {
    return getDigitizeMonsterCount;
  },
  getDigitizeUses: function() {
    return getDigitizeUses;
  },
  getDigitizeUsesRemaining: function() {
    return getDigitizeUsesRemaining;
  },
  getDuplicateUses: function() {
    return getDuplicateUses;
  },
  getEnhanceUses: function() {
    return getEnhanceUses;
  },
  getMaximumDigitizeUses: function() {
    return getMaximumDigitizeUses;
  },
  getPortscanUses: function() {
    return getPortscanUses;
  },
  getSkills: function() {
    return getSkills;
  },
  have: function() {
    return have21;
  },
  isCurrentSkill: function() {
    return isCurrentSkill;
  },
  maximumDuplicateUses: function() {
    return maximumDuplicateUses;
  },
  maximumEnhanceUses: function() {
    return maximumEnhanceUses;
  },
  prepareDigitize: function() {
    return prepareDigitize;
  }
});
init_kolmafia_polyfill();
var import_kolmafia34 = require("kolmafia");
var _templateObject150, _templateObject250, _templateObject340, _templateObject439, _templateObject525, _templateObject620, _templateObject717, _templateObject817, _templateObject915, _templateObject1014, _templateObject1113, _templateObject1212, _templateObject1311, _templateObject1410, _templateObject159, _templateObject169, _templateObject179, _templateObject189, _templateObject199, _templateObject209, _templateObject2113, _templateObject2212, _templateObject2311, _templateObject2410, _templateObject259, _templateObject268, _templateObject278;
function _createForOfIteratorHelper7(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray18(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray18(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray18(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray18(r, a) : void 0;
  }
}
function _arrayLikeToArray18(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral27(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item = $item(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral27(["Source terminal"])));
function have21() {
  return haveInCampground(item);
}
var Buffs = {
  Items: $effect(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral27(["items.enh"]))),
  Meat: $effect(_templateObject340 || (_templateObject340 = _taggedTemplateLiteral27(["meat.enh"]))),
  Init: $effect(_templateObject439 || (_templateObject439 = _taggedTemplateLiteral27(["init.enh"]))),
  Critical: $effect(_templateObject525 || (_templateObject525 = _taggedTemplateLiteral27(["critical.enh"]))),
  Damage: $effect(_templateObject620 || (_templateObject620 = _taggedTemplateLiteral27(["damage.enh"]))),
  Substats: $effect(_templateObject717 || (_templateObject717 = _taggedTemplateLiteral27(["substats.enh"])))
};
function enhance(buff) {
  return Object.values(Buffs).includes(buff) ? (0, import_kolmafia34.cliExecute)("terminal enhance ".concat(buff.name)) : !1;
}
var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: $effect(_templateObject817 || (_templateObject817 = _taggedTemplateLiteral27(["familiar.enq"]))),
  /** +25 ML */
  Monsters: $effect(_templateObject915 || (_templateObject915 = _taggedTemplateLiteral27(["monsters.enq"]))),
  /** +5 Prismatic Resistance */
  Protect: $effect(_templateObject1014 || (_templateObject1014 = _taggedTemplateLiteral27(["protect.enq"]))),
  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: $effect(_templateObject1113 || (_templateObject1113 = _taggedTemplateLiteral27(["stats.enq"])))
};
function enquiry(rolloverBuff) {
  return Object.values(RolloverBuffs).includes(rolloverBuff) ? (0, import_kolmafia34.cliExecute)("terminal enquiry ".concat(rolloverBuff.name)) : !1;
}
var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: $skill(_templateObject1212 || (_templateObject1212 = _taggedTemplateLiteral27(["Extract"]))),
  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: $skill(_templateObject1311 || (_templateObject1311 = _taggedTemplateLiteral27(["Digitize"]))),
  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: $skill(_templateObject1410 || (_templateObject1410 = _taggedTemplateLiteral27(["Compress"]))),
  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: $skill(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral27(["Duplicate"]))),
  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: $skill(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral27(["Portscan"]))),
  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: $skill(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral27(["Turbo"])))
};
function educate(skills3) {
  var skillsArray = Array.isArray(skills3) ? skills3.slice(0, 2) : [skills3];
  if (arrayEquals(skillsArray, getSkills())) return !0;
  var _iterator = _createForOfIteratorHelper7(skillsArray), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill)) return !1;
      (0, import_kolmafia34.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return !0;
}
function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(function(p) {
    return get(p);
  }).filter(Boolean).map(function(s) {
    return import_kolmafia34.Skill.get(s.slice(0, -4));
  });
}
function isCurrentSkill(skills3) {
  var currentSkills = getSkills(), skillsArray = Array.isArray(skills3) ? skills3.slice(0, 2) : [skills3];
  return skillsArray.every(function(skill) {
    return currentSkills.includes(skill);
  });
}
var Items = /* @__PURE__ */ new Map([[$item(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral27(["browser cookie"]))), "food.ext"], [$item(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral27(["hacked gibson"]))), "booze.ext"], [$item(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral27(["Source shades"]))), "goggles.ext"], [$item(_templateObject2113 || (_templateObject2113 = _taggedTemplateLiteral27(["Source terminal GRAM chip"]))), "gram.ext"], [$item(_templateObject2212 || (_templateObject2212 = _taggedTemplateLiteral27(["Source terminal PRAM chip"]))), "pram.ext"], [$item(_templateObject2311 || (_templateObject2311 = _taggedTemplateLiteral27(["Source terminal SPAM chip"]))), "spam.ext"], [$item(_templateObject2410 || (_templateObject2410 = _taggedTemplateLiteral27(["Source terminal CRAM chip"]))), "cram.ext"], [$item(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral27(["Source terminal DRAM chip"]))), "dram.ext"], [$item(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral27(["Source terminal TRAM chip"]))), "tram.ext"], [$item(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral27(["software bug"]))), "familiar.ext"]]);
function extrude(item14) {
  var fileName = Items.get(item14);
  return fileName ? (0, import_kolmafia34.cliExecute)("terminal extrude ".concat(fileName)) : !1;
}
function getChips() {
  return get("sourceTerminalChips").split(",");
}
function getDigitizeUses() {
  return get("_sourceTerminalDigitizeUses");
}
function getDigitizeMonster() {
  return get("_sourceTerminalDigitizeMonster");
}
function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  return isCurrentSkill(Skills.Digitize) ? !0 : educate(Skills.Digitize);
}
function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(function() {
  return couldDigitize();
}, function() {
  return prepareDigitize();
}, function() {
  return canDigitize();
}, function() {
  return getDigitizeMonster();
});
function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
function maximumDuplicateUses() {
  return (0, import_kolmafia34.myPath)() === import_kolmafia34.Path.get("The Source") ? 5 : 1;
}
function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
function maximumEnhanceUses() {
  return 1 + getChips().filter(function(chip) {
    return ["CRAM", "SCRAM"].includes(chip);
  }).length;
}
function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}

// src/resources/2016/Witchess.ts
var Witchess_exports = {};
__export(Witchess_exports, {
  fightPiece: function() {
    return fightPiece;
  },
  fightsDone: function() {
    return fightsDone;
  },
  have: function() {
    return have22;
  },
  pieces: function() {
    return pieces;
  }
});
init_kolmafia_polyfill();
var import_kolmafia35 = require("kolmafia");
var _templateObject151;
function _taggedTemplateLiteral28(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item2 = $item(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral28(["Witchess Set"])));
function have22() {
  return haveInCampground(item2);
}
function fightsDone() {
  return get("_witchessFights");
}
var pieces = import_kolmafia35.Monster.get(["Witchess Pawn", "Witchess Knight", "Witchess Bishop", "Witchess Rook", "Witchess Queen", "Witchess King", "Witchess Witch", "Witchess Ox"]);
function fightPiece(piece) {
  if (!pieces.includes(piece)) throw new Error("That is not a valid piece.");
  if (!(0, import_kolmafia35.visitUrl)("campground.php?action=witchess").includes("whichchoice value=1181"))
    throw new Error("Failed to open Witchess.");
  if (!(0, import_kolmafia35.runChoice)(1).includes("whichchoice=1182"))
    throw new Error("Failed to visit shrink ray.");
  if (!(0, import_kolmafia35.visitUrl)("choice.php?option=1&pwd=".concat((0, import_kolmafia35.myHash)(), "&whichchoice=1182&piece=").concat(piece.id), !1).includes(piece.name))
    throw new Error("Failed to start fight.");
  for (var _len = arguments.length, combatParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    combatParams[_key - 1] = arguments[_key];
  return import_kolmafia35.runCombat.apply(void 0, combatParams);
}

// src/resources/2017/Horsery.ts
var Horsery_exports = {};
__export(Horsery_exports, {
  changeHorse: function() {
    return changeHorse;
  },
  crazyHorseStats: function() {
    return crazyHorseStats;
  },
  current: function() {
    return current;
  },
  have: function() {
    return have23;
  }
});
init_kolmafia_polyfill();
var import_kolmafia36 = require("kolmafia");
function have23() {
  return get("horseryAvailable");
}
function current() {
  var horse = get("_horsery");
  return horse ? horse.split(" ")[0] : null;
}
function changeHorse(horse) {
  return horse === current() ? !0 : have23() ? ((0, import_kolmafia36.cliExecute)("horsery ".concat(horse)), current() === horse) : !1;
}
function crazyHorseStats() {
  return have23() ? (get("_horseryCrazyName") || (0, import_kolmafia36.visitUrl)("place.php?whichplace=town_right&action=town_horsery"), {
    "Mysticality Percent": Number(get("_horseryCrazyMys")),
    "Muscle Percent": Number(get("_horseryCrazyMus")),
    "Moxie Percent": Number(get("_horseryCrazyMox"))
  }) : {};
}

// src/resources/2017/MummingTrunk.ts
var MummingTrunk_exports = {};
__export(MummingTrunk_exports, {
  currentCostumes: function() {
    return currentCostumes;
  }
});
init_kolmafia_polyfill();
var import_kolmafia37 = require("kolmafia");
function _slicedToArray9(r, e) {
  return _arrayWithHoles9(r) || _iterableToArrayLimit9(r, e) || _unsupportedIterableToArray19(r, e) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray19(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray19(r, a) : void 0;
  }
}
function _arrayLikeToArray19(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit9(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles9(r) {
  if (Array.isArray(r)) return r;
}
var MUMMERY_MODS_PATTERN = /\[(\d*)\*fam\(([^)]*)\)/;
function currentCostumes() {
  return new Map(Object.entries((0, import_kolmafia37.splitModifiers)(get("_mummeryMods"))).map(function(_ref) {
    var _ref2 = _slicedToArray9(_ref, 2), modifier = _ref2[0], value = _ref2[1];
    if (!isNumericModifier(modifier)) return null;
    var matcher = value.match(MUMMERY_MODS_PATTERN);
    return matcher ? [import_kolmafia37.Familiar.get(matcher[2]), [modifier, Number(matcher[1])]] : null;
  }).filter(notNull));
}

// src/resources/2017/Pantogram.ts
var Pantogram_exports = {};
__export(Pantogram_exports, {
  findRequirements: function() {
    return findRequirements;
  },
  have: function() {
    return have24;
  },
  havePants: function() {
    return havePants;
  },
  makePants: function() {
    return makePants;
  },
  makePantsFromObject: function() {
    return makePantsFromObject;
  }
});
init_kolmafia_polyfill();
var import_kolmafia38 = require("kolmafia");
var _templateObject160, _templateObject251, _templateObject341, _templateObject440, _templateObject526, _templateObject621, _templateObject718, _templateObject818, _templateObject916, _templateObject1015, _templateObject1114, _templateObject1213, _templateObject1312, _templateObject1411, _templateObject1510, _templateObject1610, _templateObject1710, _templateObject1810, _MiddleSacrifice, _templateObject1910, _templateObject2010, _templateObject2114, _templateObject2213, _templateObject2312, _templateObject2411, _templateObject2510, _templateObject269, _templateObject279, _templateObject287, _RightSacrifice;
function _slicedToArray10(r, e) {
  return _arrayWithHoles10(r) || _iterableToArrayLimit10(r, e) || _unsupportedIterableToArray20(r, e) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray20(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray20(r, a) : void 0;
  }
}
function _arrayLikeToArray20(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit10(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles10(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty13(e, r, t) {
  return (r = _toPropertyKey14(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey14(t) {
  var i = _toPrimitive14(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive14(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _taggedTemplateLiteral29(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var pantogram = $item(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral29(["portable pantogram"]))), pants = $item(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral29(["pantogram pants"])));
function have24() {
  return have(pantogram);
}
function havePants() {
  return have(pants);
}
var Alignment = _defineProperty13(_defineProperty13(_defineProperty13({}, "Muscle", 1), "Mysticality", 2), "Moxie", 3), Element4 = _defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13({}, "Hot Resistance: 2", 1), "Cold Resistance: 2", 2), "Spooky Resistance: 2", 3), "Sleaze Resistance: 2", 4), "Stench Resistance: 2", 5), LeftSacrifice = _defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13({}, "Maximum HP: 40", [-1, 0]), "Maximum MP: 20", [-2, 0]), "HP Regen Max: 10", [$item(_templateObject341 || (_templateObject341 = _taggedTemplateLiteral29(["red pixel potion"]))), 1]), "HP Regen Max: 15", [$item(_templateObject440 || (_templateObject440 = _taggedTemplateLiteral29(["royal jelly"]))), 1]), "HP Regen Max: 20", [$item(_templateObject526 || (_templateObject526 = _taggedTemplateLiteral29(["scented massage oil"]))), 1]), "MP Regen Max: 10", [$item(_templateObject621 || (_templateObject621 = _taggedTemplateLiteral29(["Cherry Cloaca Cola"]))), 1]), "MP Regen Max: 15", [$item(_templateObject718 || (_templateObject718 = _taggedTemplateLiteral29(["bubblin' crude"]))), 1]), "MP Regen Max: 20", [$item(_templateObject818 || (_templateObject818 = _taggedTemplateLiteral29(["glowing New Age crystal"]))), 1]), "Mana Cost: -3", [$item(_templateObject916 || (_templateObject916 = _taggedTemplateLiteral29(["baconstone"]))), 1]);
function getLeftSacPair(mod) {
  return LeftSacrifice[mod];
}
var MiddleSacrifice = (_MiddleSacrifice = {}, _defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_MiddleSacrifice, "Combat Rate: -5", [-1, 0]), "Combat Rate: 5", [-2, 0]), "Critical Hit Percent: 10", [$item(_templateObject1015 || (_templateObject1015 = _taggedTemplateLiteral29(["hamethyst"]))), 1]), "Initiative: 50", [$item(_templateObject1114 || (_templateObject1114 = _taggedTemplateLiteral29(["bar skin"]))), 1]), "Familiar Weight: 10", [$item(_templateObject1213 || (_templateObject1213 = _taggedTemplateLiteral29(["lead necklace"]))), 11]), "Candy Drop: 100", [$item(_templateObject1312 || (_templateObject1312 = _taggedTemplateLiteral29(["huge bowl of candy"]))), 1]), "Item Drop Penalty: -10", [$item(_templateObject1411 || (_templateObject1411 = _taggedTemplateLiteral29(["sea salt crystal"]))), 11]), "Fishing Skill: 5", [$item(_templateObject1510 || (_templateObject1510 = _taggedTemplateLiteral29(["wriggling worm"]))), 1]), "Pool Skill: 5", [$item(_templateObject1610 || (_templateObject1610 = _taggedTemplateLiteral29(["8-ball"]))), 15]), "Avatar: Purple", [$item(_templateObject1710 || (_templateObject1710 = _taggedTemplateLiteral29(["moxie weed"]))), 99]), _defineProperty13(_MiddleSacrifice, "Drops Items: true", [$item(_templateObject1810 || (_templateObject1810 = _taggedTemplateLiteral29(["ten-leaf clover"]))), 1]));
function getMiddleSacPair(mod) {
  return MiddleSacrifice[mod];
}
var RightSacrifice = (_RightSacrifice = {}, _defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_defineProperty13(_RightSacrifice, "Weapon Damage: 20", [-1, 0]), "Spell Damage Percent: 20", [-2, 0]), "Meat Drop: 30", [$item(_templateObject1910 || (_templateObject1910 = _taggedTemplateLiteral29(["taco shell"]))), 1]), "Meat Drop: 60", [$item(_templateObject2010 || (_templateObject2010 = _taggedTemplateLiteral29(["porquoise"]))), 1]), "Item Drop: 15", [$item(_templateObject2114 || (_templateObject2114 = _taggedTemplateLiteral29(["fairy gravy boat"]))), 1]), "Item Drop: 30", [$item(_templateObject2213 || (_templateObject2213 = _taggedTemplateLiteral29(["tiny dancer"]))), 1]), "Muscle Experience: 3", [$item(_templateObject2312 || (_templateObject2312 = _taggedTemplateLiteral29(["Knob Goblin firecracker"]))), 3]), "Mysticality Experience: 3", [$item(_templateObject2411 || (_templateObject2411 = _taggedTemplateLiteral29(["razor-sharp can lid"]))), 3]), "Moxie Experience: 3", [$item(_templateObject2510 || (_templateObject2510 = _taggedTemplateLiteral29(["spider web"]))), 3]), "Muscle Experience Percent: 25", [$item(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral29(["synthetic marrow"]))), 5]), _defineProperty13(_defineProperty13(_RightSacrifice, "Mysticality Experience Percent: 25", [$item(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral29(["haunted battery"]))), 5]), "Moxie Experience Percent: 25", [$item(_templateObject287 || (_templateObject287 = _taggedTemplateLiteral29(["the funk"]))), 5]));
function getRightSacPair(mod) {
  return RightSacrifice[mod];
}
function findRequirements(modifiers) {
  var leftSac = modifiers.leftSac, rightSac = modifiers.rightSac, middleSac = modifiers.middleSac, returnValue = /* @__PURE__ */ new Map();
  if (leftSac) {
    var _getLeftSacPair = getLeftSacPair(leftSac), _getLeftSacPair2 = _slicedToArray10(_getLeftSacPair, 2), sacrifice = _getLeftSacPair2[0], quantity = _getLeftSacPair2[1];
    sacrifice instanceof import_kolmafia38.Item && returnValue.set(sacrifice, quantity);
  }
  if (rightSac) {
    var _getRightSacPair = getRightSacPair(rightSac), _getRightSacPair2 = _slicedToArray10(_getRightSacPair, 2), _sacrifice = _getRightSacPair2[0], _quantity = _getRightSacPair2[1];
    _sacrifice instanceof import_kolmafia38.Item && returnValue.set(_sacrifice, _quantity);
  }
  if (middleSac) {
    var _getMiddleSacPair = getMiddleSacPair(middleSac), _getMiddleSacPair2 = _slicedToArray10(_getMiddleSacPair, 2), _sacrifice2 = _getMiddleSacPair2[0], _quantity2 = _getMiddleSacPair2[1];
    _sacrifice2 instanceof import_kolmafia38.Item && returnValue.set(_sacrifice2, _quantity2);
  }
  return returnValue;
}
function sacrificePairToURL(pair) {
  var _pair = _slicedToArray10(pair, 2), rawSacrifice = _pair[0], quantity = _pair[1], sacrifice = rawSacrifice instanceof import_kolmafia38.Item ? rawSacrifice.id : rawSacrifice;
  return "".concat(sacrifice, ",").concat(quantity);
}
function makePants(alignment, element, leftSac, middleSac, rightSac) {
  if (have(pants) || !have(pantogram)) return !1;
  var requirements = findRequirements({
    alignment: alignment,
    element: element,
    leftSac: leftSac,
    rightSac: rightSac,
    middleSac: middleSac
  });
  if (Array.from(requirements.entries()).some(function(_ref) {
    var _ref2 = _slicedToArray10(_ref, 2), item14 = _ref2[0], quantity = _ref2[1];
    return !have(item14, quantity);
  }))
    return !1;
  var s1 = sacrificePairToURL(getLeftSacPair(leftSac)), s2 = sacrificePairToURL(getRightSacPair(rightSac)), s3 = sacrificePairToURL(getMiddleSacPair(middleSac)), url = "choice.php?whichchoice=1270&pwd&option=1&m=".concat(Alignment[alignment], "&e=").concat(Element4[element], "&s1=").concat(s1, "&s2=").concat(s2, "&s3=").concat(s3);
  return directlyUse(pantogram), (0, import_kolmafia38.visitUrl)(url), have(pants);
}
function makePantsFromObject(pants2) {
  return makePants(pants2.alignment, pants2.element, pants2.leftSac, pants2.middleSac, pants2.rightSac);
}

// src/resources/2017/Robortender.ts
var Robortender_exports = {};
__export(Robortender_exports, {
  currentDrinks: function() {
    return currentDrinks;
  },
  drinks: function() {
    return drinks;
  },
  dropChance: function() {
    return dropChance;
  },
  dropFrom: function() {
    return dropFrom;
  },
  feed: function() {
    return feed;
  },
  have: function() {
    return have25;
  },
  majorDrinks: function() {
    return majorDrinks;
  },
  minorDrinks: function() {
    return minorDrinks;
  }
});
init_kolmafia_polyfill();
var import_kolmafia39 = require("kolmafia");
var _templateObject161, _templateObject260, _templateObject347, _templateObject441, _templateObject527, _templateObject624, _templateObject719, _templateObject819, _templateObject917, _templateObject1016, _templateObject1115, _templateObject1214, _templateObject1313, _templateObject1412, _templateObject1511, _templateObject1611, _templateObject1711, _templateObject1811, _templateObject1911, _templateObject2011, _templateObject2115, _templateObject2214, _templateObject2313, _templateObject2412, _templateObject2511, _templateObject2610, _templateObject2710, _templateObject288, _templateObject297, _templateObject307, _templateObject3112, _templateObject3211, _templateObject3310, _templateObject348, _templateObject357, _templateObject367, _templateObject377;
function _toConsumableArray12(r) {
  return _arrayWithoutHoles12(r) || _iterableToArray12(r) || _unsupportedIterableToArray21(r) || _nonIterableSpread12();
}
function _nonIterableSpread12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray21(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray21(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray21(r, a) : void 0;
  }
}
function _iterableToArray12(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles12(r) {
  if (Array.isArray(r)) return _arrayLikeToArray21(r);
}
function _arrayLikeToArray21(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral30(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar6 = $familiar(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral30(["Robortender"])));
function have25() {
  return (0, import_kolmafia39.haveFamiliar)(familiar6);
}
var phylumDrops = /* @__PURE__ */ new Map([
  [$phylum(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral30(["Bug"]))), $item(_templateObject347 || (_templateObject347 = _taggedTemplateLiteral30(["pickled grasshopper"])))],
  // bottle of anís
  [$phylum(_templateObject441 || (_templateObject441 = _taggedTemplateLiteral30(["Constellation"]))), import_kolmafia39.Item.get(9348)],
  [$phylum(_templateObject527 || (_templateObject527 = _taggedTemplateLiteral30(["Demon"]))), $item(_templateObject624 || (_templateObject624 = _taggedTemplateLiteral30(["bottle of novelty hot sauce"])))],
  [$phylum(_templateObject719 || (_templateObject719 = _taggedTemplateLiteral30(["Elemental"]))), $item(_templateObject819 || (_templateObject819 = _taggedTemplateLiteral30(["elemental sugarcube"])))],
  [$phylum(_templateObject917 || (_templateObject917 = _taggedTemplateLiteral30(["Elf"]))), $item(_templateObject1016 || (_templateObject1016 = _taggedTemplateLiteral30(["peppermint sprig"])))],
  [$phylum(_templateObject1115 || (_templateObject1115 = _taggedTemplateLiteral30(["Fish"]))), $item(_templateObject1214 || (_templateObject1214 = _taggedTemplateLiteral30(["bottle of clam juice"])))],
  [$phylum(_templateObject1313 || (_templateObject1313 = _taggedTemplateLiteral30(["Goblin"]))), $item(_templateObject1412 || (_templateObject1412 = _taggedTemplateLiteral30(["cocktail mushroom"])))],
  [$phylum(_templateObject1511 || (_templateObject1511 = _taggedTemplateLiteral30(["Hippy"]))), $item(_templateObject1611 || (_templateObject1611 = _taggedTemplateLiteral30(["shot of granola liqueur"])))],
  [$phylum(_templateObject1711 || (_templateObject1711 = _taggedTemplateLiteral30(["Hobo"]))), $item(_templateObject1811 || (_templateObject1811 = _taggedTemplateLiteral30(["can of cherry-flavored sterno"])))],
  [$phylum(_templateObject1911 || (_templateObject1911 = _taggedTemplateLiteral30(["Horror"]))), $item(_templateObject2011 || (_templateObject2011 = _taggedTemplateLiteral30(["lump of black ichor"])))],
  [$phylum(_templateObject2115 || (_templateObject2115 = _taggedTemplateLiteral30(["Humanoid"]))), $item(_templateObject2214 || (_templateObject2214 = _taggedTemplateLiteral30(["bottle of gregnadigne"])))],
  // bottle of Crème de Fugu
  [$phylum(_templateObject2313 || (_templateObject2313 = _taggedTemplateLiteral30(["Mer-kin"]))), import_kolmafia39.Item.get(9358)],
  [$phylum(_templateObject2412 || (_templateObject2412 = _taggedTemplateLiteral30(["Orc"]))), $item(_templateObject2511 || (_templateObject2511 = _taggedTemplateLiteral30(["baby oil shooter"])))],
  [$phylum(_templateObject2610 || (_templateObject2610 = _taggedTemplateLiteral30(["Penguin"]))), $item(_templateObject2710 || (_templateObject2710 = _taggedTemplateLiteral30(["fish head"])))],
  [$phylum(_templateObject288 || (_templateObject288 = _taggedTemplateLiteral30(["Pirate"]))), $item(_templateObject297 || (_templateObject297 = _taggedTemplateLiteral30(["limepatch"])))],
  [$phylum(_templateObject307 || (_templateObject307 = _taggedTemplateLiteral30(["Plant"]))), $item(_templateObject3112 || (_templateObject3112 = _taggedTemplateLiteral30(["pile of dirt"])))],
  [$phylum(_templateObject3211 || (_templateObject3211 = _taggedTemplateLiteral30(["Slime"]))), $item(_templateObject3310 || (_templateObject3310 = _taggedTemplateLiteral30(["slime shooter"])))],
  [$phylum(_templateObject348 || (_templateObject348 = _taggedTemplateLiteral30(["Weird"]))), $item(_templateObject357 || (_templateObject357 = _taggedTemplateLiteral30(["imaginary lemon"])))]
]);
function dropFrom(target) {
  var _phylumDrops$get, phylum = target instanceof import_kolmafia39.Monster ? target.phylum : target;
  return (_phylumDrops$get = phylumDrops.get(phylum)) !== null && _phylumDrops$get !== void 0 ? _phylumDrops$get : $item.none;
}
function dropChance() {
  var _dropNumber, dropNumber = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_roboDrops");
  return (_dropNumber = [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber]) !== null && _dropNumber !== void 0 ? _dropNumber : 0.2;
}
var minorDrinks = $items(_templateObject367 || (_templateObject367 = _taggedTemplateLiteral30(["literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini"]))), majorDrinks = $items(_templateObject377 || (_templateObject377 = _taggedTemplateLiteral30(["eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins"]))), drinks = [].concat(_toConsumableArray12(minorDrinks), _toConsumableArray12(majorDrinks));
function currentDrinks() {
  var pref = get("_roboDrinks");
  return pref ? pref.split(",").filter(function(x) {
    return x.trim();
  }).map(function(name) {
    return (0, import_kolmafia39.toItem)(name);
  }).filter(function(drink) {
    return drinks.includes(drink);
  }) : [];
}
function feed(beverage) {
  if (currentDrinks().includes(beverage)) return !0;
  if (currentDrinks().length >= 5 || !drinks.includes(beverage) || !(0, import_kolmafia39.itemAmount)(beverage) || !have25()) return !1;
  var priorFamiliar = (0, import_kolmafia39.myFamiliar)();
  return (0, import_kolmafia39.useFamiliar)(familiar6), (0, import_kolmafia39.visitUrl)("inventory.php?action=robooze&which=1&whichitem=".concat(beverage.id)), (0, import_kolmafia39.useFamiliar)(priorFamiliar), currentDrinks().includes(beverage);
}

// src/resources/2017/Spacegate.ts
var Spacegate_exports = {};
__export(Spacegate_exports, {
  animalLife: function() {
    return animalLife;
  },
  dial: function() {
    return dial;
  },
  dialRandom: function() {
    return dialRandom;
  },
  dialled: function() {
    return dialled;
  },
  getHazardEquipment: function() {
    return getHazardEquipment;
  },
  getVaccine: function() {
    return getVaccine;
  },
  have: function() {
    return have26;
  },
  hazardEquipment: function() {
    return hazardEquipment;
  },
  hazards: function() {
    return hazards;
  },
  hostileLife: function() {
    return hostileLife;
  },
  intelligentLife: function() {
    return intelligentLife;
  },
  murderBots: function() {
    return murderBots;
  },
  planetCoords: function() {
    return planetCoords;
  },
  planetName: function() {
    return planetName;
  },
  plantLife: function() {
    return plantLife;
  },
  ruins: function() {
    return ruins;
  },
  spants: function() {
    return spants;
  },
  updateStatus: function() {
    return updateStatus;
  }
});
init_kolmafia_polyfill();
var import_kolmafia40 = require("kolmafia");
var _templateObject170, _templateObject261, _templateObject349, _templateObject447, _templateObject528;
function _slicedToArray11(r, e) {
  return _arrayWithHoles11(r) || _iterableToArrayLimit11(r, e) || _unsupportedIterableToArray22(r, e) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray22(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray22(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray22(r, a) : void 0;
  }
}
function _arrayLikeToArray22(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit11(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles11(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral31(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have26() {
  return get("spacegateAlways");
}
function updateStatus() {
  (0, import_kolmafia40.visitUrl)("place.php?whichplace=spacegate&action=sg_Terminal");
}
function dialled() {
  return updateStatus(), get("_spacegateCoordinates") !== "" || get("_spacegateToday");
}
function hazards() {
  return get("_spacegateHazards");
}
function planetName() {
  return get("_spacegatePlanetName");
}
function planetCoords() {
  return get("_spacegateCoordinates");
}
function plantLife() {
  return get("_spacegatePlantLife");
}
function animalLife() {
  return get("_spacegateAnimalLife");
}
function intelligentLife() {
  return get("_spacegateIntelligentLife").includes("detected");
}
function hostileLife() {
  return get("_spacegateIntelligentLife").includes("hostile");
}
function ruins() {
  return get("_spacegateRuins");
}
function spants() {
  return get("_spacegateSpant");
}
function murderBots() {
  return get("_spacegateMurderbot");
}
function hazardEquipment(hazards2) {
  var hazardEquipment2 = {
    "toxic atmosphere": $item(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral31(["filter helmet"]))),
    "high gravity": $item(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral31(["exo-servo leg braces"]))),
    irradiated: $item(_templateObject349 || (_templateObject349 = _taggedTemplateLiteral31(["rad cloak"]))),
    "magnetic storms": $item(_templateObject447 || (_templateObject447 = _taggedTemplateLiteral31(["gate transceiver"]))),
    "high winds": $item(_templateObject528 || (_templateObject528 = _taggedTemplateLiteral31(["high-friction boots"])))
  };
  return Object.entries(hazardEquipment2).filter(function(_ref) {
    var _ref2 = _slicedToArray11(_ref, 1), clue = _ref2[0];
    return hazards2.includes(clue);
  }).map(function(_ref3) {
    var _ref4 = _slicedToArray11(_ref3, 2), item14 = _ref4[1];
    return item14;
  });
}
function getHazardEquipment() {
  if (!have26())
    return !1;
  var equipment = hazardEquipment(hazards());
  return equipment.forEach(function(equip5) {
    var num = equip5.id - 9404;
    (0, import_kolmafia40.visitUrl)("place.php?whichplace=spacegate&action=sg_requisition"), (0, import_kolmafia40.visitUrl)("choice.php?whichchoice=1233&option=".concat(num));
  }), equipment.forEach(function(equip5) {
    if ((0, import_kolmafia40.availableAmount)(equip5) !== 1)
      return !1;
  }), !0;
}
function getVaccine(choice) {
  if (get("_spacegateVaccine"))
    return !1;
  var nums = {
    Rainbow: 1,
    "Elemental Resistance": 1,
    "Broad-Spectrum": 2,
    Stats: 2,
    Emotional: 3,
    "Monster Level": 3
  }, num = nums[choice];
  if (!get("spacegateVaccine".concat(num)))
    throw "You don't appear to have that Vaccine Unlocked!";
  return (0, import_kolmafia40.cliExecute)("spacegate vaccine ".concat(num)), get("_spacegateVaccine");
}
function dial(address) {
  if (!have26() || dialled())
    return !1;
  if (!address.match(/^[A-Za-z]+$/) || address.length !== 7)
    throw "Invalid Spacegate Address - must be exactly 7 alphabetic characters";
  return (0, import_kolmafia40.cliExecute)("spacegate destination ".concat(address)), dialled() && planetCoords() === address;
}
function dialRandom() {
  return !have26() || dialled() ? !1 : ((0, import_kolmafia40.cliExecute)("spacegate destination random"), dialled());
}

// src/resources/2017/TunnelOfLove.ts
var TunnelOfLove_exports = {};
__export(TunnelOfLove_exports, {
  LovEnamorang: function() {
    return LovEnamorang;
  },
  couldUseLoveEnamorang: function() {
    return couldUseLoveEnamorang;
  },
  fightAll: function() {
    return fightAll;
  },
  getLovEnamorangMonster: function() {
    return getLovEnamorangMonster;
  },
  getLovEnamorangUses: function() {
    return getLovEnamorangUses;
  },
  have: function() {
    return have27;
  },
  haveLovEnamorang: function() {
    return haveLovEnamorang;
  },
  isUsed: function() {
    return isUsed;
  }
});
init_kolmafia_polyfill();
var import_kolmafia41 = require("kolmafia");
var _templateObject171, _templateObject270;
function _taggedTemplateLiteral32(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have27() {
  return get("loveTunnelAvailable");
}
function isUsed() {
  return get("_loveTunnelUsed");
}
function haveLovEnamorang() {
  return have($item(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral32(["LOV Enamorang"]))));
}
function getLovEnamorangUses() {
  return get("_enamorangs");
}
function couldUseLoveEnamorang() {
  return !haveWandererCounter(Wanderer.Enamorang) && getLovEnamorangUses() < 3 && haveLovEnamorang();
}
function getLovEnamorangMonster() {
  return get("enamorangMonster");
}
var LovEnamorang = new Copier(function() {
  return couldUseLoveEnamorang();
}, null, function() {
  return couldUseLoveEnamorang();
}, function() {
  return getLovEnamorangMonster();
});
function equipmentChoice(equipment) {
  switch (equipment) {
    case "LOV Eardigan":
      return 1;
    case "LOV Epaulettes":
      return 2;
    case "LOV Earring":
      return 3;
  }
}
function effectChoice(effect2) {
  switch (effect2) {
    case "Lovebotamy":
      return 1;
    case "Open Heart Surgery":
      return 2;
    case "Wandering Eye Surgery":
      return 3;
  }
}
function extraChoice(extra) {
  switch (extra) {
    case "LOV Enamorang":
      return 1;
    case "LOV Emotionizer":
      return 2;
    case "LOV Extraterrestrial Chocolate":
      return 3;
    case "LOV Echinacea Bouquet":
      return 4;
    case "LOV Elephant":
      return 5;
    case "toast":
      return 6;
    case null:
      return 7;
  }
}
function fightAll(equipment, effect2, extra) {
  withChoices({
    1222: 1,
    1223: 1,
    1224: equipmentChoice(equipment),
    1225: 1,
    1226: effectChoice(effect2),
    1227: 1,
    1228: extraChoice(extra)
  }, function() {
    (0, import_kolmafia41.adv1)($location(_templateObject270 || (_templateObject270 = _taggedTemplateLiteral32(["The Tunnel of L.O.V.E."]))), 0, "");
  });
}

// src/resources/2018/LatteLoversMembersMug.ts
var LatteLoversMembersMug_exports = {};
__export(LatteLoversMembersMug_exports, {
  currentIngredients: function() {
    return currentIngredients;
  },
  fill: function() {
    return fill;
  },
  have: function() {
    return have28;
  },
  ingredientsUnlocked: function() {
    return ingredientsUnlocked;
  },
  locationOf: function() {
    return locationOf;
  },
  modifierOf: function() {
    return modifierOf;
  },
  refillsRemaining: function() {
    return refillsRemaining;
  },
  sniffedMonster: function() {
    return sniffedMonster;
  }
});
init_kolmafia_polyfill();
var import_kolmafia43 = require("kolmafia");

// src/counter.ts
var counter_exports = {};
__export(counter_exports, {
  exists: function() {
    return exists;
  },
  get: function() {
    return get3;
  },
  set: function() {
    return set;
  }
});
init_kolmafia_polyfill();
var import_kolmafia42 = require("kolmafia");
function get3(counter) {
  var value = (0, import_kolmafia42.getCounter)(counter);
  return value === -1 ? (0, import_kolmafia42.getCounters)(counter, -1, -1).trim() === "" ? 1 / 0 : -1 : value;
}
function exists(counter) {
  return (0, import_kolmafia42.getCounter)(counter) !== -1 || (0, import_kolmafia42.getCounters)(counter, -1, -1).trim() !== "";
}
function set(counter, duration) {
  return (0, import_kolmafia42.cliExecute)("counters add ".concat(duration, " ").concat(counter)), get3(counter) !== null;
}

// src/resources/2018/LatteLoversMembersMug.ts
var _templateObject180, _templateObject271, _templateObject350, _templateObject448, _templateObject529, _templateObject625, _templateObject720, _templateObject820, _templateObject918, _templateObject1017, _templateObject1116, _templateObject1215, _templateObject1314, _templateObject1413, _templateObject1512, _templateObject1612, _templateObject1712, _templateObject1812, _templateObject1912, _templateObject2012, _templateObject2116, _templateObject2215, _templateObject2314, _templateObject2413, _templateObject2512, _templateObject2611, _templateObject2711, _templateObject289, _templateObject298, _templateObject308, _templateObject3113, _templateObject3212, _templateObject3311, _templateObject3410, _templateObject358, _templateObject368, _templateObject378, _templateObject387, _templateObject397, _templateObject407, _templateObject4112, _templateObject4211, _templateObject4310, _templateObject449, _templateObject456, _templateObject465, _templateObject475, _templateObject485, _templateObject495, _templateObject504, _templateObject5110, _templateObject5210, _templateObject534;
function _taggedTemplateLiteral33(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have28() {
  return have($item(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral33(["latte lovers member's mug"]))));
}
function sniffedMonster() {
  return exists("Latte Monster") ? get("_latteMonster") : null;
}
function refillsRemaining() {
  return clamp(3 - get("_latteRefillsUsed"), 0, 3);
}
var INGREDIENTS = {
  ancient: {
    modifier: {
      "Spooky Damage": 50
    },
    location: $location(_templateObject271 || (_templateObject271 = _taggedTemplateLiteral33(["The Mouldering Mansion"])))
  },
  asp: {
    modifier: {
      "Weapon Damage": 25
    },
    location: $location(_templateObject350 || (_templateObject350 = _taggedTemplateLiteral33(["The Middle Chamber"])))
  },
  basil: {
    modifier: {
      "HP Regen Min": 5,
      "HP Regen Max": 5
    },
    location: $location(_templateObject448 || (_templateObject448 = _taggedTemplateLiteral33(["The Overgrown Lot"])))
  },
  belgian: {
    modifier: {
      "Moxie Percent": 20,
      "Mysticality Percent": 20,
      "Muscle Percent": 20
    },
    location: $location(_templateObject529 || (_templateObject529 = _taggedTemplateLiteral33(["Whitey's Grove"])))
  },
  chalk: {
    modifier: {
      "Cold Damage": 25
    },
    location: $location(_templateObject625 || (_templateObject625 = _taggedTemplateLiteral33(["The Haunted Billiards Room"])))
  },
  "bug-thistle": {
    modifier: {
      Mysticality: 20
    },
    location: $location(_templateObject720 || (_templateObject720 = _taggedTemplateLiteral33(["The Bugbear Pen"])))
  },
  butternut: {
    modifier: {
      "Spell Damage": 10
    },
    location: $location(_templateObject820 || (_templateObject820 = _taggedTemplateLiteral33(["Madness Bakery"])))
  },
  cajun: {
    modifier: {
      "Meat Drop": 40
    },
    location: $location(_templateObject918 || (_templateObject918 = _taggedTemplateLiteral33(["The Black Forest"])))
  },
  carrot: {
    modifier: {
      "Item Drop": 20
    },
    location: $location(_templateObject1017 || (_templateObject1017 = _taggedTemplateLiteral33(["The Dire Warren"])))
  },
  carrrdamom: {
    modifier: {
      "MP Regen Min": 4,
      "MP Regen Max": 6
    },
    location: $location(_templateObject1116 || (_templateObject1116 = _taggedTemplateLiteral33(["Barrrney's Barrr"])))
  },
  chili: {
    modifier: {
      "Hot Resistance": 3
    },
    location: $location(_templateObject1215 || (_templateObject1215 = _taggedTemplateLiteral33(["The Haunted Kitchen"])))
  },
  clove: {
    modifier: {
      "Stench Resistance": 3
    },
    location: $location(_templateObject1314 || (_templateObject1314 = _taggedTemplateLiteral33(["The Sleazy Back Alley"])))
  },
  coal: {
    modifier: {
      "Hot Damage": 25
    },
    location: $location(_templateObject1413 || (_templateObject1413 = _taggedTemplateLiteral33(["The Haunted Boiler Room"])))
  },
  cocoa: {
    modifier: {
      "Cold Resistance": 3
    },
    location: $location(_templateObject1512 || (_templateObject1512 = _taggedTemplateLiteral33(["The Icy Peak"])))
  },
  diet: {
    modifier: {
      Initiative: 50
    },
    location: $location(_templateObject1612 || (_templateObject1612 = _taggedTemplateLiteral33(["Battlefield (No Uniform)"])))
  },
  dwarf: {
    modifier: {
      Muscle: 30
    },
    location: $location(_templateObject1712 || (_templateObject1712 = _taggedTemplateLiteral33(["Itznotyerzitz Mine"])))
  },
  dyspepsi: {
    modifier: {
      Initiative: 25
    },
    location: $location(_templateObject1812 || (_templateObject1812 = _taggedTemplateLiteral33(["Battlefield (Dyspepsi Uniform)"])))
  },
  filth: {
    modifier: {
      "Damage Reduction": 20
    },
    location: $location(_templateObject1912 || (_templateObject1912 = _taggedTemplateLiteral33(["The Feeding Chamber"])))
  },
  grass: {
    modifier: {
      Experience: 3
    },
    location: $location(_templateObject2012 || (_templateObject2012 = _taggedTemplateLiteral33(["The Hidden Park"])))
  },
  fungus: {
    modifier: {
      "Maximum MP": 30
    },
    location: $location(_templateObject2116 || (_templateObject2116 = _taggedTemplateLiteral33(["The Fungal Nethers"])))
  },
  mold: {
    modifier: {
      "Spooky Damage": 20
    },
    location: $location(_templateObject2215 || (_templateObject2215 = _taggedTemplateLiteral33(["The Unquiet Garves"])))
  },
  greek: {
    modifier: {
      "Sleaze Damage": 25
    },
    location: $location(_templateObject2314 || (_templateObject2314 = _taggedTemplateLiteral33(["Wartime Frat House"])))
  },
  grobold: {
    modifier: {
      "Sleaze Damage": 25
    },
    location: $location(_templateObject2413 || (_templateObject2413 = _taggedTemplateLiteral33(["The Old Rubee Mine"])))
  },
  guarna: {
    modifier: {
      Adventures: 4
    },
    location: $location(_templateObject2512 || (_templateObject2512 = _taggedTemplateLiteral33(["The Bat Hole Entrance"])))
  },
  gunpowder: {
    modifier: {
      "Weapon Damage": 50
    },
    location: $location(_templateObject2611 || (_templateObject2611 = _taggedTemplateLiteral33(["1st Floor, Shiawase-Mitsuhama Building"])))
  },
  healing: {
    modifier: {
      "HP Regen Min": 10,
      "HP Regen Max": 20
    },
    location: $location(_templateObject2711 || (_templateObject2711 = _taggedTemplateLiteral33(["The Daily Dungeon"])))
  },
  hellion: {
    modifier: {
      "PvP Fights": 6
    },
    location: $location(_templateObject289 || (_templateObject289 = _taggedTemplateLiteral33(["The Dark Neck of the Woods"])))
  },
  hobo: {
    modifier: {
      "Damage Absorption": 50
    },
    location: $location(_templateObject298 || (_templateObject298 = _taggedTemplateLiteral33(["Hobopolis Town Square"])))
  },
  greasy: {
    modifier: {
      "Muscle Percent": 50
    },
    location: $location(_templateObject308 || (_templateObject308 = _taggedTemplateLiteral33(["Cobb's Knob Barracks"])))
  },
  wing: {
    modifier: {
      "Combat Rate": 10
    },
    location: $location(_templateObject3113 || (_templateObject3113 = _taggedTemplateLiteral33(["The Dark Heart of the Woods"])))
  },
  ink: {
    modifier: {
      "Combat Rate": -10
    },
    location: $location(_templateObject3212 || (_templateObject3212 = _taggedTemplateLiteral33(["The Haunted Library"])))
  },
  kombucha: {
    modifier: {
      "Stench Damage": 25
    },
    location: $location(_templateObject3311 || (_templateObject3311 = _taggedTemplateLiteral33(["Wartime Hippy Camp"])))
  },
  lihc: {
    modifier: {
      "Spooky Damage": 25
    },
    location: $location(_templateObject3410 || (_templateObject3410 = _taggedTemplateLiteral33(["The Defiled Niche"])))
  },
  lizard: {
    modifier: {
      "MP Regen Min": 5,
      "MP Regen Max": 15
    },
    location: $location(_templateObject358 || (_templateObject358 = _taggedTemplateLiteral33(["The Arid, Extra-Dry Desert"])))
  },
  macaroni: {
    modifier: {
      "Maximum HP": 20
    },
    location: $location(_templateObject368 || (_templateObject368 = _taggedTemplateLiteral33(["The Haunted Pantry"])))
  },
  mega: {
    modifier: {
      "Moxie Percent": 50
    },
    location: $location(_templateObject378 || (_templateObject378 = _taggedTemplateLiteral33(["Cobb's Knob Laboratory"])))
  },
  oil: {
    modifier: {
      "Sleaze Damage": 20
    },
    location: $location(_templateObject387 || (_templateObject387 = _taggedTemplateLiteral33(["The Old Landfill"])))
  },
  msg: {
    modifier: {
      "Critical Hit Percent": 15
    },
    location: $location(_templateObject397 || (_templateObject397 = _taggedTemplateLiteral33(["The Briniest Deepests"])))
  },
  norwhal: {
    modifier: {
      "Maximum HP Percent": 200
    },
    location: $location(_templateObject407 || (_templateObject407 = _taggedTemplateLiteral33(["The Ice Hole"])))
  },
  paint: {
    modifier: {
      "Prismatic Damage": 5
    },
    location: $location(_templateObject4112 || (_templateObject4112 = _taggedTemplateLiteral33(["The Haunted Gallery"])))
  },
  paradise: {
    modifier: {
      Moxie: 20,
      Muscle: 20,
      Mysticality: 20
    },
    location: $location(_templateObject4211 || (_templateObject4211 = _taggedTemplateLiteral33(["The Stately Pleasure Dome"])))
  },
  rawhide: {
    modifier: {
      "Familiar Weight": 5
    },
    location: $location(_templateObject4310 || (_templateObject4310 = _taggedTemplateLiteral33(["The Spooky Forest"])))
  },
  rock: {
    modifier: {
      "Critical Hit Percent": 10
    },
    location: $location(_templateObject449 || (_templateObject449 = _taggedTemplateLiteral33(["The Brinier Deepers"])))
  },
  salt: {
    modifier: {
      "Critical Hit Percent": 5
    },
    location: $location(_templateObject456 || (_templateObject456 = _taggedTemplateLiteral33(["The Briny Deeps"])))
  },
  sandalwood: {
    modifier: {
      Moxie: 5,
      Muscle: 5,
      Mysticality: 5
    },
    location: $location(_templateObject465 || (_templateObject465 = _taggedTemplateLiteral33(["Noob Cave"])))
  },
  sausage: {
    modifier: {
      "Mysticality Percent": 50
    },
    location: $location(_templateObject475 || (_templateObject475 = _taggedTemplateLiteral33(["Cobb's Knob Kitchens"])))
  },
  space: {
    modifier: {
      Moxie: 10,
      Muscle: 10,
      Mysticality: 10
    },
    location: $location(_templateObject485 || (_templateObject485 = _taggedTemplateLiteral33(["The Hole in the Sky"])))
  },
  squash: {
    modifier: {
      "Spell Damage": 10
    },
    location: $location(_templateObject495 || (_templateObject495 = _taggedTemplateLiteral33(["The Copperhead Club"])))
  },
  teeth: {
    modifier: {
      "Spooky Damage": 25,
      "Weapon Damage": 25
    },
    location: $location(_templateObject504 || (_templateObject504 = _taggedTemplateLiteral33(["The VERY Unquiet Garves"])))
  },
  vitamin: {
    modifier: {
      "Familiar Experience": 3
    },
    location: $location(_templateObject5110 || (_templateObject5110 = _taggedTemplateLiteral33(["The Dark Elbow of the Woods"])))
  },
  flour: {
    modifier: {
      "Sleaze Resistance": 3
    },
    location: $location(_templateObject5210 || (_templateObject5210 = _taggedTemplateLiteral33(["The Road to the White Citadel"])))
  },
  squamous: {
    modifier: {
      "Spooky Resistance": 3
    },
    location: $location(_templateObject534 || (_templateObject534 = _taggedTemplateLiteral33(["The Caliginous Abyss"])))
  },
  pumpkin: {
    modifier: {
      "Mysticality Experience": 1,
      "Spell Damage": 5,
      "Mysticality Percent": 5
    },
    location: null
  },
  cinnamon: {
    modifier: {
      "Moxie Experience": 1,
      "Pickpocket Rate": 5,
      "Moxie Percent": 5
    },
    location: null
  },
  vanilla: {
    modifier: {
      "Muscle Experience": 1,
      "Weapon Damage Percent": 5,
      "Muscle Percent": 5
    },
    location: null
  }
};
function ingredientsUnlocked() {
  return get("latteUnlocks").split(",");
}
function fill() {
  if (refillsRemaining() <= 0) return !1;
  for (var _len = arguments.length, ingredients = new Array(_len), _key = 0; _key < _len; _key++)
    ingredients[_key] = arguments[_key];
  return new Set(ingredients).size < 3 || ingredients.some(function(i) {
    return !ingredientsUnlocked().includes(i);
  }) ? !1 : (0, import_kolmafia43.cliExecute)("latte refill ".concat(ingredients.join(" ")));
}
function modifierOf(ingredient) {
  return INGREDIENTS[ingredient].modifier;
}
function locationOf(ingredient) {
  return INGREDIENTS[ingredient].location;
}
function currentIngredients() {
  return (0, import_kolmafia43.getProperty)("latteIngredients").split(",");
}

// src/resources/2018/SongBoom.ts
var SongBoom_exports = {};
__export(SongBoom_exports, {
  dropProgress: function() {
    return dropProgress;
  },
  have: function() {
    return have29;
  },
  setSong: function() {
    return setSong;
  },
  song: function() {
    return song;
  },
  songBoomSongs: function() {
    return songBoomSongs;
  },
  songChangesLeft: function() {
    return songChangesLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia44 = require("kolmafia");
var _templateObject181;
function _taggedTemplateLiteral34(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item3 = $item(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral34(["SongBoom\u2122 BoomBox"])));
function have29() {
  return have(item3);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
}, songBoomSongs = new Set(Object.keys(keywords));
function song() {
  var stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
function songChangesLeft() {
  return get("_boomBoxSongsLeft");
}
function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    return (0, import_kolmafia44.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none")), !0;
  } else
    return !1;
}
function dropProgress() {
  return get("_boomBoxFights");
}

// src/resources/2019/BeachComb.ts
var BeachComb_exports = {};
__export(BeachComb_exports, {
  available: function() {
    return available3;
  },
  canComb: function() {
    return canComb;
  },
  comb: function() {
    return comb;
  },
  freeCombs: function() {
    return freeCombs;
  },
  have: function() {
    return have30;
  },
  head: function() {
    return head;
  },
  headAvailable: function() {
    return headAvailable;
  },
  headBuffs: function() {
    return headBuffs;
  },
  tideLevel: function() {
    return tideLevel;
  },
  tryHead: function() {
    return tryHead;
  }
});
init_kolmafia_polyfill();
var import_kolmafia45 = require("kolmafia");
var _templateObject190, _templateObject280, _templateObject351, _templateObject450, _templateObject530, _templateObject626, _templateObject721, _templateObject821, _templateObject919, _templateObject1018, _templateObject1117, _templateObject1216, _templateObject1315, _templateObject1414, _templateObject1513, _templateObject1613, _templateObject1713, _templateObject1813, _templateObject1913, _templateObject2013, _templateObject2117;
function _taggedTemplateLiteral35(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have30() {
  return have(import_kolmafia45.Item.get("Beach Comb"));
}
function available3() {
  return have30() || have(import_kolmafia45.Item.get("driftwood beach comb"));
}
var headBuffs = [$effect(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral35(["Hot-Headed"]))), $effect(_templateObject280 || (_templateObject280 = _taggedTemplateLiteral35(["Cold as Nice"]))), $effect(_templateObject351 || (_templateObject351 = _taggedTemplateLiteral35(["A Brush with Grossness"]))), $effect(_templateObject450 || (_templateObject450 = _taggedTemplateLiteral35(["Does It Have a Skull In There??"]))), $effect(_templateObject530 || (_templateObject530 = _taggedTemplateLiteral35(["Oiled, Slick"]))), $effect(_templateObject626 || (_templateObject626 = _taggedTemplateLiteral35(["Lack of Body-Building"]))), $effect(_templateObject721 || (_templateObject721 = _taggedTemplateLiteral35(["We're All Made of Starfish"]))), $effect(_templateObject821 || (_templateObject821 = _taggedTemplateLiteral35(["Pomp & Circumsands"]))), $effect(_templateObject919 || (_templateObject919 = _taggedTemplateLiteral35(["Resting Beach Face"]))), $effect(_templateObject1018 || (_templateObject1018 = _taggedTemplateLiteral35(["Do I Know You From Somewhere?"]))), $effect(_templateObject1117 || (_templateObject1117 = _taggedTemplateLiteral35(["You Learned Something Maybe!"])))], head = {
  HOT: $effect(_templateObject1216 || (_templateObject1216 = _taggedTemplateLiteral35(["Hot-Headed"]))),
  COLD: $effect(_templateObject1315 || (_templateObject1315 = _taggedTemplateLiteral35(["Cold as Nice"]))),
  STENCH: $effect(_templateObject1414 || (_templateObject1414 = _taggedTemplateLiteral35(["A Brush with Grossness"]))),
  SPOOKY: $effect(_templateObject1513 || (_templateObject1513 = _taggedTemplateLiteral35(["Does It Have a Skull In There??"]))),
  SLEAZE: $effect(_templateObject1613 || (_templateObject1613 = _taggedTemplateLiteral35(["Oiled, Slick"]))),
  MUSCLE: $effect(_templateObject1713 || (_templateObject1713 = _taggedTemplateLiteral35(["Lack of Body-Building"]))),
  MYSTICALITY: $effect(_templateObject1813 || (_templateObject1813 = _taggedTemplateLiteral35(["We're All Made of Starfish"]))),
  INITIATIVE: $effect(_templateObject1913 || (_templateObject1913 = _taggedTemplateLiteral35(["Resting Beach Face"]))),
  FAMILIAR: $effect(_templateObject2013 || (_templateObject2013 = _taggedTemplateLiteral35(["Do I Know You From Somewhere?"]))),
  EXPERIENCE: $effect(_templateObject2117 || (_templateObject2117 = _taggedTemplateLiteral35(["You Learned Something Maybe!"])))
};
function tideLevel() {
  var day = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia45.gamedayToInt)(), dayOfMonth = 1 + day % 8;
  return 4 - Math.abs(4 - dayOfMonth);
}
function canComb(tile) {
  return tile.row > tideLevel();
}
function freeCombs() {
  return available3() ? clamp(11 - get("_freeBeachWalksUsed"), 0, 11) : 0;
}
function comb() {
  for (var _len = arguments.length, tiles = new Array(_len), _key = 0; _key < _len; _key++)
    tiles[_key] = arguments[_key];
  if (!(!available3() || !tiles.length)) {
    for (var _i = 0, _tiles = tiles; _i < _tiles.length; _i++) {
      var tile = _tiles[_i];
      if (canComb(tile)) {
        var minute = tile.minute, row = tile.row, column = tile.column;
        (0, import_kolmafia45.cliExecute)("beach wander ".concat(minute)), (0, import_kolmafia45.cliExecute)("beach comb ".concat(row, " ").concat(column));
      }
    }
    (0, import_kolmafia45.handlingChoice)() && (0, import_kolmafia45.runChoice)(5);
  }
}
function headAvailable(target) {
  var effect2 = target instanceof import_kolmafia45.Effect ? target : head[target], headNumber = 1 + headBuffs.indexOf(effect2);
  return (0, import_kolmafia45.getProperty)("beachHeadsUnlocked").split(",").includes(headNumber.toString()) && !(0, import_kolmafia45.getProperty)("_beachHeadsUsed").split(",").includes(headNumber.toString());
}
function tryHead(target) {
  var effect2 = target instanceof import_kolmafia45.Effect ? target : head[target];
  return !headBuffs.includes(effect2) || !headAvailable(target) ? !1 : ((0, import_kolmafia45.cliExecute)(effect2.default), have(effect2));
}

// src/resources/2019/CampAway.ts
var CampAway_exports = {};
__export(CampAway_exports, {
  blowSmoke: function() {
    return blowSmoke;
  },
  canGaze: function() {
    return canGaze;
  },
  gaze: function() {
    return gaze;
  },
  getBuffsToday: function() {
    return getBuffsToday;
  },
  getCloudBuffsToday: function() {
    return getCloudBuffsToday;
  },
  getGazeBuff: function() {
    return getGazeBuff;
  },
  getSmileBuffsToday: function() {
    return getSmileBuffsToday;
  },
  have: function() {
    return have31;
  }
});
init_kolmafia_polyfill();
var import_kolmafia46 = require("kolmafia");
var _templateObject191;
function _taggedTemplateLiteral36(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have31() {
  return get("getawayCampsiteUnlocked");
}
function getCloudBuffsToday() {
  return get("_campAwayCloudBuffs");
}
function getSmileBuffsToday() {
  return get("_campAwaySmileBuffs");
}
function getBuffsToday() {
  return getCloudBuffsToday() + getSmileBuffsToday();
}
function canGaze() {
  return getBuffsToday() < 4;
}
function gaze() {
  canGaze() && (0, import_kolmafia46.visitUrl)("place.php?whichplace=campaway&action=campaway_sky");
}
function getGazeBuff() {
  var daycountToCheck = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia46.daycount)(), buffSign = signIdToName((daycountToCheck + (0, import_kolmafia46.myPath)().id) % 9 + 1), effectName = [];
  return buffSign === (0, import_kolmafia46.mySign)() && effectName.push("Big"), effectName.push("Smile of the", buffSign), import_kolmafia46.Effect.get(effectName.join(" "));
}
function blowSmoke(messages) {
  var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, smoke = $item(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral36(["campfire smoke"])));
  (0, import_kolmafia46.retrieveItem)(smoke, times);
  for (var i = 0; i < times; i++)
    withChoice(1394, "1&message=".concat(random(messages)), function() {
      (0, import_kolmafia46.use)(smoke);
    });
}

// src/resources/2019/PocketProfessor.ts
var PocketProfessor_exports = {};
__export(PocketProfessor_exports, {
  canThesis: function() {
    return canThesis;
  },
  currentlyAvailableLectures: function() {
    return currentlyAvailableLectures;
  },
  have: function() {
    return have32;
  },
  lecturesDelivered: function() {
    return lecturesDelivered;
  },
  totalAvailableLectures: function() {
    return totalAvailableLectures;
  }
});
init_kolmafia_polyfill();
var import_kolmafia47 = require("kolmafia");
var _templateObject200, _templateObject281, _templateObject359;
function _taggedTemplateLiteral37(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar7 = $familiar(_templateObject200 || (_templateObject200 = _taggedTemplateLiteral37(["Pocket Professor"])));
function have32() {
  return have(familiar7);
}
function canThesis() {
  return have32() && familiar7.experience >= 400 && !get("_thesisDelivered");
}
function totalAvailableLectures() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : totalFamiliarWeight(familiar7), includeChip = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, import_kolmafia47.haveEquipped)($item(_templateObject281 || (_templateObject281 = _taggedTemplateLiteral37(["Pocket Professor memory chip"]))));
  return (includeChip ? 2 : 0) + Math.floor(Math.sqrt(weight - 1));
}
function lecturesDelivered() {
  return get("_pocketProfessorLectures");
}
function currentlyAvailableLectures() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : totalFamiliarWeight(familiar7), includeChip = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, import_kolmafia47.haveEquipped)($item(_templateObject359 || (_templateObject359 = _taggedTemplateLiteral37(["Pocket Professor memory chip"]))));
  return totalAvailableLectures(weight, includeChip) - lecturesDelivered();
}

// src/resources/2019/Snapper.ts
var Snapper_exports = {};
__export(Snapper_exports, {
  getProgress: function() {
    return getProgress;
  },
  getTrackedPhylum: function() {
    return getTrackedPhylum;
  },
  have: function() {
    return have33;
  },
  itemPhylum: function() {
    return itemPhylum;
  },
  phylumItem: function() {
    return phylumItem;
  },
  trackPhylum: function() {
    return trackPhylum;
  }
});
init_kolmafia_polyfill();
var import_kolmafia48 = require("kolmafia");
function _slicedToArray12(r, e) {
  return _arrayWithHoles12(r) || _iterableToArrayLimit12(r, e) || _unsupportedIterableToArray23(r, e) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit12(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles12(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray13(r) {
  return _arrayWithoutHoles13(r) || _iterableToArray13(r) || _unsupportedIterableToArray23(r) || _nonIterableSpread13();
}
function _nonIterableSpread13() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray23(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray23(r, a) : void 0;
  }
}
function _iterableToArray13(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles13(r) {
  if (Array.isArray(r)) return _arrayLikeToArray23(r);
}
function _arrayLikeToArray23(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var familiar8 = import_kolmafia48.Familiar.get("Red-Nosed Snapper"), phylumItem = /* @__PURE__ */ new Map([[import_kolmafia48.Phylum.get("beast"), import_kolmafia48.Item.get("patch of extra-warm fur")], [import_kolmafia48.Phylum.get("bug"), import_kolmafia48.Item.get("a bug's lymph")], [import_kolmafia48.Phylum.get("constellation"), import_kolmafia48.Item.get("micronova")], [import_kolmafia48.Phylum.get("construct"), import_kolmafia48.Item.get("industrial lubricant")], [import_kolmafia48.Phylum.get("demon"), import_kolmafia48.Item.get("infernal snowball")], [import_kolmafia48.Phylum.get("dude"), import_kolmafia48.Item.get("human musk")], [import_kolmafia48.Phylum.get("elemental"), import_kolmafia48.Item.get("livid energy")], [import_kolmafia48.Phylum.get("elf"), import_kolmafia48.Item.get("peppermint syrup")], [import_kolmafia48.Phylum.get("fish"), import_kolmafia48.Item.get("fish sauce")], [import_kolmafia48.Phylum.get("goblin"), import_kolmafia48.Item.get("guffin")], [import_kolmafia48.Phylum.get("hippy"), import_kolmafia48.Item.get("organic potpourri")], [import_kolmafia48.Phylum.get("hobo"), import_kolmafia48.Item.get("beggin' cologne")], [import_kolmafia48.Phylum.get("horror"), import_kolmafia48.Item.get("powdered madness")], [import_kolmafia48.Phylum.get("humanoid"), import_kolmafia48.Item.get("vial of humanoid growth hormone")], [import_kolmafia48.Phylum.get("mer-kin"), import_kolmafia48.Item.get("Mer-kin eyedrops")], [import_kolmafia48.Phylum.get("orc"), import_kolmafia48.Item.get("boot flask")], [import_kolmafia48.Phylum.get("penguin"), import_kolmafia48.Item.get("envelope full of Meat")], [import_kolmafia48.Phylum.get("pirate"), import_kolmafia48.Item.get("Shantix\u2122")], [import_kolmafia48.Phylum.get("plant"), import_kolmafia48.Item.get("goodberry")], [import_kolmafia48.Phylum.get("slime"), import_kolmafia48.Item.get("extra-strength goo")], [import_kolmafia48.Phylum.get("undead"), import_kolmafia48.Item.get("unfinished pleasure")], [import_kolmafia48.Phylum.get("weird"), import_kolmafia48.Item.get("non-Euclidean angle")]]), itemPhylum = new Map(_toConsumableArray13(phylumItem).map(function(_ref) {
  var _ref2 = _slicedToArray12(_ref, 2), phylum = _ref2[0], item14 = _ref2[1];
  return [item14, phylum];
}));
function have33() {
  return (0, import_kolmafia48.haveFamiliar)(familiar8);
}
function getTrackedPhylum() {
  return get("redSnapperPhylum");
}
function trackPhylum(phylum) {
  var currentFamiliar2 = (0, import_kolmafia48.myFamiliar)();
  try {
    (0, import_kolmafia48.useFamiliar)(familiar8), (0, import_kolmafia48.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0, import_kolmafia48.useFamiliar)(currentFamiliar2);
  }
}
function getProgress() {
  return get("redSnapperProgress");
}

// src/resources/2020/Cartography.ts
var Cartography_exports = {};
__export(Cartography_exports, {
  availableMaps: function() {
    return availableMaps;
  },
  currentlyMapping: function() {
    return currentlyMapping;
  },
  have: function() {
    return have34;
  },
  mapMonster: function() {
    return mapMonster;
  }
});
init_kolmafia_polyfill();
var import_kolmafia49 = require("kolmafia");
var _templateObject201, _templateObject290, _templateObject360;
function _taggedTemplateLiteral38(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var passive = $skill(_templateObject201 || (_templateObject201 = _taggedTemplateLiteral38(["Comprehensive Cartography"])));
function have34() {
  return have(passive);
}
function mapMonster(location, monster) {
  if (!have34() || get("_monstersMapped") >= 3 || !(0, import_kolmafia49.canAdventure)(location) || ((0, import_kolmafia49.useSkill)($skill(_templateObject290 || (_templateObject290 = _taggedTemplateLiteral38(["Map the Monsters"])))), !get("mappingMonsters"))) return !1;
  for (var turns2 = (0, import_kolmafia49.myTurncount)(); (0, import_kolmafia49.currentRound)() < 1; ) {
    if ((0, import_kolmafia49.myTurncount)() > turns2)
      throw new Error("Map the Monsters unsuccessful?");
    if ((0, import_kolmafia49.visitUrl)((0, import_kolmafia49.toUrl)(location)), (0, import_kolmafia49.handlingChoice)() && (0, import_kolmafia49.lastChoice)() === 1435)
      return (0, import_kolmafia49.runChoice)(1, "heyscriptswhatsupwinkwink=".concat(monster.id)), !0;
    (0, import_kolmafia49.runChoice)(-1, !1);
  }
  return !1;
}
function availableMaps() {
  return have34() ? $skill(_templateObject360 || (_templateObject360 = _taggedTemplateLiteral38(["Map the Monsters"]))).dailylimit : 0;
}
function currentlyMapping() {
  return get("mappingMonsters");
}

// src/resources/2020/Guzzlr.ts
var Guzzlr_exports = {};
__export(Guzzlr_exports, {
  Cocktails: function() {
    return Cocktails;
  },
  abandon: function() {
    return abandon;
  },
  acceptBronze: function() {
    return acceptBronze;
  },
  acceptGold: function() {
    return acceptGold;
  },
  acceptPlatinum: function() {
    return acceptPlatinum;
  },
  canAbandon: function() {
    return canAbandon;
  },
  canGold: function() {
    return canGold;
  },
  canPlatinum: function() {
    return canPlatinum;
  },
  expectedReward: function() {
    return expectedReward;
  },
  getBooze: function() {
    return getBooze;
  },
  getBronze: function() {
    return getBronze;
  },
  getCheapestPlatinumCocktail: function() {
    return getCheapestPlatinumCocktail;
  },
  getGold: function() {
    return getGold;
  },
  getGoldToday: function() {
    return getGoldToday;
  },
  getLocation: function() {
    return getLocation2;
  },
  getPlatinum: function() {
    return getPlatinum;
  },
  getPlatinumToday: function() {
    return getPlatinumToday;
  },
  getTier: function() {
    return getTier;
  },
  have: function() {
    return have35;
  },
  haveBooze: function() {
    return haveBooze;
  },
  haveFullBronzeBonus: function() {
    return haveFullBronzeBonus;
  },
  haveFullGoldBonus: function() {
    return haveFullGoldBonus;
  },
  haveFullPlatinumBonus: function() {
    return haveFullPlatinumBonus;
  },
  havePlatinumBooze: function() {
    return havePlatinumBooze;
  },
  ingredientToPlatinumCocktail: function() {
    return ingredientToPlatinumCocktail;
  },
  isQuestActive: function() {
    return isQuestActive;
  },
  platinumCocktailToIngredient: function() {
    return platinumCocktailToIngredient;
  },
  turnsLeftOnQuest: function() {
    return turnsLeftOnQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia50 = require("kolmafia");
var _templateObject291, _templateObject299, _templateObject361, _templateObject451, _templateObject531, _templateObject627, _templateObject724, _templateObject824, _templateObject920, _templateObject1019, _templateObject1118, _templateObject1217, _templateObject1316;
function _slicedToArray13(r, e) {
  return _arrayWithHoles13(r) || _iterableToArrayLimit13(r, e) || _unsupportedIterableToArray24(r, e) || _nonIterableRest13();
}
function _nonIterableRest13() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit13(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles13(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray14(r) {
  return _arrayWithoutHoles14(r) || _iterableToArray14(r) || _unsupportedIterableToArray24(r) || _nonIterableSpread14();
}
function _nonIterableSpread14() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray24(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray24(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray24(r, a) : void 0;
  }
}
function _iterableToArray14(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles14(r) {
  if (Array.isArray(r)) return _arrayLikeToArray24(r);
}
function _arrayLikeToArray24(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral39(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item4 = $item(_templateObject291 || (_templateObject291 = _taggedTemplateLiteral39(["Guzzlr tablet"])));
function have35() {
  return have(item4);
}
function useTabletWithChoice(option) {
  withChoice(1412, option, function() {
    return (0, import_kolmafia50.use)(1, item4);
  });
}
function isQuestActive() {
  return get("questGuzzlr") !== "unstarted";
}
function getPlatinum() {
  return get("guzzlrPlatinumDeliveries");
}
function getPlatinumToday() {
  return get("_guzzlrPlatinumDeliveries");
}
function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
function acceptPlatinum() {
  return canPlatinum() ? (useTabletWithChoice(4), !0) : !1;
}
function getGold() {
  return get("guzzlrGoldDeliveries");
}
function getGoldToday() {
  return get("_guzzlrGoldDeliveries");
}
function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
function haveFullGoldBonus() {
  return getGold() >= 150;
}
function acceptGold() {
  return canGold() ? (useTabletWithChoice(3), !0) : !1;
}
function getBronze() {
  return get("guzzlrBronzeDeliveries");
}
function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
function acceptBronze() {
  return isQuestActive() ? !1 : (useTabletWithChoice(2), !0);
}
function canAbandon() {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}
function abandon() {
  return canAbandon() ? ((0, import_kolmafia50.visitUrl)("inventory.php?tap=guzzlr", !1), (0, import_kolmafia50.runChoice)(1), (0, import_kolmafia50.runChoice)(5), !0) : !1;
}
function getLocation2() {
  return get("guzzlrQuestLocation");
}
function getTier() {
  var tier = get("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
function getBooze() {
  var booze = get("guzzlrQuestBooze");
  return booze === "" ? null : import_kolmafia50.Item.get(booze);
}
var Cocktails = $items(_templateObject299 || (_templateObject299 = _taggedTemplateLiteral39(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
function havePlatinumBooze() {
  return Cocktails.some(function(cock) {
    return (0, import_kolmafia50.itemAmount)(cock) > 0;
  });
}
function haveBooze() {
  var booze = getBooze();
  switch (booze) {
    case null:
      return !1;
    case $item(_templateObject361 || (_templateObject361 = _taggedTemplateLiteral39(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();
    default:
      return (0, import_kolmafia50.itemAmount)(booze) > 0;
  }
}
var ingredientToPlatinumCocktail = /* @__PURE__ */ new Map([[$item(_templateObject451 || (_templateObject451 = _taggedTemplateLiteral39(["miniature boiler"]))), $item(_templateObject531 || (_templateObject531 = _taggedTemplateLiteral39(["Steamboat"])))], [$item(_templateObject627 || (_templateObject627 = _taggedTemplateLiteral39(["cold wad"]))), $item(_templateObject724 || (_templateObject724 = _taggedTemplateLiteral39(["Ghiaccio Colada"])))], [$item(_templateObject824 || (_templateObject824 = _taggedTemplateLiteral39(["robin's egg"]))), $item(_templateObject920 || (_templateObject920 = _taggedTemplateLiteral39(["Nog-on-the-Cob"])))], [$item(_templateObject1019 || (_templateObject1019 = _taggedTemplateLiteral39(["mangled finger"]))), $item(_templateObject1118 || (_templateObject1118 = _taggedTemplateLiteral39(["Sourfinger"])))], [$item(_templateObject1217 || (_templateObject1217 = _taggedTemplateLiteral39(["Dish of Clarified Butter"]))), $item(_templateObject1316 || (_templateObject1316 = _taggedTemplateLiteral39(["Buttery Boy"])))]]), platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return freeCraft ? maxBy(Array.from(ingredientToPlatinumCocktail), function(ingredientAndCocktail) {
    return Math.min.apply(Math, _toConsumableArray14(ingredientAndCocktail.map(function(item14) {
      return (0, import_kolmafia50.mallPrice)(item14);
    })));
  }, !0)[1] : maxBy(Array.from(ingredientToPlatinumCocktail), function(_ref) {
    var _ref2 = _slicedToArray13(_ref, 2), cocktail = _ref2[1];
    return (0, import_kolmafia50.mallPrice)(cocktail);
  })[1];
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
  switch (getTier()) {
    case "platinum":
      return 22.5 + (usePants ? 5 : 0);
    case "gold":
      return 6 + (usePants ? 3 : 0);
    case "bronze":
      return 3 + (usePants ? 3 : 0);
    default:
      return 0;
  }
}

// src/resources/2020/RetroCape.ts
var RetroCape_exports = {};
__export(RetroCape_exports, {
  currentHero: function() {
    return currentHero;
  },
  currentMode: function() {
    return currentMode;
  },
  getModifier: function() {
    return getModifier2;
  },
  have: function() {
    return have36;
  },
  set: function() {
    return set2;
  },
  tuneToSkill: function() {
    return tuneToSkill;
  }
});
init_kolmafia_polyfill();
var import_kolmafia51 = require("kolmafia");
var _templateObject300, _templateObject2100, _templateObject369, _templateObject457, _templateObject535, _templateObject628, _templateObject725;
function _toConsumableArray15(r) {
  return _arrayWithoutHoles15(r) || _iterableToArray15(r) || _unsupportedIterableToArray25(r) || _nonIterableSpread15();
}
function _nonIterableSpread15() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray25(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray25(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray25(r, a) : void 0;
  }
}
function _iterableToArray15(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles15(r) {
  if (Array.isArray(r)) return _arrayLikeToArray25(r);
}
function _arrayLikeToArray25(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function ownKeys6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys6(Object(t), !0).forEach(function(r2) {
      _defineProperty14(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty14(e, r, t) {
  return (r = _toPropertyKey15(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey15(t) {
  var i = _toPrimitive15(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive15(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _taggedTemplateLiteral40(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item5 = $item(_templateObject300 || (_templateObject300 = _taggedTemplateLiteral40(["unwrapped knock-off retro superhero cape"])));
function have36() {
  return have(item5);
}
var Heroes = {
  vampire: {
    "Muscle Percent": 30,
    "Maximum HP": 50
  },
  heck: {
    "Mysticality Percent": 30,
    "Maximum MP": 50
  },
  robot: {
    "Moxie Percent": 30,
    "Maximum HP": 25,
    "Maximum MP": 25
  }
}, currentHero = function() {
  return get("retroCapeSuperhero");
}, currentMode = function() {
  return get("retroCapeWashingInstructions");
}, modeMap = /* @__PURE__ */ new Map([[["vampire", "hold"], {
  "Hot Resistance": 3,
  "Cold Resistance": 3,
  "Stench Resistance": 3,
  "Spooky Resistance": 3,
  "Sleaze Resistance": 3
}], [["vampire", "thrill"], {
  "Muscle Experience": 3
}], [["vampire", "kiss"], {
  Skill: "Smooch of the Daywalker"
}], [["vampire", "kill"], {
  Skill: "Slay the Dead"
}], [["heck", "thrill"], {
  "Mysticality Experience": 3
}], [["heck", "kiss"], {
  Skill: "Unleash the Devil's Kiss"
}], [["robot", "hold"], {
  Skill: "Deploy Robo-Handcuffs"
}], [["robot", "thrill"], {
  "Moxie Experience": 3
}], [["robot", "kiss"], {
  Skill: "Blow a Robo-Kiss"
}], [["robot", "kill"], {
  Skill: "Precision Shot"
}]]);
function set2(hero, mode) {
  return have36() ? currentHero() === hero && currentMode() === mode ? !0 : ((0, import_kolmafia51.cliExecute)("retrocape ".concat(hero, " ").concat(mode)), currentHero() === hero && currentMode() === mode) : !1;
}
function getModifier2() {
  var _modeMap$get, hero = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentHero(), mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentMode();
  return _objectSpread6(_objectSpread6({}, Heroes[hero]), (_modeMap$get = modeMap.get([hero, mode])) !== null && _modeMap$get !== void 0 ? _modeMap$get : {});
}
var skills = /* @__PURE__ */ new Map([[$skill(_templateObject2100 || (_templateObject2100 = _taggedTemplateLiteral40(["Smooch of the Daywalker"]))), ["vampire", "kiss"]], [$skill(_templateObject369 || (_templateObject369 = _taggedTemplateLiteral40(["Slay the Dead"]))), ["vampire", "kill"]], [$skill(_templateObject457 || (_templateObject457 = _taggedTemplateLiteral40(["Unleash the Devil's Kiss"]))), ["heck", "kiss"]], [$skill(_templateObject535 || (_templateObject535 = _taggedTemplateLiteral40(["Deploy Robo-Handcuffs"]))), ["robot", "hold"]], [$skill(_templateObject628 || (_templateObject628 = _taggedTemplateLiteral40(["Blow a Robo-Kiss"]))), ["robot", "kiss"]], [$skill(_templateObject725 || (_templateObject725 = _taggedTemplateLiteral40(["Precision Shot"]))), ["robot", "kill"]]]);
function tuneToSkill(skill) {
  var setting = skills.get(skill);
  return !setting || !have36() ? !1 : (set2.apply(void 0, _toConsumableArray15(setting)), [currentHero(), currentMode()].every(function(element, index) {
    return element === setting[index];
  }));
}

// src/resources/2021/CrystalBall.ts
var CrystalBall_exports = {};
__export(CrystalBall_exports, {
  getPrediction: function() {
    return getPrediction;
  },
  have: function() {
    return have37;
  },
  orb: function() {
    return orb;
  },
  ponder: function() {
    return ponder;
  }
});
init_kolmafia_polyfill();
var import_kolmafia52 = require("kolmafia");
function _slicedToArray14(r, e) {
  return _arrayWithHoles14(r) || _iterableToArrayLimit14(r, e) || _unsupportedIterableToArray26(r, e) || _nonIterableRest14();
}
function _nonIterableRest14() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray26(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray26(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray26(r, a) : void 0;
  }
}
function _arrayLikeToArray26(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit14(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles14(r) {
  if (Array.isArray(r)) return r;
}
var orb = import_kolmafia52.Item.get("miniature crystal ball");
function have37() {
  return (0, import_kolmafia52.availableAmount)(orb) > 0;
}
function getPrediction() {
  return new Map(multiSplit(get("crystalBallPredictions"), "|", ":", [Number, import_kolmafia52.toLocation, import_kolmafia52.toMonster]).map(function(_ref) {
    var _ref2 = _slicedToArray14(_ref, 3), location = _ref2[1], monster = _ref2[2];
    return [location, monster];
  }));
}
var getLastPondered = function() {
  return "".concat((0, import_kolmafia52.myTotalTurnsSpent)(), ";").concat((0, import_kolmafia52.totalTurnsPlayed)(), ";").concat(get("lastAdventure"));
}, lastPondered = "";
function ponder() {
  return have37() ? (lastPondered !== getLastPondered() && (canVisitUrl() ? (logger_default.debug("Now pondering Crystal Ball."), (0, import_kolmafia52.visitUrl)("inventory.php?ponder=1", !1), lastPondered = getLastPondered()) : logger_default.debug("Failed to ponder Crystall Ball.")), getPrediction()) : /* @__PURE__ */ new Map();
}

// src/resources/2021/DaylightShavings.ts
var DaylightShavings_exports = {};
__export(DaylightShavings_exports, {
  buffAvailable: function() {
    return buffAvailable;
  },
  buffCycle: function() {
    return buffCycle;
  },
  buffs: function() {
    return buffs;
  },
  buffsUntil: function() {
    return buffsUntil;
  },
  hasBuff: function() {
    return hasBuff;
  },
  have: function() {
    return have38;
  },
  nextBuff: function() {
    return nextBuff;
  }
});
init_kolmafia_polyfill();
var import_kolmafia53 = require("kolmafia");
var _templateObject301, _templateObject2101;
function _taggedTemplateLiteral41(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var helmet = $item(_templateObject301 || (_templateObject301 = _taggedTemplateLiteral41(["Daylight Shavings Helmet"])));
function have38() {
  return have(helmet);
}
var buffs = $effects(_templateObject2101 || (_templateObject2101 = _taggedTemplateLiteral41(["Spectacle Moustache, Toiletbrush Moustache, Barbell Moustache, Grizzly Beard, Surrealist's Moustache, Musician's Musician's Moustache, Gull-Wing Moustache, Space Warlord's Beard, Pointy Wizard Beard, Cowboy Stache, Friendly Chops"])));
function hasBuff() {
  return buffs.some(function(buff) {
    return have(buff);
  });
}
function buffAvailable() {
  return !buffs.some(function(buff) {
    return have(buff, 2);
  });
}
function buffCycle() {
  var playerclass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia53.myClass)(), cycle2 = tuple(import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none, import_kolmafia53.Effect.none);
  if (playerclass.id <= 0) return cycle2;
  for (var id = playerclass.id, seed = id > 6 ? id % 6 + 1 : id, i = 1; i < 12; i++) {
    var index = i * seed % 11;
    cycle2[i - 1] = buffs[index];
  }
  return cycle2;
}
function nextBuff() {
  var currentBuff = (0, import_kolmafia53.toEffect)(get("lastBeardBuff").toFixed(0)), cycle2 = buffCycle(), index = cycle2.indexOf(currentBuff), newIndex = (1 + index) % 11;
  return cycle2[newIndex];
}
function buffsUntil(buff) {
  if (!buffs.includes(buff)) return null;
  var currentIndex = buffs.indexOf(nextBuff()) - 1, newIndex = buffs.indexOf(buff), diff = (newIndex - currentIndex) % 11;
  return diff === 0 ? 11 : diff;
}

// src/resources/2022/AutumnAton.ts
var AutumnAton_exports = {};
__export(AutumnAton_exports, {
  available: function() {
    return available4;
  },
  availableLocations: function() {
    return availableLocations2;
  },
  currentUpgrades: function() {
    return currentUpgrades;
  },
  currentlyIn: function() {
    return currentlyIn;
  },
  getUniques: function() {
    return getUniques;
  },
  have: function() {
    return have39;
  },
  legs: function() {
    return legs;
  },
  possibleUpgrades: function() {
    return possibleUpgrades;
  },
  seasonalItems: function() {
    return seasonalItems;
  },
  sendTo: function() {
    return sendTo;
  },
  turnsForQuest: function() {
    return turnsForQuest;
  },
  turnsLeft: function() {
    return turnsLeft;
  },
  upgrade: function() {
    return upgrade;
  },
  visualAcuity: function() {
    return visualAcuity;
  },
  zoneItems: function() {
    return zoneItems;
  }
});
init_kolmafia_polyfill();
var import_kolmafia54 = require("kolmafia");
var _templateObject309, _templateObject2102, _templateObject370, _templateObject458, _templateObject536, _templateObject629, _templateObject726, _templateObject825, _templateObject921;
function _taggedTemplateLiteral42(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item6 = import_kolmafia54.Item.get("autumn-aton");
function available4() {
  return (0, import_kolmafia54.availableAmount)(item6) > 0;
}
function have39() {
  return get("hasAutumnaton") || available4();
}
function checkLocations(html) {
  return (0, import_kolmafia54.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/@value').map(function(id) {
    return (0, import_kolmafia54.toLocation)(Number(id));
  });
}
function currentlyIn() {
  return get("autumnatonQuestLocation");
}
function sendTo(target) {
  var upgrade2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (!available4()) return null;
  var pageHtml = directlyUse(item6);
  upgrade2 && (0, import_kolmafia54.availableChoiceOptions)()[1] && (0, import_kolmafia54.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml), location = target instanceof import_kolmafia54.Location ? target : Array.isArray(target) ? target.find(function(l) {
    return locationsAvailable.includes(l);
  }) : target(locationsAvailable);
  return !location || !locationsAvailable.includes(location) ? null : ((0, import_kolmafia54.handlingChoice)() || directlyUse(item6), (0, import_kolmafia54.runChoice)(2, "heythereprogrammer=".concat(location.id)), (0, import_kolmafia54.handlingChoice)() && (0, import_kolmafia54.visitUrl)("main.php"), location);
}
function upgrade() {
  directlyUse(item6);
  var canUpgrade = (0, import_kolmafia54.availableChoiceOptions)()[1] !== void 0;
  return canUpgrade && (0, import_kolmafia54.runChoice)(1), (0, import_kolmafia54.visitUrl)("main.php"), canUpgrade;
}
function availableLocations2() {
  if (!available4()) return [];
  var pageHtml = directlyUse(item6);
  return (0, import_kolmafia54.visitUrl)("main.php"), checkLocations(pageHtml);
}
var possibleUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"];
function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
function turnsLeft() {
  return get("autumnatonQuestTurn") - (0, import_kolmafia54.totalTurnsPlayed)();
}
function legs() {
  return currentUpgrades().filter(function(u) {
    return u.includes("leg");
  }).length;
}
function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - legs());
}
function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(function(u) {
    return visualUpgrades.includes(u);
  }).length;
}
function zoneItems() {
  return 3 + currentUpgrades().filter(function(u) {
    return u.includes("arm");
  }).length;
}
function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
var difficulties = ["low", "mid", "high"], UNIQUES = {
  outdoor: {
    low: {
      index: 4,
      item: $item(_templateObject309 || (_templateObject309 = _taggedTemplateLiteral42(["autumn leaf"])))
    },
    mid: {
      index: 2,
      item: $item(_templateObject2102 || (_templateObject2102 = _taggedTemplateLiteral42(["autumn debris shield"])))
    },
    high: {
      index: 6,
      item: $item(_templateObject370 || (_templateObject370 = _taggedTemplateLiteral42(["autumn leaf pendant"])))
    }
  },
  indoor: {
    low: {
      index: 0,
      item: $item(_templateObject458 || (_templateObject458 = _taggedTemplateLiteral42(["AutumnFest ale"])))
    },
    mid: {
      index: 3,
      item: $item(_templateObject536 || (_templateObject536 = _taggedTemplateLiteral42(["autumn-spice donut"])))
    },
    high: {
      index: 7,
      item: $item(_templateObject629 || (_templateObject629 = _taggedTemplateLiteral42(["autumn breeze"])))
    }
  },
  underground: {
    low: {
      index: 1,
      item: $item(_templateObject726 || (_templateObject726 = _taggedTemplateLiteral42(["autumn sweater-weather sweater"])))
    },
    mid: {
      index: 5,
      item: $item(_templateObject825 || (_templateObject825 = _taggedTemplateLiteral42(["autumn dollar"])))
    },
    high: {
      index: 8,
      item: $item(_templateObject921 || (_templateObject921 = _taggedTemplateLiteral42(["autumn years wisdom"])))
    }
  }
};
function getUniques(location) {
  var env = location.environment, difficulty = location.difficultyLevel;
  if (arrayContains(env, ["outdoor", "indoor", "underground"]) && arrayContains(difficulty, difficulties)) {
    var _UNIQUES$env$difficul = UNIQUES[env][difficulty], index = _UNIQUES$env$difficul.index, _item = _UNIQUES$env$difficul.item;
    return {
      upgrade: possibleUpgrades[index],
      item: _item
    };
  }
  return null;
}

// src/resources/2022/CombatLoversLocket.ts
var CombatLoversLocket_exports = {};
__export(CombatLoversLocket_exports, {
  availableLocketMonsters: function() {
    return availableLocketMonsters;
  },
  findMonster: function() {
    return findMonster;
  },
  have: function() {
    return have40;
  },
  monstersReminisced: function() {
    return monstersReminisced;
  },
  reminisce: function() {
    return reminisce;
  },
  reminiscesLeft: function() {
    return reminiscesLeft;
  },
  unlockedLocketMonsters: function() {
    return unlockedLocketMonsters;
  }
});
init_kolmafia_polyfill();
var import_kolmafia55 = require("kolmafia");
var _templateObject371;
function _slicedToArray15(r, e) {
  return _arrayWithHoles15(r) || _iterableToArrayLimit15(r, e) || _unsupportedIterableToArray27(r, e) || _nonIterableRest15();
}
function _nonIterableRest15() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray27(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray27(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray27(r, a) : void 0;
  }
}
function _arrayLikeToArray27(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit15(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles15(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral43(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var locket = $item(_templateObject371 || (_templateObject371 = _taggedTemplateLiteral43(["combat lover's locket"])));
function have40() {
  return have(locket);
}
function availableLocketMonsters() {
  return reminiscesLeft() === 0 ? [] : Object.entries((0, import_kolmafia55.getLocketMonsters)()).filter(function(_ref) {
    var _ref2 = _slicedToArray15(_ref, 2), unused = _ref2[1];
    return unused;
  }).map(function(_ref3) {
    var _ref4 = _slicedToArray15(_ref3, 1), name = _ref4[0];
    return (0, import_kolmafia55.toMonster)(name);
  });
}
function unlockedLocketMonsters() {
  return Object.entries((0, import_kolmafia55.getLocketMonsters)()).map(function(_ref5) {
    var _ref6 = _slicedToArray15(_ref5, 1), name = _ref6[0];
    return (0, import_kolmafia55.toMonster)(name);
  });
}
function parseLocketProperty() {
  return get("_locketMonstersFought").split(",").filter(function(id) {
    return id.trim().length > 0;
  });
}
function reminiscesLeft() {
  return have40() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
function monstersReminisced() {
  return parseLocketProperty().map(function(id) {
    return (0, import_kolmafia55.toMonster)(id);
  });
}
function reminisce(monster) {
  if (!have40() || reminiscesLeft() === 0 || !(0, import_kolmafia55.getLocketMonsters)()[monster.name])
    return !1;
  (0, import_kolmafia55.cliExecute)("reminisce ".concat(monster));
  for (var _len = arguments.length, combatParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    combatParams[_key - 1] = arguments[_key];
  return import_kolmafia55.runCombat.apply(void 0, combatParams), monstersReminisced().includes(monster);
}
function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    return 1;
  };
  if (!have40() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  return options.length ? options.reduce(function(a, b) {
    return value(a) > value(b) ? a : b;
  }) : null;
}

// src/resources/2022/GreyGoose.ts
var GreyGoose_exports = {};
__export(GreyGoose_exports, {
  currentDrones: function() {
    return currentDrones;
  },
  currentExperience: function() {
    return currentExperience;
  },
  currentWeight: function() {
    return currentWeight;
  },
  expectedDrones: function() {
    return expectedDrones;
  },
  expectedExperience: function() {
    return expectedExperience;
  },
  expectedMeat: function() {
    return expectedMeat;
  },
  fightsUntil: function() {
    return fightsUntil;
  },
  hasMeatified: function() {
    return hasMeatified;
  },
  have: function() {
    return have41;
  }
});
init_kolmafia_polyfill();
var import_kolmafia56 = require("kolmafia");
var _templateObject379, _templateObject2103, _templateObject380, _templateObject459;
function _taggedTemplateLiteral44(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var goose = $familiar(_templateObject379 || (_templateObject379 = _taggedTemplateLiteral44(["Grey Goose"])));
function have41() {
  return have(goose);
}
function currentExperience() {
  var postAscensionBaseExperience = have($familiar(_templateObject2103 || (_templateObject2103 = _taggedTemplateLiteral44(["Shorter-Order Cook"])))) && !get("gooseReprocessed") ? 81 + (have($item(_templateObject380 || (_templateObject380 = _taggedTemplateLiteral44(["blue plate"])))) ? 19 : 0) : 0;
  return goose.experience || postAscensionBaseExperience;
}
function currentWeight() {
  return Math.min(Math.floor(Math.sqrt(currentExperience())), 20);
}
function expectedDrones() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.max(0, weight - 5);
}
function expectedExperience() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), (0, import_kolmafia56.myClass)().id === 27 ? 2 : 3);
}
function expectedMeat() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), 4);
}
function hasMeatified() {
  return get("_meatifyMatterUsed");
}
function fightsUntil(target) {
  var bonusExperience = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : get2("Familiar Experience"), diff = Math.pow(target, 2) - currentExperience();
  return diff <= 0 ? 0 : Math.ceil(diff / (1 + bonusExperience + (have($skill(_templateObject459 || (_templateObject459 = _taggedTemplateLiteral44(["Testudinal Teachings"])))) ? 1 / 6 : 0)));
}
function currentDrones() {
  return get("gooseDronesRemaining");
}

// src/resources/2022/JuneCleaver.ts
var JuneCleaver_exports = {};
__export(JuneCleaver_exports, {
  choices: function() {
    return choices;
  },
  choicesAvailable: function() {
    return choicesAvailable;
  },
  cleaver: function() {
    return cleaver;
  },
  damage: function() {
    return damage;
  },
  getInterval: function() {
    return getInterval;
  },
  getSkippedInterval: function() {
    return getSkippedInterval;
  },
  have: function() {
    return have42;
  },
  queue: function() {
    return queue;
  },
  skipsRemaining: function() {
    return skipsRemaining;
  }
});
init_kolmafia_polyfill();
var import_kolmafia57 = require("kolmafia");
var cleaver = (0, import_kolmafia57.toItem)("June cleaver");
function have42() {
  return (0, import_kolmafia57.availableAmount)(cleaver) > 0;
}
function getInterval() {
  var _encounters, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters = [1, 6, 10, 12, 15, 20][encounters]) !== null && _encounters !== void 0 ? _encounters : 30;
}
function getSkippedInterval() {
  var _encounters2, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters2 = [1, 2, 3, 3, 4, 5][encounters]) !== null && _encounters2 !== void 0 ? _encounters2 : 8;
}
function damage(element) {
  return get("_juneCleaver".concat(element));
}
function skipsRemaining() {
  return 5 - get("_juneCleaverSkips");
}
var choices = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475];
function queue() {
  return get("juneCleaverQueue").split(",").filter(function(x) {
    return x.trim().length > 0;
  }).map(function(x) {
    return parseInt(x);
  });
}
function choicesAvailable() {
  var currentQueue = queue();
  return choices.filter(function(choice) {
    return !currentQueue.includes(choice);
  });
}

// src/resources/2022/TrainSet.ts
var TrainSet_exports = {};
__export(TrainSet_exports, {
  Station: function() {
    return Station;
  },
  canConfigure: function() {
    return canConfigure;
  },
  cycle: function() {
    return cycle;
  },
  doubledEffect: function() {
    return doubledEffect;
  },
  effect: function() {
    return effect;
  },
  have: function() {
    return have43;
  },
  installed: function() {
    return installed4;
  },
  next: function() {
    return next;
  },
  nextConfigurable: function() {
    return nextConfigurable;
  },
  setConfiguration: function() {
    return setConfiguration;
  }
});
init_kolmafia_polyfill();
var import_kolmafia58 = require("kolmafia");
var _templateObject381;
function _taggedTemplateLiteral45(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item7 = $item(_templateObject381 || (_templateObject381 = _taggedTemplateLiteral45(["model train set"])));
function installed4() {
  return (0, import_kolmafia58.getWorkshed)() === item7;
}
function have43() {
  return installed4() || have(item7);
}
var Station = /* @__PURE__ */ function(Station2) {
  return Station2.UNKNOWN = "", Station2.EMPTY = "empty", Station2.GAIN_MEAT = "meat_mine", Station2.TOWER_FIZZY = "tower_fizzy", Station2.VIEWING_PLATFORM = "viewing_platform", Station2.TOWER_FROZEN = "tower_frozen", Station2.SPOOKY_GRAVEYARD = "spooky_graveyard", Station2.LOGGING_MILL = "logging_mill", Station2.CANDY_FACTORY = "candy_factory", Station2.COAL_HOPPER = "coal_hopper", Station2.TOWER_SEWAGE = "tower_sewage", Station2.OIL_REFINERY = "oil_refinery", Station2.OIL_BRIDGE = "oil_bridge", Station2.WATER_BRIDGE = "water_bridge", Station2.GROIN_SILO = "groin_silo", Station2.GRAIN_SILO = "grain_silo", Station2.BRAIN_SILO = "brain_silo", Station2.BRAWN_SILO = "brawn_silo", Station2.PRAWN_SILO = "prawn_silo", Station2.TRACKSIDE_DINER = "trackside_diner", Station2.ORE_HOPPER = "ore_hopper", Station2;
}({}), trainsetEffects = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia58.Effect.get("Carbonated")], [Station.TOWER_FROZEN, import_kolmafia58.Effect.get("Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia58.Effect.get("Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia58.Effect.get("Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia58.Effect.get("Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia58.Effect.get("Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia58.Effect.get("Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia58.Effect.get("Craving Prawns")]]), trainsetEffectsDoubled = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia58.Effect.get("Double Carbonated")], [Station.TOWER_FROZEN, import_kolmafia58.Effect.get("Double Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia58.Effect.get("Doubly Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia58.Effect.get("Double Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia58.Effect.get("Doubly Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia58.Effect.get("Doubly Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia58.Effect.get("Doubly Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia58.Effect.get("Doubly Craving Prawns")]]);
function effect(station) {
  var _trainsetEffects$get;
  return (_trainsetEffects$get = trainsetEffects.get(station)) !== null && _trainsetEffects$get !== void 0 ? _trainsetEffects$get : null;
}
function doubledEffect(station) {
  var _trainsetEffectsDoubl;
  return (_trainsetEffectsDoubl = trainsetEffectsDoubled.get(station)) !== null && _trainsetEffectsDoubl !== void 0 ? _trainsetEffectsDoubl : null;
}
function cycle() {
  return get("trainsetConfiguration").split(",");
}
function nextConfigurable() {
  return clamp(get("lastTrainsetConfiguration") + 40 - get("trainsetPosition"), 0, 40);
}
function canConfigure() {
  return installed4() && !nextConfigurable();
}
var pieces2 = [Station.EMPTY, Station.GAIN_MEAT, Station.TOWER_FIZZY, Station.VIEWING_PLATFORM, Station.TOWER_FROZEN, Station.SPOOKY_GRAVEYARD, Station.LOGGING_MILL, Station.CANDY_FACTORY, Station.COAL_HOPPER, Station.TOWER_SEWAGE, Station.UNKNOWN, Station.OIL_REFINERY, Station.OIL_BRIDGE, Station.WATER_BRIDGE, Station.GROIN_SILO, Station.GRAIN_SILO, Station.BRAIN_SILO, Station.BRAWN_SILO, Station.PRAWN_SILO, Station.TRACKSIDE_DINER, Station.ORE_HOPPER];
function stationToInt(station) {
  return pieces2.indexOf(station);
}
function setConfiguration(configuration) {
  if (!canConfigure()) return !1;
  (0, import_kolmafia58.visitUrl)("campground.php?action=workshed"), (0, import_kolmafia58.runChoice)(1, "forceoption=0".concat(configuration.map(function(station, index) {
    return "&slot[".concat(index, "]=").concat(stationToInt(station));
  }).join(""))), (0, import_kolmafia58.visitUrl)("main.php");
  var currentConfiguration = cycle();
  return configuration.every(function(station, index) {
    return station === currentConfiguration[index];
  });
}
function next() {
  return cycle()[get("trainsetPosition") % 8];
}

// src/resources/2022/Stillsuit.ts
var Stillsuit_exports = {};
__export(Stillsuit_exports, {
  MODIFIER_TAGS: function() {
    return MODIFIER_TAGS;
  },
  bestFamiliar: function() {
    return bestFamiliar;
  },
  currentDistillateModifiers: function() {
    return currentDistillateModifiers;
  },
  distillateAdventures: function() {
    return distillateAdventures;
  },
  distillateModifier: function() {
    return distillateModifier;
  },
  drinkDistillate: function() {
    return drinkDistillate;
  },
  have: function() {
    return have44;
  },
  modifierRatio: function() {
    return modifierRatio;
  },
  nextDistillateModifiers: function() {
    return nextDistillateModifiers;
  }
});
init_kolmafia_polyfill();
var import_kolmafia59 = require("kolmafia");
var _templateObject388;
function ownKeys7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys7(Object(t), !0).forEach(function(r2) {
      _defineProperty15(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty15(e, r, t) {
  return (r = _toPropertyKey16(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey16(t) {
  var i = _toPrimitive16(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive16(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _taggedTemplateLiteral46(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have44() {
  return have($item(_templateObject388 || (_templateObject388 = _taggedTemplateLiteral46(["tiny stillsuit"]))));
}
function distillateAdventures() {
  if (!have44()) return 0;
  var sweat = get("familiarSweat");
  return Math.round(sweat ** 0.4);
}
function drinkDistillate() {
  return !have44() || get("familiarSweat") <= 0 ? !1 : (0, import_kolmafia59.cliExecute)("drink stillsuit distillate");
}
var distillateModifiers = function(pref) {
  return parseModifiers(pref);
};
function nextDistillateModifiers() {
  return (0, import_kolmafia59.visitUrl)("inventory.php?action=distill&pwd"), distillateModifiers("nextDistillateMods");
}
function currentDistillateModifiers() {
  return distillateModifiers("currentDistillateMods");
}
function distillateModifier(modifier) {
  (0, import_kolmafia59.visitUrl)("inventory.php?action=distill&pwd");
  var value = (0, import_kolmafia59.splitModifiers)(get("currentDistillateMods"))[modifier];
  return value ? Number(value) : 0;
}
var MODIFIER_TAGS = Object.freeze({
  mineral: "Muscle",
  robot: "Muscle",
  organic: "Muscle",
  hasbones: "Muscle",
  technological: "Mysticality",
  orb: "Mysticality",
  sentient: "Mysticality",
  polygonal: "Mysticality",
  software: "Mysticality",
  cantalk: "Mysticality",
  humanoid: "Moxie",
  hashands: "Moxie",
  cute: "Moxie",
  good: "Moxie",
  phallic: "Moxie",
  animatedart: "Moxie",
  person: "Moxie",
  haseyes: "Item Drop",
  object: "Item Drop",
  haslegs: "Item Drop",
  food: "Food Drop",
  vegetable: "Food Drop",
  edible: "Food Drop",
  animal: "Damage Reduction",
  insect: "Damage Reduction",
  wearsclothes: "Damage Reduction",
  isclothes: "Damage Reduction",
  hasshell: "Damage Reduction",
  haswings: "Initiative",
  fast: "Initiative",
  flies: "Initiative",
  hovers: "Initiative",
  swims: "Initiative",
  aquatic: "Initiative",
  spooky: "Spooky Damage",
  undead: "Spooky Damage",
  evil: "Spooky Damage",
  reallyevil: "Spooky Damage",
  hot: "Hot Damage",
  cold: "Cold Damage",
  sleaze: "Sleaze Damage",
  stench: "Stench Damage",
  bite: "Weapon Damage",
  hasclaws: "Weapon Damage",
  hasbeak: "Weapon Damage",
  hasstinger: "Weapon Damage",
  hard: "Weapon Damage"
});
function isStillsuitTag(tag) {
  return tag in MODIFIER_TAGS;
}
function modifierRatio(familiar10) {
  var tags = getFamiliarTags(familiar10);
  return tags.filter(isStillsuitTag).reduce(function(acc, tag) {
    var _acc$MODIFIER_TAGS$ta;
    return _objectSpread7(_objectSpread7({}, acc), {}, _defineProperty15({}, MODIFIER_TAGS[tag], ((_acc$MODIFIER_TAGS$ta = acc[MODIFIER_TAGS[tag]]) !== null && _acc$MODIFIER_TAGS$ta !== void 0 ? _acc$MODIFIER_TAGS$ta : 0) + 1 / tags.length));
  }, {});
}
function bestFamiliar(modifier) {
  return maxBy(import_kolmafia59.Familiar.all().filter(have), function(familiar10) {
    var _modifierRatio$modifi;
    return (_modifierRatio$modifi = modifierRatio(familiar10)[modifier]) !== null && _modifierRatio$modifi !== void 0 ? _modifierRatio$modifi : 0;
  });
}

// src/resources/2023/AugustScepter.ts
var AugustScepter_exports = {};
__export(AugustScepter_exports, {
  SKILLS: function() {
    return SKILLS;
  },
  canCast: function() {
    return canCast;
  },
  getAugustCast: function() {
    return getAugustCast;
  },
  getTodayCast: function() {
    return getTodayCast;
  },
  have: function() {
    return have45;
  },
  todaysSkill: function() {
    return todaysSkill;
  }
});
init_kolmafia_polyfill();
var import_kolmafia60 = require("kolmafia");
var _templateObject389, _templateObject2104;
function _taggedTemplateLiteral47(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have45() {
  return have($item(_templateObject389 || (_templateObject389 = _taggedTemplateLiteral47(["august scepter"]))));
}
var SKILLS = Object.freeze($skills(_templateObject2104 || (_templateObject2104 = _taggedTemplateLiteral47(["Aug. 1st: Mountain Climbing Day!, Aug. 2nd: Find an Eleven-Leaf Clover Day, Aug. 3rd: Watermelon Day!, Aug. 4th: Water Balloon Day!, Aug. 5th: Oyster Day!, Aug. 6th: Fresh Breath Day!, Aug. 7th: Lighthouse Day!, Aug. 8th: Cat Day!, Aug. 9th: Hand Holding Day!, Aug. 10th: World Lion Day!, Aug. 11th: Presidential Joke Day!, Aug. 12th: Elephant Day!, Aug. 13th: Left/Off Hander's Day!, Aug. 14th: Financial Awareness  Day!, Aug. 15th: Relaxation Day!, Aug. 16th: Roller Coaster Day!, Aug. 17th: Thriftshop Day!, Aug. 18th: Serendipity Day!, Aug. 19th: Honey Bee Awareness Day!, Aug. 20th: Mosquito Day!, Aug. 21st: Spumoni Day!, Aug. 22nd: Tooth Fairy Day!, Aug. 23rd: Ride the Wind Day!, Aug. 24th: Waffle Day!, Aug. 25th: Banana Split Day!, Aug. 26th: Toilet Paper Day!, Aug. 27th: Just Because Day!, Aug. 28th: Race Your Mouse Day!, Aug. 29th: More Herbs, Less Salt  Day!, Aug. 30th: Beach Day!, Aug. 31st: Cabernet Sauvignon  Day!"], ["Aug. 1st: Mountain Climbing Day!, Aug. 2nd: Find an Eleven-Leaf Clover Day, Aug. 3rd: Watermelon Day!, Aug. 4th: Water Balloon Day!, Aug. 5th: Oyster Day!, Aug. 6th: Fresh Breath Day!, Aug. 7th: Lighthouse Day!, Aug. 8th: Cat Day!, Aug. 9th: Hand Holding Day!, Aug. 10th: World Lion Day!, Aug. 11th: Presidential Joke Day!, Aug. 12th: Elephant Day!, Aug. 13th: Left/Off Hander's Day!, Aug. 14th: Financial Awareness  Day!, Aug. 15th: Relaxation Day!, Aug. 16th: Roller Coaster Day!, Aug. 17th: Thriftshop Day!, Aug. 18th: Serendipity Day!, Aug. 19th: Honey Bee Awareness Day!, Aug. 20th: Mosquito Day!, Aug. 21st: Spumoni Day!, Aug. 22nd: Tooth Fairy Day!, Aug. 23rd: Ride the Wind Day!, Aug. 24th: Waffle Day!, Aug. 25th: Banana Split Day!, Aug. 26th: Toilet Paper Day!, Aug. 27th: Just Because Day!, Aug. 28th: Race Your Mouse Day!, Aug. 29th: More Herbs\\, Less Salt  Day!, Aug. 30th: Beach Day!, Aug. 31st: Cabernet Sauvignon  Day!"]))));
function todaysSkill() {
  return (0, import_kolmafia60.toSkill)((gameDay().getDate() + 7451).toFixed(0));
}
function getAugustCast(skillNum) {
  return get("_aug".concat(skillNum, "Cast"));
}
function getTodayCast() {
  return get("_augTodayCast");
}
function canCast(skillNum) {
  return have45() && !get("_aug".concat(skillNum, "Cast")) && (gameDay().getDate() === skillNum && !getTodayCast() || get("_augSkillsCast") < 5);
}

// src/resources/2023/BurningLeaves.ts
var BurningLeaves_exports = {};
__export(BurningLeaves_exports, {
  burnFor: function() {
    return burnFor;
  },
  burnLeaves: function() {
    return burnLeaves;
  },
  burnSpecialLeaves: function() {
    return burnSpecialLeaves;
  },
  have: function() {
    return have46;
  },
  jumpInFire: function() {
    return jumpInFire;
  },
  numberOfLeaves: function() {
    return numberOfLeaves;
  }
});
init_kolmafia_polyfill();
var import_kolmafia61 = require("kolmafia");
var _templateObject390, _templateObject2105, _templateObject391, _templateObject460, _templateObject537, _templateObject630, _templateObject727, _templateObject826, _templateObject923, _templateObject1020, _templateObject1119, _templateObject1218, _templateObject1317, _templateObject1415, _templateObject1514, _templateObject1614, _templateObject1714, _templateObject1814;
function _taggedTemplateLiteral48(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item8 = $item(_templateObject390 || (_templateObject390 = _taggedTemplateLiteral48(["A Guide to Burning Leaves"]))), burnFor = /* @__PURE__ */ new Map([[$monster(_templateObject2105 || (_templateObject2105 = _taggedTemplateLiteral48(["flaming leaflet"]))), 11], [$item(_templateObject391 || (_templateObject391 = _taggedTemplateLiteral48(["autumnic bomb"]))), 37], [$item(_templateObject460 || (_templateObject460 = _taggedTemplateLiteral48(["impromptu torch"]))), 42], [$item(_templateObject537 || (_templateObject537 = _taggedTemplateLiteral48(["flaming fig leaf"]))), 43], [$item(_templateObject630 || (_templateObject630 = _taggedTemplateLiteral48(["smoldering drape"]))), 44], [$item(_templateObject727 || (_templateObject727 = _taggedTemplateLiteral48(["distilled resin"]))), 50], [$item(_templateObject826 || (_templateObject826 = _taggedTemplateLiteral48(["autumnal aegis"]))), 66], [$item(_templateObject923 || (_templateObject923 = _taggedTemplateLiteral48(["lit leaf lasso"]))), 69], [$item(_templateObject1020 || (_templateObject1020 = _taggedTemplateLiteral48(["forest canopy bed"]))), 74], [$item(_templateObject1119 || (_templateObject1119 = _taggedTemplateLiteral48(["autumnic balm"]))), 99], [$monster(_templateObject1218 || (_templateObject1218 = _taggedTemplateLiteral48(["flaming monstera"]))), 111], [$item(_templateObject1317 || (_templateObject1317 = _taggedTemplateLiteral48(["day shortener"]))), 222], [$monster(_templateObject1415 || (_templateObject1415 = _taggedTemplateLiteral48(["leaviathan"]))), 666], [$item(_templateObject1514 || (_templateObject1514 = _taggedTemplateLiteral48(["coping juice"]))), 1111], [$item(_templateObject1614 || (_templateObject1614 = _taggedTemplateLiteral48(["smoldering leafcutter ant egg"]))), 6666], [$item(_templateObject1714 || (_templateObject1714 = _taggedTemplateLiteral48(["super-heated leaf"]))), 11111]]);
function have46() {
  return haveInCampground(item8);
}
function numberOfLeaves() {
  return (0, import_kolmafia61.itemAmount)($item(_templateObject1814 || (_templateObject1814 = _taggedTemplateLiteral48(["inflammable leaf"]))));
}
function burnSpecialLeaves(leaves) {
  var lea = burnFor.get(leaves);
  return lea === void 0 || lea > numberOfLeaves() ? !1 : (0, import_kolmafia61.cliExecute)("leaves ".concat(leaves));
}
function burnLeaves(leaves) {
  return leaves > numberOfLeaves() ? !1 : (0, import_kolmafia61.cliExecute)("leaves ".concat(leaves));
}
function visitLeaves() {
  (0, import_kolmafia61.cliExecute)("leaves");
}
function jumpInFire() {
  return get("_leavesJumped") || get("_leavesBurned") === 0 ? !1 : (visitLeaves(), (0, import_kolmafia61.runChoice)(2), get("_leavesJumped"));
}

// src/resources/2023/CinchoDeMayo.ts
var CinchoDeMayo_exports = {};
__export(CinchoDeMayo_exports, {
  cinchRestoredBy: function() {
    return cinchRestoredBy;
  },
  currentCinch: function() {
    return currentCinch;
  },
  have: function() {
    return have47;
  },
  skills: function() {
    return skills2;
  },
  totalAvailableCinch: function() {
    return totalAvailableCinch;
  }
});
init_kolmafia_polyfill();
var import_kolmafia62 = require("kolmafia");
var _templateObject398, _templateObject2106, _templateObject399, _templateObject461, _templateObject538, _templateObject631, _templateObject728;
function _taggedTemplateLiteral49(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var cincho = $item(_templateObject398 || (_templateObject398 = _taggedTemplateLiteral49(["Cincho de Mayo"])));
function have47() {
  return have(cincho);
}
function currentCinch() {
  return have47() ? clamp(100 - get("_cinchUsed"), 0, 100) : 0;
}
function cinchRestoredBy() {
  var currentRests = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_cinchoRests");
  return have47() ? clamp(50 - currentRests * 5, 5, 30) : 0;
}
function totalAvailableCinch() {
  var remainingRests = Math.max(0, (0, import_kolmafia62.totalFreeRests)() - get("timesRested"));
  return have47() ? currentCinch() + sum(new Array(remainingRests).fill(null).map(function(_, i) {
    return i + get("_cinchoRests");
  }), function(restNumber) {
    return cinchRestoredBy(restNumber);
  }) : 0;
}
var skills2 = {
  SaltAndLime: $skill(_templateObject2106 || (_templateObject2106 = _taggedTemplateLiteral49(["Cincho: Dispense Salt and Lime"]))),
  PartySoundtrack: $skill(_templateObject399 || (_templateObject399 = _taggedTemplateLiteral49(["Cincho: Party Soundtrack"]))),
  FiestaExit: $skill(_templateObject461 || (_templateObject461 = _taggedTemplateLiteral49(["Cincho: Fiesta Exit"]))),
  ProjectilePi\u00F1ata: $skill(_templateObject538 || (_templateObject538 = _taggedTemplateLiteral49(["Cincho: Projectile Pi\xF1ata"]))),
  PartyFoul: $skill(_templateObject631 || (_templateObject631 = _taggedTemplateLiteral49(["Cincho: Party Foul"]))),
  ConfettiExtrava: $skill(_templateObject728 || (_templateObject728 = _taggedTemplateLiteral49(["Cincho: Confetti Extravaganza"])))
};

// src/resources/2023/ClosedCircuitPayphone.ts
var ClosedCircuitPayphone_exports = {};
__export(ClosedCircuitPayphone_exports, {
  byIngress: function() {
    return byIngress;
  },
  chooseQuest: function() {
    return chooseQuest;
  },
  chooseRift: function() {
    return chooseRift;
  },
  currentIngress: function() {
    return currentIngress;
  },
  currentRift: function() {
    return currentRift;
  },
  have: function() {
    return have48;
  },
  rifts: function() {
    return rifts;
  },
  rufusTarget: function() {
    return rufusTarget;
  },
  submitQuest: function() {
    return submitQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia63 = require("kolmafia");
var _templateObject400, _templateObject2107, _templateObject3100, _templateObject466, _templateObject539, _templateObject634, _templateObject729, _templateObject827, _templateObject924, _templateObject1021, _templateObject1120, _templateObject1219, _templateObject1318, _templateObject1416;
function _taggedTemplateLiteral50(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item9 = $item(_templateObject400 || (_templateObject400 = _taggedTemplateLiteral50(["closed-circuit pay phone"])));
function have48() {
  return have(item9);
}
function rufusTarget() {
  var target = get("rufusQuestTarget");
  switch (get("rufusQuestType")) {
    case "entity":
      return import_kolmafia63.Monster.get(target);
    case "artifact":
    case "items":
      return import_kolmafia63.Item.get(target);
    default:
      return null;
  }
}
var INGRESS_RIFTS = {
  desertbeach: $location(_templateObject2107 || (_templateObject2107 = _taggedTemplateLiteral50(["Shadow Rift (Desert Beach)"]))),
  forestvillage: $location(_templateObject3100 || (_templateObject3100 = _taggedTemplateLiteral50(["Shadow Rift (Forest Village)"]))),
  mclargehuge: $location(_templateObject466 || (_templateObject466 = _taggedTemplateLiteral50(["Shadow Rift (Mt. McLargeHuge)"]))),
  beanstalk: $location(_templateObject539 || (_templateObject539 = _taggedTemplateLiteral50(["Shadow Rift (Somewhere Over the Beanstalk)"]))),
  manor3: $location(_templateObject634 || (_templateObject634 = _taggedTemplateLiteral50(["Shadow Rift (Spookyraven Manor Third Floor)"]))),
  "8bit": $location(_templateObject729 || (_templateObject729 = _taggedTemplateLiteral50(["Shadow Rift (The 8-Bit Realm)"]))),
  pyramid: $location(_templateObject827 || (_templateObject827 = _taggedTemplateLiteral50(["Shadow Rift (The Ancient Buried Pyramid)"]))),
  giantcastle: $location(_templateObject924 || (_templateObject924 = _taggedTemplateLiteral50(["Shadow Rift (The Castle in the Clouds in the Sky)"]))),
  woods: $location(_templateObject1021 || (_templateObject1021 = _taggedTemplateLiteral50(["Shadow Rift (The Distant Woods)"]))),
  hiddencity: $location(_templateObject1120 || (_templateObject1120 = _taggedTemplateLiteral50(["Shadow Rift (The Hidden City)"]))),
  cemetery: $location(_templateObject1219 || (_templateObject1219 = _taggedTemplateLiteral50(["Shadow Rift (The Misspelled Cemetary)"]))),
  plains: $location(_templateObject1318 || (_templateObject1318 = _taggedTemplateLiteral50(["Shadow Rift (The Nearby Plains)"]))),
  town_right: $location(_templateObject1416 || (_templateObject1416 = _taggedTemplateLiteral50(["Shadow Rift (The Right Side of the Tracks)"])))
};
function currentIngress() {
  return get("shadowRiftIngress");
}
function currentRift() {
  var ingress = currentIngress();
  return ingress ? INGRESS_RIFTS[ingress] : null;
}
var RIFTS = Array.from(Object.values(INGRESS_RIFTS));
function chooseRift(options) {
  var filterFunction = function(l) {
    var _options$monsters, _options$drops, _options$otherFilter, _options$otherFilter2, monsters = (0, import_kolmafia63.getMonsters)(l);
    return options.canAdventure && !(0, import_kolmafia63.canAdventure)(l) || (_options$monsters = options.monsters) !== null && _options$monsters !== void 0 && _options$monsters.some(function(m) {
      return !monsters.includes(m);
    }) || (_options$drops = options.drops) !== null && _options$drops !== void 0 && _options$drops.every(function(i) {
      return !monsters.some(function(m) {
        return i.name in (0, import_kolmafia63.itemDrops)(m);
      });
    }) ? !1 : (_options$otherFilter = (_options$otherFilter2 = options.otherFilter) === null || _options$otherFilter2 === void 0 ? void 0 : _options$otherFilter2.call(options, l)) !== null && _options$otherFilter !== void 0 ? _options$otherFilter : !0;
  }, validRifts = [].concat(RIFTS).filter(filterFunction);
  return validRifts.length ? options.sortBy ? maxBy(validRifts, options.sortBy) : validRifts[0] : null;
}
function chooseQuest(chooser) {
  return get("questRufus") !== "unstarted" || !have48() ? !1 : (withChoice(1497, "", function() {
    var _get2;
    directlyUse(item9), (0, import_kolmafia63.runChoice)(chooser({
      artifact: (0, import_kolmafia63.toItem)(get("rufusDesiredArtifact")),
      entity: (_get2 = get("rufusDesiredEntity")) !== null && _get2 !== void 0 ? _get2 : $monster.none,
      items: (0, import_kolmafia63.toItem)(get("rufusDesiredItems"))
    }));
  }), get("questRufus") !== "unstarted");
}
function rifts() {
  return [].concat(RIFTS);
}
var byIngress = makeByXFunction(currentIngress);
function submitQuest() {
  return questStep("questRufus") === 1 ? (withChoice(1498, 1, function() {
    return (0, import_kolmafia63.use)(item9);
  }), questStep("questRufus") === -1) : !1;
}

// src/resources/2023/CursedMonkeyPaw.ts
var CursedMonkeyPaw_exports = {};
__export(CursedMonkeyPaw_exports, {
  getUnwishableEffects: function() {
    return getUnwishableEffects;
  },
  have: function() {
    return have49;
  },
  isWishable: function() {
    return isWishable;
  },
  wishFor: function() {
    return wishFor;
  },
  wishableItems: function() {
    return wishableItems;
  },
  wishes: function() {
    return wishes;
  }
});
init_kolmafia_polyfill();
var import_kolmafia64 = require("kolmafia");
var _templateObject401;
function _taggedTemplateLiteral51(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item10 = $item(_templateObject401 || (_templateObject401 = _taggedTemplateLiteral51(["cursed monkey's paw"])));
function have49() {
  return have(item10);
}
function wishes() {
  return clamp(5 - get("_monkeyPawWishesUsed"), 0, 5);
}
function wishableItems() {
  var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return new Set(import_kolmafia64.Location.all().filter(function(l) {
    var _filters$location, _filters$location2;
    return (0, import_kolmafia64.canAdventure)(l) && ((_filters$location = (_filters$location2 = filters.location) === null || _filters$location2 === void 0 ? void 0 : _filters$location2.call(filters, l)) !== null && _filters$location !== void 0 ? _filters$location : !0);
  }).flatMap(function(l) {
    return (0, import_kolmafia64.getMonsters)(l).filter(function(m) {
      var _filters$monster, _filters$monster2;
      return m.copyable && ((_filters$monster = (_filters$monster2 = filters.monster) === null || _filters$monster2 === void 0 ? void 0 : _filters$monster2.call(filters, m)) !== null && _filters$monster !== void 0 ? _filters$monster : !0);
    }).flatMap(function(m) {
      return (0, import_kolmafia64.itemDropsArray)(m).filter(function(_ref) {
        var _filters$drop, _filters$drop2, type = _ref.type, rate = _ref.rate, drop = _ref.drop;
        return !drop.quest && (type !== "c" || rate >= 1) && // Remove random roll drops
        ((_filters$drop = (_filters$drop2 = filters.drop) === null || _filters$drop2 === void 0 ? void 0 : _filters$drop2.call(filters, {
          type: type,
          rate: rate,
          drop: drop
        })) !== null && _filters$drop !== void 0 ? _filters$drop : !0);
      }).map(function(_ref2) {
        var drop = _ref2.drop;
        return drop;
      });
    });
  }));
}
var INVALID_CHARACTERS = /[^a-z\d -]/g, _unwishableEffects;
function unwishableEffects() {
  var names = import_kolmafia64.Effect.all().filter(function(e) {
    return !e.attributes.includes("nohookah");
  }).map(function(e) {
    var name = e.name.toLowerCase();
    return {
      name: name,
      splitName: name.split(INVALID_CHARACTERS)
    };
  });
  return names.filter(function(_ref3) {
    var name = _ref3.name, splitName = _ref3.splitName;
    return (
      // Any effect that doesn't contain an INVALID_CHARACTER is fine
      splitName.length > 1 && // To be unwishable, there can't be any substrings that uniquely match a genie-wishable effect
      splitName.every(function(s) {
        return (
          // So we check every maximal substring against every one of our genie-wishable effects, excluding the effect we're currently looking at
          // if one of the substrings matches a substring associated with another effect, we're screwed.
          names.some(function(_ref4) {
            var n = _ref4.name;
            return n !== name && n.includes(s);
          })
        );
      })
    );
  }).map(function(_ref5) {
    var name = _ref5.name;
    return (0, import_kolmafia64.toEffect)(name);
  });
}
function getUnwishableEffects() {
  var _unwishableEffects2;
  return (_unwishableEffects2 = _unwishableEffects) !== null && _unwishableEffects2 !== void 0 ? _unwishableEffects2 : _unwishableEffects = unwishableEffects();
}
function isWishable(wish) {
  return wish instanceof import_kolmafia64.Item ? wishableItems().has(wish) : wish.attributes.includes("nohookah") ? !1 : wish.name.match(/[.,']/) ? !getUnwishableEffects().includes(wish) : !0;
}
function wishFor(wish) {
  if (wishes() <= 0) return !1;
  if (wish instanceof import_kolmafia64.Effect) return (0, import_kolmafia64.monkeyPaw)(wish);
  var locations = import_kolmafia64.Location.all().filter(function(l) {
    return (0, import_kolmafia64.canAdventure)(l) && (0, import_kolmafia64.getMonsters)(l).some(function(m) {
      return m.copyable && (0, import_kolmafia64.itemDropsArray)(m).some(function(_ref6) {
        var drop = _ref6.drop;
        return drop === wish;
      });
    });
  });
  try {
    locations.length && ((0, import_kolmafia64.cliExecute)("checkpoint"), (0, import_kolmafia64.prepareForAdventure)(locations[0]));
    var result = (0, import_kolmafia64.monkeyPaw)(wish);
    return result || logger_default.debug("Failed to monkeyPaw wish for ".concat(wish, "; assumed it was available in locations ").concat(locations.join(", "))), result;
  } finally {
    locations.length && (0, import_kolmafia64.cliExecute)("outfit checkpoint");
  }
}

// src/resources/2024/AprilingBandHelmet.ts
var AprilingBandHelmet_exports = {};
__export(AprilingBandHelmet_exports, {
  INSTRUMENTS: function() {
    return INSTRUMENTS;
  },
  INSTRUMENT_ITEMS: function() {
    return INSTRUMENT_ITEMS;
  },
  MARCHING_SONGS: function() {
    return MARCHING_SONGS;
  },
  MARCHING_SONG_EFFECTS: function() {
    return MARCHING_SONG_EFFECTS;
  },
  canChangeSong: function() {
    return canChangeSong;
  },
  canJoinSection: function() {
    return canJoinSection;
  },
  canPlay: function() {
    return canPlay;
  },
  changeSong: function() {
    return changeSong;
  },
  conduct: function() {
    return conduct;
  },
  have: function() {
    return have50;
  },
  joinSection: function() {
    return joinSection;
  },
  play: function() {
    return play;
  }
});
init_kolmafia_polyfill();
var import_kolmafia65 = require("kolmafia");
var _templateObject408;
function _slicedToArray16(r, e) {
  return _arrayWithHoles16(r) || _iterableToArrayLimit16(r, e) || _unsupportedIterableToArray28(r, e) || _nonIterableRest16();
}
function _nonIterableRest16() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray28(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray28(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray28(r, a) : void 0;
  }
}
function _arrayLikeToArray28(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit16(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles16(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral52(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var helmet2 = $item(_templateObject408 || (_templateObject408 = _taggedTemplateLiteral52(["Apriling band helmet"])));
function have50() {
  return have(helmet2);
}
var MARCHING_SONGS = Object.freeze(["Apriling Band Patrol Beat", "Apriling Band Battle Cadence", "Apriling Band Celebration Bop"]), MARCHING_SONG_EFFECTS = Object.freeze(MARCHING_SONGS.map(function(song2) {
  return (0, import_kolmafia65.toEffect)(song2);
})), INSTRUMENTS = Object.freeze(["Apriling band saxophone", "Apriling band quad tom", "Apriling band tuba", "Apriling band staff", "Apriling band piccolo"]), INSTRUMENT_ITEMS = Object.freeze(INSTRUMENTS.map(function(instrument) {
  return (0, import_kolmafia65.toItem)(instrument);
})), visitConduct = function() {
  return (0, import_kolmafia65.visitUrl)("inventory.php?pwd&action=apriling");
};
function canJoinSection() {
  return have50() && get("_aprilBandInstruments") < 2;
}
function makeConductFunction(mafiaClass, canDo, set3, offset) {
  return function(input) {
    if (!canDo()) return !1;
    var _ref = typeof input == "string" ? [input, mafiaClass.get(input)] : [input.name, input], _ref2 = _slicedToArray16(_ref, 2), name = _ref2[0], instance = _ref2[1];
    if (have(instance)) return !0;
    var key = set3.indexOf(name);
    return key === -1 ? !1 : (visitConduct(), (0, import_kolmafia65.runChoice)(key + offset), (0, import_kolmafia65.runChoice)(9), have(instance));
  };
}
var joinSection = makeConductFunction(import_kolmafia65.Item, canJoinSection, INSTRUMENTS, 4);
function canChangeSong() {
  return have50() && get("nextAprilBandTurn") <= (0, import_kolmafia65.totalTurnsPlayed)();
}
var changeSong = makeConductFunction(import_kolmafia65.Effect, canChangeSong, MARCHING_SONGS, 1);
function conduct(result) {
  return result instanceof import_kolmafia65.Item || arrayContains(result, INSTRUMENTS) ? joinSection(result) : changeSong(result);
}
function play(instrument) {
  var acquire = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, item14 = instrument instanceof import_kolmafia65.Item ? instrument : import_kolmafia65.Item.get(instrument);
  if (!canPlay(instrument, acquire)) return !1;
  acquire && !have(item14) && joinSection(item14);
  var currentUsesRemaining = item14.dailyusesleft;
  return (0, import_kolmafia65.visitUrl)("inventory.php?pwd=".concat((0, import_kolmafia65.myHash)(), "&iid=").concat(item14.id, "&action=aprilplay"), !1), item14.dailyusesleft !== currentUsesRemaining;
}
function canPlay(instrument) {
  var acquire = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  if (!have50()) return !1;
  var item14 = instrument instanceof import_kolmafia65.Item ? instrument : import_kolmafia65.Item.get(instrument);
  return !(!have(item14) && (!acquire || !canJoinSection()) || item14.dailyusesleft <= 0);
}

// src/resources/2024/ChestMimic.ts
var ChestMimic_exports = {};
__export(ChestMimic_exports, {
  differentiableQuantity: function() {
    return differentiableQuantity;
  },
  differentiate: function() {
    return differentiate;
  },
  donate: function() {
    return donate;
  },
  eggMonsters: function() {
    return eggMonsters;
  },
  getDonableMonsters: function() {
    return getDonableMonsters;
  },
  getReceivableMonsters: function() {
    return getReceivableMonsters;
  },
  have: function() {
    return have51;
  },
  receive: function() {
    return receive;
  }
});
init_kolmafia_polyfill();
var import_kolmafia66 = require("kolmafia");
var _templateObject409, _templateObject2108, _templateObject3101, _templateObject467;
function _taggedTemplateLiteral53(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var familiar9 = $familiar(_templateObject409 || (_templateObject409 = _taggedTemplateLiteral53(["Chest Mimic"])));
function have51() {
  return have(familiar9);
}
var visitBank = function() {
  return (0, import_kolmafia66.visitUrl)("place.php?whichplace=town_right&action=townright_dna", !1);
}, canDonate = function() {
  return have($item(_templateObject2108 || (_templateObject2108 = _taggedTemplateLiteral53(["mimic egg"])))) && get("_mimicEggsDonated") < 3;
}, canReceive = function() {
  return familiar9.experience >= 100 && get("_mimicEggsObtained") < 11;
}, makeXpath = function(selectNumber, disabled) {
  return '//select[@name="mid"]['.concat(selectNumber, "]/option[position()>0]").concat(disabled ? "[@disabled]" : "", "/@value");
};
function getMonsters3(selectNumber, page) {
  var total = (0, import_kolmafia66.xpath)(page, makeXpath(selectNumber, !1)), disabled = new Set((0, import_kolmafia66.xpath)(page, makeXpath(selectNumber, !0)));
  return total.filter(function(m) {
    return !disabled.has(m);
  }).map(function(id) {
    return (0, import_kolmafia66.toMonster)(id);
  });
}
function getDonableMonsters() {
  if (!canDonate()) return [];
  var selectNumber = canReceive() ? 2 : 1;
  try {
    var page = visitBank();
    return getMonsters3(selectNumber, page);
  } finally {
    (0, import_kolmafia66.visitUrl)("main.php");
  }
}
function getReceivableMonsters() {
  if (!canReceive()) return [];
  try {
    var page = visitBank();
    return getMonsters3(1, page);
  } finally {
    (0, import_kolmafia66.visitUrl)("main.php");
  }
}
function donate(monster) {
  if (!canDonate()) return !1;
  try {
    var selectNumber = canReceive() ? 2 : 1, page = visitBank(), available6 = getMonsters3(selectNumber, page);
    return available6.includes(monster) ? (0, import_kolmafia66.runChoice)(1, "mid=".concat(monster.id)).includes("You donate your egg to science.") : !1;
  } finally {
    (0, import_kolmafia66.visitUrl)("main.php");
  }
}
function receive(monster) {
  if (!canReceive()) return !1;
  try {
    var page = visitBank(), available6 = getMonsters3(1, page);
    return available6.includes(monster) ? (0, import_kolmafia66.runChoice)(2, "mid=".concat(monster.id)).includes("Your mimic pops into a backroom and returns a few moments later with a fresh mimic egg!") : !1;
  } finally {
    (0, import_kolmafia66.visitUrl)("main.php");
  }
}
function differentiate(monster) {
  var page = directlyUse($item(_templateObject3101 || (_templateObject3101 = _taggedTemplateLiteral53(["mimic egg"])))), monsters = getMonsters3(1, page);
  if (!monsters.includes(monster))
    return (0, import_kolmafia66.visitUrl)("main.php"), !1;
  (0, import_kolmafia66.runChoice)(1, "mid=".concat(monster.id));
  for (var _len = arguments.length, combatParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    combatParams[_key - 1] = arguments[_key];
  return import_kolmafia66.runCombat.apply(void 0, combatParams), !0;
}
function eggMonsters() {
  return new Map(multiSplit(get("mimicEgg"), ",", ":", [import_kolmafia66.toMonster, Number]));
}
function differentiableQuantity(monster) {
  var _eggMonsters$get;
  return have($item(_templateObject467 || (_templateObject467 = _taggedTemplateLiteral53(["mimic egg"])))) && (_eggMonsters$get = eggMonsters().get(monster)) !== null && _eggMonsters$get !== void 0 ? _eggMonsters$get : 0;
}

// src/resources/2024/MayamCalendar.ts
var MayamCalendar_exports = {};
__export(MayamCalendar_exports, {
  RESONANCES: function() {
    return RESONANCES;
  },
  RESONANCE_KEYS: function() {
    return RESONANCE_KEYS;
  },
  RINGS: function() {
    return RINGS;
  },
  available: function() {
    return available5;
  },
  getResonanceResult: function() {
    return getResonanceResult;
  },
  have: function() {
    return have52;
  },
  remainingUses: function() {
    return remainingUses;
  },
  resonanceAvailable: function() {
    return resonanceAvailable;
  },
  resonanceFor: function() {
    return resonanceFor;
  },
  submit: function() {
    return submit;
  },
  symbolsUsed: function() {
    return symbolsUsed;
  },
  toCombination: function() {
    return toCombination;
  },
  toCombinationString: function() {
    return toCombinationString;
  }
});
init_kolmafia_polyfill();
var import_kolmafia67 = require("kolmafia");
var _templateObject468, _templateObject2109, _templateObject3102, _templateObject469, _templateObject540, _templateObject635, _templateObject730, _templateObject828, _templateObject925, _templateObject1022, _templateObject1121, _templateObject1220;
function _slicedToArray17(r, e) {
  return _arrayWithHoles17(r) || _iterableToArrayLimit17(r, e) || _unsupportedIterableToArray29(r, e) || _nonIterableRest17();
}
function _nonIterableRest17() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit17(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles17(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray16(r) {
  return _arrayWithoutHoles16(r) || _iterableToArray16(r) || _unsupportedIterableToArray29(r) || _nonIterableSpread16();
}
function _nonIterableSpread16() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray29(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray29(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray29(r, a) : void 0;
  }
}
function _iterableToArray16(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles16(r) {
  if (Array.isArray(r)) return _arrayLikeToArray29(r);
}
function _arrayLikeToArray29(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral54(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var RINGS = Object.freeze([["yam1", "sword", "eye", "chair", "fur", "vessel"], ["lightning", "bottle", "meat", "wood", "yam2"], ["yam3", "wall", "cheese", "eyepatch"], ["explosion", "clock", "yam4"]]);
function have52() {
  return have($item(_templateObject468 || (_templateObject468 = _taggedTemplateLiteral54(["Mayam Calendar"]))));
}
function symbolsUsed() {
  return get("_mayamSymbolsUsed").split(",");
}
function available5() {
  for (var _len = arguments.length, symbols = new Array(_len), _key = 0; _key < _len; _key++)
    symbols[_key] = arguments[_key];
  return symbols.every(function(symbol) {
    return !symbolsUsed().includes(symbol);
  });
}
function remainingUses() {
  return RINGS[3].filter(function(symbol) {
    return available5(symbol);
  }).length;
}
function toCombination(combination) {
  return combination.length === 1 ? combination[0].split(" ") : combination;
}
function toCombinationString(combination) {
  return combination.length === 1 ? combination[0] : combination.join(" ");
}
function submit() {
  for (var _len2 = arguments.length, combination = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
    combination[_key2] = arguments[_key2];
  return available5.apply(void 0, _toConsumableArray16(toCombination(combination))) ? (0, import_kolmafia67.cliExecute)("mayam rings ".concat(combination.join(" ").replace(/yam\d/g, "yam"))) : !1;
}
var RESONANCES = Object.freeze({
  "eye yam2 eyepatch yam4": $item(_templateObject2109 || (_templateObject2109 = _taggedTemplateLiteral54(["Mayam spinach"]))),
  "vessel yam2 cheese explosion": $item(_templateObject3102 || (_templateObject3102 = _taggedTemplateLiteral54(["stuffed yam stinkbomb"]))),
  "yam1 meat cheese yam4": $item(_templateObject469 || (_templateObject469 = _taggedTemplateLiteral54(["yam and swiss"]))),
  "sword yam2 eyepatch explosion": $item(_templateObject540 || (_templateObject540 = _taggedTemplateLiteral54(["yam cannon"]))),
  "fur lightning eyepatch yam4": $item(_templateObject635 || (_templateObject635 = _taggedTemplateLiteral54(["tiny yam cannon"]))),
  "yam1 lightning yam3 clock": $item(_templateObject730 || (_templateObject730 = _taggedTemplateLiteral54(["yam battery"]))),
  "fur yam2 wall yam4": $item(_templateObject828 || (_templateObject828 = _taggedTemplateLiteral54(["furry yam buckler"]))),
  "yam1 yam2 yam3 explosion": $item(_templateObject925 || (_templateObject925 = _taggedTemplateLiteral54(["thanksgiving bomb"]))),
  "yam1 meat eyepatch yam4": $item(_templateObject1022 || (_templateObject1022 = _taggedTemplateLiteral54(["yamtility belt"]))),
  "chair yam2 yam3 clock": $effect(_templateObject1121 || (_templateObject1121 = _taggedTemplateLiteral54(["Caught Yam-Handed"]))),
  "yam1 yam2 cheese clock": $effect(_templateObject1220 || (_templateObject1220 = _taggedTemplateLiteral54(["Memories of Cheesier Age"])))
}), RESONANCE_KEYS = Object.keys(RESONANCES);
function resonanceFor(target) {
  var _ref, _find;
  return (_ref = (_find = _toConsumableArray16(Object.entries(RESONANCES)).find(function(_ref2) {
    var _ref3 = _slicedToArray17(_ref2, 2), value = _ref3[1];
    return value === target;
  })) === null || _find === void 0 ? void 0 : _find[0].split(" ")) !== null && _ref !== void 0 ? _ref : null;
}
function resonanceAvailable(target) {
  var resonance = resonanceFor(target);
  return !!resonance && available5.apply(void 0, _toConsumableArray16(resonance));
}
function getResonanceResult() {
  for (var _len3 = arguments.length, combination = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
    combination[_key3] = arguments[_key3];
  var combinationString = combination.length === 1 ? combination[0] : combination.join(" ");
  return combinationString in RESONANCES ? RESONANCES[combinationString] : null;
}

// src/resources/2024/TearawayPants.ts
var TearawayPants_exports = {};
__export(TearawayPants_exports, {
  expectedTotalAdventures: function() {
    return expectedTotalAdventures;
  },
  have: function() {
    return have53;
  },
  plantsAdventureChance: function() {
    return plantsAdventureChance;
  },
  unlockGuild: function() {
    return unlockGuild;
  }
});
init_kolmafia_polyfill();
var import_kolmafia68 = require("kolmafia");
var _templateObject470, _templateObject2118, _templateObject3103;
function _taggedTemplateLiteral55(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item11 = $item(_templateObject470 || (_templateObject470 = _taggedTemplateLiteral55(["tearaway pants"])));
function have53() {
  return have(item11);
}
function plantsAdventureChance() {
  var advs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_tearawayPantsAdvs");
  return 1 / (2 + advs);
}
function expectedTotalAdventures(turnsToSpend) {
  var startingAdvs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : get("_tearawayPantsAdvs");
  return (1 - 2 * startingAdvs + Math.sqrt(4 * startingAdvs ** 2 - 4 * startingAdvs + 1 + 8 * turnsToSpend)) / 2;
}
function unlockGuild() {
  if (!$classes(_templateObject2118 || (_templateObject2118 = _taggedTemplateLiteral55(["Disco Bandit, Accordion Thief"]))).includes((0, import_kolmafia68.myClass)())) return !1;
  if (questStep("questG08Moxie") >= 999) return !0;
  if (!have53()) return !1;
  try {
    (0, import_kolmafia68.cliExecute)("checkpoint"), (0, import_kolmafia68.equip)($slot(_templateObject3103 || (_templateObject3103 = _taggedTemplateLiteral55(["pants"]))), item11), (0, import_kolmafia68.visitUrl)("guild.php?place=challenge");
  } finally {
    (0, import_kolmafia68.cliExecute)("outfit checkpoint");
  }
  return questStep("questG08Moxie") >= 999;
}

// src/resources/2024/BatWings.ts
var BatWings_exports = {};
__export(BatWings_exports, {
  cauldronsRemaining: function() {
    return cauldronsRemaining;
  },
  flapChance: function() {
    return flapChance;
  },
  have: function() {
    return have54;
  },
  jumpBridge: function() {
    return jumpBridge;
  },
  restUpsideDownRemaining: function() {
    return restUpsideDownRemaining;
  },
  swoopsRemaining: function() {
    return swoopsRemaining;
  }
});
init_kolmafia_polyfill();
var import_kolmafia69 = require("kolmafia");
var _templateObject471, _templateObject2119, _templateObject3104, _templateObject476, _templateObject541, _templateObject636;
function _taggedTemplateLiteral56(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function have54() {
  return have($item(_templateObject471 || (_templateObject471 = _taggedTemplateLiteral56(["bat wings"]))));
}
function swoopsRemaining() {
  return have54() ? $skill(_templateObject2119 || (_templateObject2119 = _taggedTemplateLiteral56(["Swoop like a Bat"]))).dailylimit : 0;
}
function restUpsideDownRemaining() {
  return have54() ? $skill(_templateObject3104 || (_templateObject3104 = _taggedTemplateLiteral56(["Rest upside down"]))).dailylimit : 0;
}
function cauldronsRemaining() {
  return have54() ? $skill(_templateObject476 || (_templateObject476 = _taggedTemplateLiteral56(["Summon Cauldron of Bats"]))).dailylimit : 0;
}
function flapChance() {
  var flaps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_batWingsFreeFights");
  return flaps < 5 ? 1 / (2 + flaps) : 0;
}
function jumpBridge() {
  if (get("chasmBridgeProgress") < 25 || questStep("questL09Topping") === 0 || !have54())
    return !1;
  if (get("chasmBridgeProgress") === 30 || questStep("questL09Topping") >= 1)
    return !0;
  var back = (0, import_kolmafia69.equippedItem)($slot(_templateObject541 || (_templateObject541 = _taggedTemplateLiteral56(["back"]))));
  return (0, import_kolmafia69.equip)($item(_templateObject636 || (_templateObject636 = _taggedTemplateLiteral56(["bat wings"])))), (0, import_kolmafia69.visitUrl)("place.php?whichplace=orc_chasm&action=bridge_jump"), (0, import_kolmafia69.visitUrl)("place.php?whichplace=highlands&action=highlands_dude"), (0, import_kolmafia69.equip)(back), questStep("questL09Topping") >= 2;
}

// src/resources/2024/EverfullDarts.ts
var EverfullDarts_exports = {};
__export(EverfullDarts_exports, {
  bullseyeChance: function() {
    return bullseyeChance;
  },
  bullseyeCooldown: function() {
    return bullseyeCooldown;
  },
  currentPerks: function() {
    return currentPerks;
  },
  dartCapacity: function() {
    return dartCapacity;
  },
  have: function() {
    return have55;
  },
  perksMaxed: function() {
    return perksMaxed;
  }
});
init_kolmafia_polyfill();
var _templateObject477;
function _taggedTemplateLiteral57(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item12 = $item(_templateObject477 || (_templateObject477 = _taggedTemplateLiteral57(["Everfull Dart Holster"])));
function have55() {
  return have(item12);
}
var PERKS = ["Throw a second dart quickly", "Deal 25-50% more damage", "You are less impressed by bullseyes", "25% Better bullseye targeting", "Extra stats from stats targets", "Butt awareness", "Add Hot Damage", "Add Cold Damage", "Add Sleaze Damage", "Add Spooky Damage", "Add Stench Damage", "Expand your dart capacity by 1", "Bullseyes do not impress you much", "25% More Accurate bullseye targeting", "Deal 25-50% extra damage", "Expand your dart capacity by 1", "Increase Dart Deleveling from deleveling targets", "Deal 25-50% greater damage", "Extra stats from stats targets", "25% better chance to hit bullseyes"];
function currentPerks() {
  return get("everfullDartPerks").split(",");
}
function perksMaxed() {
  return currentPerks().length === PERKS.length;
}
function makePerkFunction(perkOrPerks, formula) {
  var current2 = currentPerks();
  return Array.isArray(perkOrPerks) ? function() {
    return formula(perkOrPerks.filter(function(perk) {
      return current2.includes(perk);
    }).length);
  } : function() {
    return formula(current2.filter(function(perk) {
      return perk === perkOrPerks;
    }).length);
  };
}
var BULLSEYE_ACCURACY_PERKS = ["25% Better bullseye targeting", "25% better chance to hit bullseyes", "25% More Accurate bullseye targeting"], bullseyeChance = makePerkFunction(BULLSEYE_ACCURACY_PERKS, function(perks) {
  return clamp(0.25 * (1 + perks), 0, 1);
}), BULLSEYE_COOLDOWN_PERKS = ["You are less impressed by bullseyes", "Bullseyes do not impress you much"], bullseyeCooldown = makePerkFunction(BULLSEYE_COOLDOWN_PERKS, function(perks) {
  return clamp(50 - 10 * perks, 30, 50);
}), dartCapacity = makePerkFunction("Expand your dart capacity by 1", function(perks) {
  return 1 + perks;
});

// src/resources/2024/TakerSpace.ts
var TakerSpace_exports = {};
__export(TakerSpace_exports, {
  allRecipes: function() {
    return allRecipes;
  },
  amount: function() {
    return amount;
  },
  canMake: function() {
    return canMake;
  },
  currentResources: function() {
    return currentResources;
  },
  have: function() {
    return have56;
  },
  haveEnoughFor: function() {
    return haveEnoughFor;
  },
  installed: function() {
    return installed5;
  },
  make: function() {
    return make;
  },
  recipeFor: function() {
    return recipeFor;
  }
});
init_kolmafia_polyfill();
var import_kolmafia70 = require("kolmafia");
var _templateObject478, _templateObject2120, _templateObject3105, _templateObject479, _templateObject544, _templateObject637, _templateObject731, _templateObject829, _templateObject926, _templateObject1023, _templateObject1122, _templateObject1221, _templateObject1319, _templateObject1417, _templateObject1515, _templateObject1615, _templateObject1715, _templateObject1815;
function _toConsumableArray17(r) {
  return _arrayWithoutHoles17(r) || _iterableToArray17(r) || _unsupportedIterableToArray30(r) || _nonIterableSpread17();
}
function _nonIterableSpread17() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray17(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles17(r) {
  if (Array.isArray(r)) return _arrayLikeToArray30(r);
}
function _slicedToArray18(r, e) {
  return _arrayWithHoles18(r) || _iterableToArrayLimit18(r, e) || _unsupportedIterableToArray30(r, e) || _nonIterableRest18();
}
function _nonIterableRest18() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray30(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray30(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray30(r, a) : void 0;
  }
}
function _arrayLikeToArray30(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit18(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles18(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral58(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var item13 = $item(_templateObject478 || (_templateObject478 = _taggedTemplateLiteral58(["TakerSpace letter of Marque"])));
function installed5() {
  return (0, import_kolmafia70.getWorkshed)() === item13;
}
function have56() {
  return installed5() || have(item13);
}
var RESOURCES = ["Spice", "Rum", "Anchor", "Mast", "Silk", "Gold"], RECIPES = /* @__PURE__ */ new Map([[$item(_templateObject2120 || (_templateObject2120 = _taggedTemplateLiteral58(["deft pirate hook"]))), [0, 0, 1, 1, 0, 1]], [$item(_templateObject3105 || (_templateObject3105 = _taggedTemplateLiteral58(["iron tricorn hat"]))), [0, 0, 2, 1, 0, 0]], [$item(_templateObject479 || (_templateObject479 = _taggedTemplateLiteral58(["jolly roger flag"]))), [0, 1, 0, 1, 1, 0]], [$item(_templateObject544 || (_templateObject544 = _taggedTemplateLiteral58(["sleeping profane parrot"]))), [15, 3, 0, 0, 2, 1]], [$item(_templateObject637 || (_templateObject637 = _taggedTemplateLiteral58(["pirrrate's currrse"]))), [2, 2, 0, 0, 0, 0]], [$item(_templateObject731 || (_templateObject731 = _taggedTemplateLiteral58(["tankard of spiced rum"]))), [1, 2, 0, 0, 0, 0]], [$item(_templateObject829 || (_templateObject829 = _taggedTemplateLiteral58(["packaged luxury garment"]))), [0, 0, 0, 0, 3, 2]], [$item(_templateObject926 || (_templateObject926 = _taggedTemplateLiteral58(["harpoon"]))), [0, 0, 0, 2, 0, 0]], [$item(_templateObject1023 || (_templateObject1023 = _taggedTemplateLiteral58(["chili powder cutlass"]))), [5, 0, 1, 0, 0, 0]], [$item(_templateObject1122 || (_templateObject1122 = _taggedTemplateLiteral58(["cursed Aztec tamale"]))), [2, 0, 0, 0, 0, 0]], [$item(_templateObject1221 || (_templateObject1221 = _taggedTemplateLiteral58(["jolly roger tattoo kit"]))), [0, 6, 1, 1, 0, 6]], [$item(_templateObject1319 || (_templateObject1319 = _taggedTemplateLiteral58(["golden pet rock"]))), [0, 0, 0, 0, 0, 7]], [$item(_templateObject1417 || (_templateObject1417 = _taggedTemplateLiteral58(["groggles"]))), [0, 6, 0, 0, 0, 0]], [$item(_templateObject1515 || (_templateObject1515 = _taggedTemplateLiteral58(["pirate dinghy"]))), [0, 0, 1, 1, 1, 0]], [$item(_templateObject1615 || (_templateObject1615 = _taggedTemplateLiteral58(["anchor bomb"]))), [0, 1, 3, 1, 0, 1]], [$item(_templateObject1715 || (_templateObject1715 = _taggedTemplateLiteral58(["silky pirate drawers"]))), [0, 0, 0, 0, 2, 0]], [$item(_templateObject1815 || (_templateObject1815 = _taggedTemplateLiteral58(["spices"]))), [1, 0, 0, 0, 0, 0]]]);
function allRecipes() {
  return new Map(RECIPES.entries().map(function(_ref) {
    var _ref2 = _slicedToArray18(_ref, 2), item14 = _ref2[0], recipe = _ref2[1];
    return [item14, _toConsumableArray17(recipe)];
  }));
}
var defaultAmount = function(resource) {
  return ["Silk", "Gold"].includes(resource) ? 1 : 3;
};
function amount(resource) {
  return get("takerSpace".concat(resource)) + (!installed5() && !get("_workshedItemUsed") ? defaultAmount(resource) : 0);
}
function recipeFor(item14) {
  var result = RECIPES.get(item14);
  return result ? _toConsumableArray17(result) : null;
}
function currentResources() {
  return RESOURCES.map(amount);
}
function haveEnoughFor(item14) {
  var amount2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, recipe = recipeFor(item14);
  return recipe ? currentResources().every(function(resource, index) {
    return resource >= amount2 * recipe[index];
  }) : !1;
}
function canMake(item14) {
  var amount2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return installed5() && haveEnoughFor(item14, amount2);
}
function make(item14) {
  var amount2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return canMake(item14, amount2) && (0, import_kolmafia70.create)(item14, amount2);
}

// src/resources/putty-likes.ts
init_kolmafia_polyfill();
function getTotalPuttyLikeCopiesMade() {
  return getSpookyPuttySheetCopiesMade() + getRainDohBlackBoxCopiesMade();
}
function couldUseRainDohBlackBox() {
  return have9() && getRainDohBlackBoxCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var RainDohBlackBox = new Copier(function() {
  return couldUseRainDohBlackBox();
}, null, function() {
  return couldUseRainDohBlackBox();
}, function() {
  return getRainDohBlackBoxMonster();
}, function() {
  return useRainDohBlackBox();
});
function couldUseSpookyPuttySheet() {
  return have7() && getSpookyPuttySheetCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var SpookyPuttySheet = new Copier(function() {
  return couldUseSpookyPuttySheet();
}, function() {
  return prepareSpookyPuttySheet();
}, function() {
  return couldUseSpookyPuttySheet();
}, function() {
  return getSpookyPuttySheetMonster();
}, function() {
  return useSpookyPuttySheet();
});

// src/resources/LibramSummon.ts
init_kolmafia_polyfill();

// src/resources/2007/CandyHearts.ts
init_kolmafia_polyfill();
var _templateObject480, _templateObject2121, _templateObject3106, _templateObject481, _templateObject545, _templateObject638, _templateObject734;
function _taggedTemplateLiteral59(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill = $skill(_templateObject480 || (_templateObject480 = _taggedTemplateLiteral59(["Summon Candy Heart"]))), libramChance = 1 / 6, libramExpected = /* @__PURE__ */ new Map([[$item(_templateObject2121 || (_templateObject2121 = _taggedTemplateLiteral59(["green candy heart"]))), libramChance], [$item(_templateObject3106 || (_templateObject3106 = _taggedTemplateLiteral59(["lavender candy heart"]))), libramChance], [$item(_templateObject481 || (_templateObject481 = _taggedTemplateLiteral59(["orange candy heart"]))), libramChance], [$item(_templateObject545 || (_templateObject545 = _taggedTemplateLiteral59(["pink candy heart"]))), libramChance], [$item(_templateObject638 || (_templateObject638 = _taggedTemplateLiteral59(["white candy heart"]))), libramChance], [$item(_templateObject734 || (_templateObject734 = _taggedTemplateLiteral59(["yellow candy heart"]))), libramChance]]);
function have57() {
  return have(summonSkill);
}
function expected() {
  return libramExpected;
}

// src/resources/2008/DivineFavors.ts
init_kolmafia_polyfill();
var _templateObject486, _templateObject2122, _templateObject3107, _templateObject487, _templateObject546, _templateObject639, _templateObject735;
function _taggedTemplateLiteral60(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill2 = $skill(_templateObject486 || (_templateObject486 = _taggedTemplateLiteral60(["Summon Party Favor"])));
function have58() {
  return have(summonSkill2);
}
function expected2() {
  var rareSummons = get("_favorRareSummons"), totalRareChance = 1 / 2 ** (rareSummons + 1), commonChance2 = (1 - totalRareChance) / 3, rareChance2 = totalRareChance / 3;
  return /* @__PURE__ */ new Map([[$item(_templateObject2122 || (_templateObject2122 = _taggedTemplateLiteral60(["divine blowout"]))), commonChance2], [$item(_templateObject3107 || (_templateObject3107 = _taggedTemplateLiteral60(["divine can of silly string"]))), commonChance2], [$item(_templateObject487 || (_templateObject487 = _taggedTemplateLiteral60(["divine noisemaker"]))), commonChance2], [$item(_templateObject546 || (_templateObject546 = _taggedTemplateLiteral60(["divine champagne flute"]))), rareChance2], [$item(_templateObject639 || (_templateObject639 = _taggedTemplateLiteral60(["divine champagne popper"]))), rareChance2], [$item(_templateObject735 || (_templateObject735 = _taggedTemplateLiteral60(["divine cracker"]))), rareChance2]]);
}

// src/resources/2009/LoveSongs.ts
init_kolmafia_polyfill();
var _templateObject488, _templateObject2123, _templateObject3108, _templateObject489, _templateObject547, _templateObject640, _templateObject736;
function _taggedTemplateLiteral61(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill3 = $skill(_templateObject488 || (_templateObject488 = _taggedTemplateLiteral61(["Summon Love Song"]))), libramChance2 = 1 / 6, libramExpected2 = /* @__PURE__ */ new Map([[$item(_templateObject2123 || (_templateObject2123 = _taggedTemplateLiteral61(["love song of disturbing obsession"]))), libramChance2], [$item(_templateObject3108 || (_templateObject3108 = _taggedTemplateLiteral61(["love song of icy revenge"]))), libramChance2], [$item(_templateObject489 || (_templateObject489 = _taggedTemplateLiteral61(["love song of naughty innuendo"]))), libramChance2], [$item(_templateObject547 || (_templateObject547 = _taggedTemplateLiteral61(["love song of smoldering passion"]))), libramChance2], [$item(_templateObject640 || (_templateObject640 = _taggedTemplateLiteral61(["love song of sugary cuteness"]))), libramChance2], [$item(_templateObject736 || (_templateObject736 = _taggedTemplateLiteral61(["love song of vague ambiguity"]))), libramChance2]]);
function have59() {
  return have(summonSkill3);
}
function expected3() {
  return libramExpected2;
}

// src/resources/2010/Brickos.ts
init_kolmafia_polyfill();
var _templateObject490, _templateObject2124, _templateObject3109;
function _taggedTemplateLiteral62(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill4 = $skill(_templateObject490 || (_templateObject490 = _taggedTemplateLiteral62(["Summon BRICKOs"])));
function have60() {
  return have(summonSkill4);
}
function expected4() {
  var eyeSummons = get("_brickoEyeSummons"), eyeChance = eyeSummons === 3 ? 0 : eyeSummons === 0 ? 0.5 : 1 / 3;
  return /* @__PURE__ */ new Map([[$item(_templateObject2124 || (_templateObject2124 = _taggedTemplateLiteral62(["BRICKO eye brick"]))), eyeChance], [$item(_templateObject3109 || (_templateObject3109 = _taggedTemplateLiteral62(["BRICKO brick"]))), 3 - eyeChance]]);
}

// src/resources/2011/Gygaxian.ts
init_kolmafia_polyfill();
var _templateObject491, _templateObject2125, _templateObject3114, _templateObject496, _templateObject548, _templateObject641, _templateObject737;
function _taggedTemplateLiteral63(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill5 = $skill(_templateObject491 || (_templateObject491 = _taggedTemplateLiteral63(["Summon Dice"]))), libramChance3 = 1 / 6, libramExpected3 = /* @__PURE__ */ new Map([[$item(_templateObject2125 || (_templateObject2125 = _taggedTemplateLiteral63(["d4"]))), libramChance3], [$item(_templateObject3114 || (_templateObject3114 = _taggedTemplateLiteral63(["d6"]))), libramChance3], [$item(_templateObject496 || (_templateObject496 = _taggedTemplateLiteral63(["d8"]))), libramChance3], [$item(_templateObject548 || (_templateObject548 = _taggedTemplateLiteral63(["d10"]))), libramChance3], [$item(_templateObject641 || (_templateObject641 = _taggedTemplateLiteral63(["d12"]))), libramChance3], [$item(_templateObject737 || (_templateObject737 = _taggedTemplateLiteral63(["d20"]))), libramChance3]]);
function have61() {
  return have(summonSkill5);
}
function expected5() {
  return libramExpected3;
}

// src/resources/2012/Resolutions.ts
init_kolmafia_polyfill();
var _templateObject497, _templateObject2126, _templateObject3115, _templateObject498, _templateObject549, _templateObject644, _templateObject738, _templateObject830, _templateObject927, _templateObject1024;
function _taggedTemplateLiteral64(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill6 = $skill(_templateObject497 || (_templateObject497 = _taggedTemplateLiteral64(["Summon Resolutions"]))), commonChance = 0.98 / 6, rareChance = 0.02 / 3, libramExpected4 = /* @__PURE__ */ new Map([[$item(_templateObject2126 || (_templateObject2126 = _taggedTemplateLiteral64(["resolution: be feistier"]))), commonChance], [$item(_templateObject3115 || (_templateObject3115 = _taggedTemplateLiteral64(["resolution: be happier"]))), commonChance], [$item(_templateObject498 || (_templateObject498 = _taggedTemplateLiteral64(["resolution: be sexier"]))), commonChance], [$item(_templateObject549 || (_templateObject549 = _taggedTemplateLiteral64(["resolution: be smarter"]))), commonChance], [$item(_templateObject644 || (_templateObject644 = _taggedTemplateLiteral64(["resolution: be stronger"]))), commonChance], [$item(_templateObject738 || (_templateObject738 = _taggedTemplateLiteral64(["resolution: be wealthier"]))), commonChance], [$item(_templateObject830 || (_templateObject830 = _taggedTemplateLiteral64(["resolution: be kinder"]))), rareChance], [$item(_templateObject927 || (_templateObject927 = _taggedTemplateLiteral64(["resolution: be luckier"]))), rareChance], [$item(_templateObject1024 || (_templateObject1024 = _taggedTemplateLiteral64(["resolution: be more adventurous"]))), rareChance]]);
function have62() {
  return have(summonSkill6);
}
function expected6() {
  return libramExpected4;
}

// src/resources/2013/PulledTaffy.ts
init_kolmafia_polyfill();
var _templateObject499, _templateObject2127, _templateObject3116, _templateObject4100, _templateObject550, _templateObject645, _templateObject739, _templateObject831;
function _taggedTemplateLiteral65(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var summonSkill7 = $skill(_templateObject499 || (_templateObject499 = _taggedTemplateLiteral65(["Summon Taffy"])));
function have63() {
  return have(summonSkill7);
}
function expected7() {
  var rareSummons = get("_taffyRareSummons"), yellowSummons = get("_taffyYellowSummons"), onlyYellow = yellowSummons === 0 && rareSummons === 3, totalRareChance = rareSummons < 4 ? 1 / 2 ** (rareSummons + 1) : 0, commonChance2 = (1 - totalRareChance) / 4, rareChance2 = onlyYellow ? 0 : totalRareChance / (3 - get("_taffyYellowSummons")), yellowChance = yellowSummons === 1 ? 0 : onlyYellow ? totalRareChance : rareChance2;
  return /* @__PURE__ */ new Map([[$item(_templateObject2127 || (_templateObject2127 = _taggedTemplateLiteral65(["pulled blue taffy"]))), commonChance2], [$item(_templateObject3116 || (_templateObject3116 = _taggedTemplateLiteral65(["pulled orange taffy"]))), commonChance2], [$item(_templateObject4100 || (_templateObject4100 = _taggedTemplateLiteral65(["pulled violet taffy"]))), commonChance2], [$item(_templateObject550 || (_templateObject550 = _taggedTemplateLiteral65(["pulled red taffy"]))), commonChance2], [$item(_templateObject645 || (_templateObject645 = _taggedTemplateLiteral65(["pulled indigo taffy"]))), rareChance2], [$item(_templateObject739 || (_templateObject739 = _taggedTemplateLiteral65(["pulled green taffy"]))), rareChance2], [$item(_templateObject831 || (_templateObject831 = _taggedTemplateLiteral65(["pulled yellow taffy"]))), yellowChance]]);
}

// src/resources/LibramSummon.ts
var _templateObject500, _templateObject2128, _templateObject3117, _templateObject4101, _templateObject551, _templateObject646, _templateObject740, _templateObject834, _templateObject928, _templateObject1025, _templateObject1123, _templateObject1222, _templateObject1320, _templateObject1418;
function _slicedToArray19(r, e) {
  return _arrayWithHoles19(r) || _iterableToArrayLimit19(r, e) || _unsupportedIterableToArray31(r, e) || _nonIterableRest19();
}
function _nonIterableRest19() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray31(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray31(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray31(r, a) : void 0;
  }
}
function _arrayLikeToArray31(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit19(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles19(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral66(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function expectedLibramSummon(summonSkill8) {
  switch (summonSkill8) {
    case $skill(_templateObject500 || (_templateObject500 = _taggedTemplateLiteral66(["Summon Candy Heart"]))):
      return expected();
    case $skill(_templateObject2128 || (_templateObject2128 = _taggedTemplateLiteral66(["Summon Party Favor"]))):
      return expected2();
    case $skill(_templateObject3117 || (_templateObject3117 = _taggedTemplateLiteral66(["Summon Love Song"]))):
      return expected3();
    case $skill(_templateObject4101 || (_templateObject4101 = _taggedTemplateLiteral66(["Summon BRICKOs"]))):
      return expected4();
    case $skill(_templateObject551 || (_templateObject551 = _taggedTemplateLiteral66(["Summon Dice"]))):
      return expected5();
    case $skill(_templateObject646 || (_templateObject646 = _taggedTemplateLiteral66(["Summon Resolutions"]))):
      return expected6();
    case $skill(_templateObject740 || (_templateObject740 = _taggedTemplateLiteral66(["Summon Taffy"]))):
      return expected7();
  }
  return /* @__PURE__ */ new Map();
}
function possibleLibramSummons() {
  var results = /* @__PURE__ */ new Map();
  return have57() && results.set($skill(_templateObject834 || (_templateObject834 = _taggedTemplateLiteral66(["Summon Candy Heart"]))), expected()), have58() && results.set($skill(_templateObject928 || (_templateObject928 = _taggedTemplateLiteral66(["Summon Party Favor"]))), expected2()), have59() && results.set($skill(_templateObject1025 || (_templateObject1025 = _taggedTemplateLiteral66(["Summon Love Song"]))), expected3()), have60() && results.set($skill(_templateObject1123 || (_templateObject1123 = _taggedTemplateLiteral66(["Summon BRICKOs"]))), expected4()), have61() && results.set($skill(_templateObject1222 || (_templateObject1222 = _taggedTemplateLiteral66(["Summon Dice"]))), expected5()), have62() && results.set($skill(_templateObject1320 || (_templateObject1320 = _taggedTemplateLiteral66(["Summon Resolutions"]))), expected6()), have63() && results.set($skill(_templateObject1418 || (_templateObject1418 = _taggedTemplateLiteral66(["Summon Taffy"]))), expected7()), results;
}
function bestLibramToCast() {
  var arr = Array.from(possibleLibramSummons().entries());
  return arr.length ? maxBy(arr, function(_ref) {
    var _ref2 = _slicedToArray19(_ref, 2), itemMap = _ref2[1];
    return sum(Array.from(itemMap.entries()), function(_ref3) {
      var _ref4 = _slicedToArray19(_ref3, 2), item14 = _ref4[0], weight = _ref4[1];
      return weight * getSaleValue(item14);
    });
  })[0] : null;
}

// src/ascend.ts
var _templateObject501, _templateObject2129, _templateObject3118, _templateObject4102, _templateObject554, _templateObject647, _templateObject741, _templateObject835, _templateObject929;
function _createForOfIteratorHelper8(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray32(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray18(r) {
  return _arrayWithoutHoles18(r) || _iterableToArray18(r) || _unsupportedIterableToArray32(r) || _nonIterableSpread18();
}
function _nonIterableSpread18() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray18(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles18(r) {
  if (Array.isArray(r)) return _arrayLikeToArray32(r);
}
function ownKeys8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys8(Object(t), !0).forEach(function(r2) {
      _defineProperty16(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _taggedTemplateLiteral67(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _defineProperty16(e, r, t) {
  return (r = _toPropertyKey17(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _defineProperties11(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey17(o.key), o);
  }
}
function _createClass11(e, r, t) {
  return r && _defineProperties11(e.prototype, r), t && _defineProperties11(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey17(t) {
  var i = _toPrimitive17(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive17(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _classCallCheck11(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper3(t, o, e) {
  return o = _getPrototypeOf3(o), _possibleConstructorReturn3(t, _isNativeReflectConstruct3() ? Reflect.construct(o, e || [], _getPrototypeOf3(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn3(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized3(t);
}
function _assertThisInitialized3(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits3(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf3(t, e);
}
function _wrapNativeSuper3(t) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper3 = function(t2) {
    if (t2 === null || !_isNativeFunction3(t2)) return t2;
    if (typeof t2 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r !== void 0) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct3(t2, arguments, _getPrototypeOf3(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf3(Wrapper, t2);
  }, _wrapNativeSuper3(t);
}
function _construct3(t, e, r) {
  if (_isNativeReflectConstruct3()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf3(p, r.prototype), p;
}
function _isNativeReflectConstruct3() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct3 = function() {
    return !!t;
  })();
}
function _isNativeFunction3(t) {
  try {
    return Function.toString.call(t).indexOf("[native code]") !== -1;
  } catch (n) {
    return typeof t == "function";
  }
}
function _setPrototypeOf3(t, e) {
  return _setPrototypeOf3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf3(t, e);
}
function _getPrototypeOf3(t) {
  return _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf3(t);
}
function _slicedToArray20(r, e) {
  return _arrayWithHoles20(r) || _iterableToArrayLimit20(r, e) || _unsupportedIterableToArray32(r, e) || _nonIterableRest20();
}
function _nonIterableRest20() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray32(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray32(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray32(r, a) : void 0;
  }
}
function _arrayLikeToArray32(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit20(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles20(r) {
  if (Array.isArray(r)) return r;
}
var Lifestyle = /* @__PURE__ */ function(Lifestyle2) {
  return Lifestyle2[Lifestyle2.casual = 1] = "casual", Lifestyle2[Lifestyle2.softcore = 2] = "softcore", Lifestyle2[Lifestyle2.normal = 2] = "normal", Lifestyle2[Lifestyle2.hardcore = 3] = "hardcore", Lifestyle2;
}({}), KolGender = /* @__PURE__ */ function(KolGender2) {
  return KolGender2[KolGender2.male = 1] = "male", KolGender2[KolGender2.female = 2] = "female", KolGender2;
}({});
function permedSkills() {
  return new Map(Array.from(Object.entries((0, import_kolmafia71.getPermedSkills)())).map(function(_ref) {
    var _ref2 = _slicedToArray20(_ref, 2), skillName = _ref2[0], isHardcore = _ref2[1];
    return [(0, import_kolmafia71.toSkill)(skillName), isHardcore ? Lifestyle.hardcore : Lifestyle.softcore];
  }));
}
var AscendError = /* @__PURE__ */ function(_Error) {
  function AscendError2() {
    return _classCallCheck11(this, AscendError2), _callSuper3(this, AscendError2, arguments);
  }
  return _inherits3(AscendError2, _Error), _createClass11(AscendError2);
}(/* @__PURE__ */ _wrapNativeSuper3(Error)), gardens = ["packet of pumpkin seeds", "Peppermint Pip Packet", "packet of dragon's teeth", "packet of beer seeds", "packet of winter seeds", "packet of thanksgarden seeds", "packet of tall grass seeds", "packet of mushroom spores", "packet of rock seeds"], eudorae = ["My Own Pen Pal kit", "GameInformPowerDailyPro subscription card", "Xi Receiver Unit", "New-You Club Membership Form", "Our Daily Candles\u2122 order form"], isGarden = function(x) {
  return arrayContains(x, gardens);
}, isEudora = function(x) {
  return arrayContains(x, eudorae);
}, isDesk = function(x) {
  return arrayContains(x, ChateauMantegna_exports.desks);
}, isNightstand = function(x) {
  return arrayContains(x, ChateauMantegna_exports.nightstands);
}, isCeiling = function(x) {
  return arrayContains(x, ChateauMantegna_exports.ceilings);
}, AscensionPrepError = /* @__PURE__ */ function(_Error2) {
  function AscensionPrepError2(cause, original) {
    var _this;
    return _classCallCheck11(this, AscensionPrepError2), isGarden(cause) ? (_this = _callSuper3(this, AscensionPrepError2, ["Unable to swap garden to ".concat(cause, "; garden is currently ").concat(original, ".")]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)) : isEudora(cause) ? (_this = _callSuper3(this, AscensionPrepError2, ["Unable to swap eudora to ".concat(cause, "; eudora is currently ").concat(original, ".")]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)) : isDesk(cause) ? (_this = _callSuper3(this, AscensionPrepError2, ["Unable to swap chateau desk to ".concat(cause, "; desk is currently ").concat(original, ".")]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)) : isNightstand(cause) ? (_this = _callSuper3(this, AscensionPrepError2, ["Unable to swap chateau nightstand to ".concat(cause, "; nightstand is currently ").concat(original, ".")]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)) : isCeiling(cause) ? (_this = _callSuper3(this, AscensionPrepError2, ["Unable to swap chateau ceiling to ".concat(cause, "; ceiling is currently ").concat(original, ".")]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)) : (_this = _callSuper3(this, AscensionPrepError2, [cause]), _defineProperty16(_assertThisInitialized3(_this), "cause", void 0)), _this.cause = cause, _assertThisInitialized3(_this);
  }
  return _inherits3(AscensionPrepError2, _Error2), _createClass11(AscensionPrepError2);
}(/* @__PURE__ */ _wrapNativeSuper3(Error));
function inputToMoonId(moon, playerClass) {
  if (typeof moon == "number") return moon;
  var offset = function() {
    switch (playerClass.primestat) {
      case $stat(_templateObject501 || (_templateObject501 = _taggedTemplateLiteral67(["Muscle"]))):
        return 0;
      case $stat(_templateObject2129 || (_templateObject2129 = _taggedTemplateLiteral67(["Mysticality"]))):
        return 1;
      case $stat(_templateObject3118 || (_templateObject3118 = _taggedTemplateLiteral67(["Moxie"]))):
        return 2;
      default:
        throw new AscendError("unknown prime stat for ".concat(playerClass));
    }
  }, fromNormalInput = signNameToId(tc(moon));
  if (fromNormalInput > 0) return fromNormalInput;
  switch (moon.toLowerCase()) {
    case "degrassi":
    case "degrassi knoll":
    case "friendly degrassi knoll":
    case "knoll":
      return 1 + offset();
    case "canada":
    case "canadia":
    case "little canadia":
      return 4 + offset();
    case "gnomads":
    case "gnomish":
    case "gnomish gnomads camp":
      return 7 + offset();
    default:
      throw new AscendError("Invalid moon sign!");
  }
}
function isInValhalla() {
  var charPaneText = (0, import_kolmafia71.visitUrl)("charpane.php"), matches = charPaneText.match(/<img src="[^"]*\/otherimages\/inf_\w+\.gif">/);
  return matches !== null;
}
function ascend(options) {
  var _permOptions$permSkil, _permOptions$permSkil2, DEFAULT_OPTIONS = {
    kolGender: get("defaultGenderOverride", "female") === "male" ? KolGender.male : KolGender.female,
    consumable: $item(_templateObject4102 || (_templateObject4102 = _taggedTemplateLiteral67(["astral six-pack"]))),
    pet: $item(_templateObject554 || (_templateObject554 = _taggedTemplateLiteral67(["none"])))
  }, prunedOptions = Object.fromEntries(Object.entries(options).filter(function(_ref3) {
    var _ref4 = _slicedToArray20(_ref3, 2), value = _ref4[1];
    return value;
  })), _DEFAULT_OPTIONS$prun = _objectSpread8(_objectSpread8({}, DEFAULT_OPTIONS), prunedOptions), path3 = _DEFAULT_OPTIONS$prun.path, playerClass = _DEFAULT_OPTIONS$prun.playerClass, lifestyle = _DEFAULT_OPTIONS$prun.lifestyle, kolGender = _DEFAULT_OPTIONS$prun.kolGender, moon = _DEFAULT_OPTIONS$prun.moon, consumable = _DEFAULT_OPTIONS$prun.consumable, pet = _DEFAULT_OPTIONS$prun.pet, permOptions = _DEFAULT_OPTIONS$prun.permOptions;
  if (playerClass.path !== (path3.avatar ? path3 : import_kolmafia71.Path.none))
    throw new AscendError("Invalid class ".concat(playerClass, " for this path!"));
  if (path3.id < 0) throw new AscendError("Invalid path: ".concat(path3, "!"));
  var moonId = inputToMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error("Invalid moon ".concat(moon));
  if (!$items(_templateObject647 || (_templateObject647 = _taggedTemplateLiteral67(["none, astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks"]))).includes(consumable))
    throw new AscendError("Invalid astral consumable: ".concat(consumable));
  if (!$items(_templateObject741 || (_templateObject741 = _taggedTemplateLiteral67(["none, astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt"]))).includes(pet))
    throw new AscendError("Invalid astral pet: ".concat(pet));
  var unownedSkills = _toConsumableArray18((_permOptions$permSkil = permOptions == null ? void 0 : permOptions.permSkills.keys()) !== null && _permOptions$permSkil !== void 0 ? _permOptions$permSkil : []).filter(function(skill2) {
    return !(0, import_kolmafia71.haveSkill)(skill2);
  });
  if (unownedSkills.length)
    throw new AscendError("You're trying to perm the following skills, but don't actually have them: ".concat(unownedSkills.join(", ")));
  var unpermableSkills = _toConsumableArray18((_permOptions$permSkil2 = permOptions == null ? void 0 : permOptions.permSkills.keys()) !== null && _permOptions$permSkil2 !== void 0 ? _permOptions$permSkil2 : []).filter(function(skill2) {
    return !skill2.permable;
  });
  if (unpermableSkills.length)
    throw new AscendError("You're trying to perm the following skills, but they're unpermable: ".concat(unownedSkills.join(", ")));
  if (isInValhalla() || (0, import_kolmafia71.visitUrl)("ascend.php?action=ascend&confirm=on&confirm2=on"), !isInValhalla())
    throw new AscendError("Failed to ascend--do you have a pending trade offer?");
  if ((0, import_kolmafia71.visitUrl)("afterlife.php?action=pearlygates"), consumable !== $item(_templateObject835 || (_templateObject835 = _taggedTemplateLiteral67(["none"]))) && (0, import_kolmafia71.visitUrl)("afterlife.php?action=buydeli&whichitem=".concat(consumable.id)), pet !== $item(_templateObject929 || (_templateObject929 = _taggedTemplateLiteral67(["none"]))) && (0, import_kolmafia71.visitUrl)("afterlife.php?action=buyarmory&whichitem=".concat(pet.id)), permOptions) {
    var currentPerms = permedSkills(), karma = get("bankedKarma"), _iterator = _createForOfIteratorHelper8(permOptions.permSkills.entries()), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _currentPerms$get, _step$value = _slicedToArray20(_step.value, 2), skill = _step$value[0], prospectivePermLevel = _step$value[1], currentPermLevel = (_currentPerms$get = currentPerms.get(skill)) !== null && _currentPerms$get !== void 0 ? _currentPerms$get : Lifestyle.casual;
        if (prospectivePermLevel > currentPermLevel) {
          var expectedKarma = 100 * (prospectivePermLevel - currentPermLevel);
          if (karma < expectedKarma) {
            if (!permOptions.neverAbort) throw new AscendError("Skill ".concat(skill, " is too karmaically expensive!"));
            continue;
          }
          karma -= expectedKarma;
          var permText = prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
          (0, import_kolmafia71.visitUrl)("afterlife.php?action=".concat(permText, "&whichskill=").concat(skill.id));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  (0, import_kolmafia71.visitUrl)("afterlife.php?action=ascend&confirmascend=1&whichsign=".concat(moonId, "&gender=").concat(kolGender, "&whichclass=").concat(playerClass.id, "&whichpath=").concat(path3.id, "&asctype=").concat(lifestyle, "&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd"), !0);
}
function prepareAscension() {
  var _throwOnFail, _ref5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, garden = _ref5.garden, eudora = _ref5.eudora, chateau = _ref5.chateau, throwOnFail = _ref5.throwOnFail;
  if (throwOnFail = (_throwOnFail = throwOnFail) !== null && _throwOnFail !== void 0 ? _throwOnFail : !0, garden && !Object.getOwnPropertyNames((0, import_kolmafia71.getCampground)()).includes(garden)) {
    (0, import_kolmafia71.use)(import_kolmafia71.Item.get(garden));
    var gardenName = Object.getOwnPropertyNames((0, import_kolmafia71.getCampground)()).find(isGarden);
    if (gardenName !== garden && throwOnFail)
      throw new AscensionPrepError(garden, gardenName);
  }
  if (eudora && (0, import_kolmafia71.eudoraItem)().name !== eudora) {
    var eudoraNumber = 1 + eudorae.indexOf(eudora);
    if (!(0, import_kolmafia71.xpath)((0, import_kolmafia71.visitUrl)("account.php?tab=correspondence"), '//select[@name="whichpenpal"]/option/@value').includes(eudoraNumber.toString()) && throwOnFail)
      throw new AscensionPrepError("Unable to swap eudora to ".concat(eudora, " because you are not subscribed to it."));
    if ((0, import_kolmafia71.visitUrl)("account.php?actions[]=whichpenpal&whichpenpal=".concat(eudoraNumber, "&action=Update"), !0), (0, import_kolmafia71.eudoraItem)() !== import_kolmafia71.Item.get(eudora) && throwOnFail)
      throw new AscensionPrepError(eudora, (0, import_kolmafia71.eudoraItem)());
  }
  if (chateau && ChateauMantegna_exports.have()) {
    var desk = chateau.desk, ceiling = chateau.ceiling, nightstand = chateau.nightstand;
    if (ceiling && ChateauMantegna_exports.getCeiling() !== ceiling && !ChateauMantegna_exports.changeCeiling(ceiling) && throwOnFail) {
      var _ChateauMantegna$getC;
      throw new AscensionPrepError(ceiling, (_ChateauMantegna$getC = ChateauMantegna_exports.getCeiling()) !== null && _ChateauMantegna$getC !== void 0 ? _ChateauMantegna$getC : "unknown");
    }
    if (desk && ChateauMantegna_exports.getDesk() !== desk && !ChateauMantegna_exports.changeDesk(desk) && throwOnFail) {
      var _ChateauMantegna$getD;
      throw new AscensionPrepError(desk, (_ChateauMantegna$getD = ChateauMantegna_exports.getDesk()) !== null && _ChateauMantegna$getD !== void 0 ? _ChateauMantegna$getD : "unknown");
    }
    if (nightstand && ChateauMantegna_exports.getNightstand() !== nightstand && !ChateauMantegna_exports.changeNightstand(nightstand) && throwOnFail) {
      var _ChateauMantegna$getN;
      throw new AscensionPrepError(nightstand, (_ChateauMantegna$getN = ChateauMantegna_exports.getNightstand()) !== null && _ChateauMantegna$getN !== void 0 ? _ChateauMantegna$getN : "unknown");
    }
  }
}

// src/Clan.ts
init_kolmafia_polyfill();
var import_html_entities = __toESM(require_lib(), 1), import_kolmafia72 = require("kolmafia");
function _toConsumableArray19(r) {
  return _arrayWithoutHoles19(r) || _iterableToArray19(r) || _unsupportedIterableToArray33(r) || _nonIterableSpread19();
}
function _nonIterableSpread19() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray19(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles19(r) {
  if (Array.isArray(r)) return _arrayLikeToArray33(r);
}
function _createForOfIteratorHelper9(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray33(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _slicedToArray21(r, e) {
  return _arrayWithHoles21(r) || _iterableToArrayLimit21(r, e) || _unsupportedIterableToArray33(r, e) || _nonIterableRest21();
}
function _nonIterableRest21() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray33(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray33(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray33(r, a) : void 0;
  }
}
function _arrayLikeToArray33(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit21(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles21(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck12(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties12(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey18(o.key), o);
  }
}
function _createClass12(e, r, t) {
  return r && _defineProperties12(e.prototype, r), t && _defineProperties12(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty17(e, r, t) {
  return (r = _toPropertyKey18(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey18(t) {
  var i = _toPrimitive18(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive18(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _wrapRegExp() {
  _wrapRegExp = function(e2, r2) {
    return new BabelRegExp(e2, void 0, r2);
  };
  var e = RegExp.prototype, r = /* @__PURE__ */ new WeakMap();
  function BabelRegExp(e2, t, p) {
    var o = RegExp(e2, t);
    return r.set(o, p || r.get(e2)), _setPrototypeOf4(o, BabelRegExp.prototype);
  }
  function buildGroups(e2, t) {
    var p = r.get(t);
    return Object.keys(p).reduce(function(r2, t2) {
      var o = p[t2];
      if (typeof o == "number") r2[t2] = e2[o];
      else {
        for (var i = 0; e2[o[i]] === void 0 && i + 1 < o.length; ) i++;
        r2[t2] = e2[o[i]];
      }
      return r2;
    }, /* @__PURE__ */ Object.create(null));
  }
  return _inherits4(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r2) {
    var t = e.exec.call(this, r2);
    if (t) {
      t.groups = buildGroups(t, this);
      var p = t.indices;
      p && (p.groups = buildGroups(p, this));
    }
    return t;
  }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
    if (typeof p == "string") {
      var o = r.get(this);
      return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function(e2, r2) {
        var t2 = o[r2];
        return "$" + (Array.isArray(t2) ? t2.join("$") : t2);
      }));
    }
    if (typeof p == "function") {
      var i = this;
      return e[Symbol.replace].call(this, t, function() {
        var e2 = arguments;
        return typeof e2[e2.length - 1] != "object" && (e2 = [].slice.call(e2)).push(buildGroups(e2, i)), p.apply(this, e2);
      });
    }
    return e[Symbol.replace].call(this, t, p);
  }, _wrapRegExp.apply(this, arguments);
}
function _inherits4(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf4(t, e);
}
function _setPrototypeOf4(t, e) {
  return _setPrototypeOf4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf4(t, e);
}
var clanIdCache = {}, toPlayerId = function(player) {
  return typeof player == "string" ? (0, import_kolmafia72.getPlayerId)(player) : player;
}, LOG_FAX_PATTERN = /* @__PURE__ */ _wrapRegExp(/(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (.*?))<br>/, {
  monster: 3
}), WHITELIST_DEGREE_PATTERN = /* @__PURE__ */ _wrapRegExp(/(.*?) \(\xB0(\d+)\)/, {
  name: 1,
  degree: 2
}), Clan = /* @__PURE__ */ function() {
  function Clan2(id, name) {
    _classCallCheck12(this, Clan2), _defineProperty17(this, "id", void 0), _defineProperty17(this, "name", void 0), this.id = id, this.name = name;
  }
  return _createClass12(Clan2, [{
    key: "_check",
    value: function() {
      if (this.id !== (0, import_kolmafia72.getClanId)())
        throw new Error("You are no longer a member of this clan");
    }
    /**
     * Join clan
     *
     * @returns Joined clan
     */
  }, {
    key: "join",
    value: function() {
      return Clan2.join(this.id);
    }
    /**
     * Check that this clan is the player's current clan
     *
     * @returns Whether this is the current clan
     */
  }, {
    key: "check",
    value: function() {
      return (0, import_kolmafia72.visitUrl)("clan_hall.php").includes("<b>".concat(this.name, "</b>"));
    }
    /**
     * Determine the monster that is currently in the current clan's fax machine if any
     *
     * @returns The current fax monster
     */
  }, {
    key: "getCurrentFax",
    value: function() {
      this._check();
      var logs = (0, import_kolmafia72.visitUrl)("clan_log.php"), lastFax = logs.match(LOG_FAX_PATTERN);
      if (!lastFax) return null;
      var _lastFax = _slicedToArray21(lastFax, 4), monsterName = _lastFax[3];
      return monsterName ? import_kolmafia72.Monster.get(monsterName) : null;
    }
    /**
     * List available ranks (name, degree and id) from the current clan
     *
     * @returns List of ranks
     */
  }, {
    key: "getRanks",
    value: function() {
      this._check();
      var page = (0, import_kolmafia72.visitUrl)("clan_whitelist.php");
      return (0, import_kolmafia72.xpath)(page, '//select[@name="level"]//option').map(function(option) {
        var validHtml = "<select>".concat(option, "</select>"), match = (0, import_kolmafia72.xpath)(validHtml, "//text()")[0].match(WHITELIST_DEGREE_PATTERN), id = (0, import_kolmafia72.xpath)(validHtml, "//@value")[0];
        if (!match || !id) return null;
        var _match = _slicedToArray21(match, 3), encodedName = _match[1], degree = _match[2];
        return {
          name: (0, import_html_entities.decode)(encodedName),
          degree: Number.parseInt(degree),
          id: Number.parseInt(id)
        };
      }).filter(notNull);
    }
    /**
     * Add a player to the current clan's whitelist.
     * If the player is already in the whitelist this will change their rank or title.
     *
     * @param player Player id or name
     * @param rankName Rank to give the player. If not provided they will be given the lowest rank
     * @param title Title to give the player. If not provided, will be blank
     * @returns Success
     */
  }, {
    key: "addPlayerToWhitelist",
    value: function(player, rankName) {
      var title = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      this._check();
      var playerId = toPlayerId(player), ranks = this.getRanks(), rank = rankName ? ranks.find(function(r) {
        return r.name === rankName;
      }) : ranks.sort(function(a, b) {
        return a.degree - b.degree;
      })[0];
      if (!rank) return !1;
      var result = (0, import_kolmafia72.visitUrl)("clan_whitelist.php?action=add&pwd&addwho=".concat(playerId, "&level=").concat(rank.id, "&title=").concat(title));
      return result.includes("added to whitelist.") || result.includes("That player is already on the whitelist");
    }
    /**
     * Remove a player from the current clan's whitelist
     *
     * @param player Player id or name
     * @returns Success
     */
  }, {
    key: "removePlayerFromWhitelist",
    value: function(player) {
      this._check();
      var playerId = toPlayerId(player), result = (0, import_kolmafia72.visitUrl)("clan_whitelist.php?action=updatewl&pwd&who=".concat(playerId, "&remove=Remove"));
      return result.includes("Whitelist updated.");
    }
    /**
     * Return the amount of meat in the current clan's coffer
     *
     * @returns Amount of meat
     */
  }, {
    key: "getMeatInCoffer",
    value: function() {
      this._check();
      var page = (0, import_kolmafia72.visitUrl)("clan_stash.php"), _ref = page.match(/Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./) || ["0", "0"], _ref2 = _slicedToArray21(_ref, 2), meat = _ref2[1];
      return parseNumber(meat);
    }
    /**
     * Add the given amount of meat to the current clan's coffer.
     *
     * @param amount Amount of meat to put in coffer
     * @returns Success
     */
  }, {
    key: "putMeatInCoffer",
    value: function(amount2) {
      this._check();
      var result = (0, import_kolmafia72.visitUrl)("clan_stash.php?pwd&action=contribute&howmuch=".concat(amount2));
      return result.includes("You contributed");
    }
    /**
     * Take items from the stash
     *
     * This function will also take equivalent foldables if the original item cannot be found
     *
     * @param items Items to take
     * @returns Items successfully taken
     */
  }, {
    key: "take",
    value: function(items) {
      this._check();
      var map = arrayToCountedMap(items);
      return map.forEach(function(quantity, item14) {
        var needed = Math.max(0, quantity - (0, import_kolmafia72.availableAmount)(item14));
        if (needed === 0)
          return map.set(item14, 0);
        var foldGroup = getFoldGroup(item14), _iterator = _createForOfIteratorHelper9(foldGroup), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            for (var foldable = _step.value, quantityToFold = Math.min(needed, (0, import_kolmafia72.availableAmount)(foldable)), _i2 = 0; _i2 < quantityToFold; _i2++)
              (0, import_kolmafia72.cliExecute)("fold ".concat(item14.name)), needed--;
            return map.set(item14, needed);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        (0, import_kolmafia72.refreshStash)();
        for (var _i = 0, _arr = [item14].concat(_toConsumableArray19(foldGroup)); _i < _arr.length; _i++) {
          var matchingItem = _arr[_i], quantityToTake = Math.min(needed, (0, import_kolmafia72.stashAmount)(matchingItem));
          if (quantityToTake !== 0) {
            if (!(0, import_kolmafia72.takeStash)(quantityToTake, matchingItem)) return;
            if (matchingItem === item14)
              needed -= quantityToTake;
            else
              for (var i = 0; i < quantityToTake; i++)
                (0, import_kolmafia72.cliExecute)("fold ".concat(matchingItem.name)), needed--;
          }
        }
      }), Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Put items in the stash
     *
     * @param items Items to put in the stash
     * @returns Items successfully put in the stash
     */
  }, {
    key: "put",
    value: function(items) {
      this._check();
      var map = arrayToCountedMap(items);
      if (!this.check()) throw new Error("Wanted to return ".concat(countedMapToString(map), " to ").concat(this.name, " but KoLmafia's clan data is out of sync"));
      return map.forEach(function(quantity, item14) {
        (0, import_kolmafia72.retrieveItem)(quantity, item14);
        var returned = Math.min(quantity, (0, import_kolmafia72.availableAmount)(item14));
        (0, import_kolmafia72.putStash)(returned, item14), map.set(item14, quantity - returned);
      }), Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Return the monster that is currently in the current clan's fax machine if any
     */
  }, {
    key: "withStash",
    value: function(items, callback) {
      var _this = this;
      this._check();
      var map = arrayToCountedMap(items);
      return Clan2._withStash(function() {
        return _this.take(map);
      }, function(borrowed) {
        return _this.put(borrowed);
      }, callback);
    }
  }], [{
    key: "_join",
    value: function(id) {
      var result = (0, import_kolmafia72.visitUrl)("showclan.php?recruiter=1&whichclan=".concat(id, "&pwd&whichclan=").concat(id, "&action=joinclan&apply=Apply+to+this+Clan&confirm=on"));
      if (!result.includes("clanhalltop.gif"))
        throw new Error("Could not join clan");
      return Clan2.get();
    }
  }, {
    key: "_withStash",
    value: function(borrowFn, returnFn, callback) {
      var borrowed = borrowFn(), map = arrayToCountedMap(borrowed);
      try {
        return callback(borrowed);
      } finally {
        if (map.size > 0) {
          var returned = arrayToCountedMap(returnFn(borrowed));
          map.forEach(function(quantity, item14) {
            var remaining = quantity - (returned.get(item14) || 0);
            remaining > 0 ? map.set(item14, remaining) : map.delete(item14);
          }), map.size > 0 && logger_default.error("Failed to return <b>".concat(countedMapToString(map), "</b> to <b>").concat(this.name, "</b> stash"));
        }
      }
    }
    /**
     * Join a clan
     *
     * @param clanIdOrName Clan id or name
     * @returns Instance of joined clan
     */
  }, {
    key: "join",
    value: function(clanIdOrName) {
      var clanId;
      if (typeof clanIdOrName == "string") {
        var clanName = clanIdOrName.toLowerCase();
        if (clanName === (0, import_kolmafia72.getClanName)().toLowerCase())
          return Clan2.get();
        if (!(clanName in clanIdCache)) {
          var clan = Clan2.getWhitelisted().find(function(c) {
            return c.name.toLowerCase() === clanName;
          });
          if (!clan)
            throw new Error("Player is not whitelisted to clan");
          clanIdCache[clanName] = clan.id;
        }
        clanId = clanIdCache[clanName];
      } else if (clanId = clanIdOrName, clanId === (0, import_kolmafia72.getClanId)())
        return Clan2.get();
      return Clan2._join(clanId);
    }
    /**
     * Execute callback as a member of a clan and then restore prior membership
     *
     * @param clanIdOrName Clan id or name
     * @param callback Actions to carry out while member of specified can
     * @returns Return value from callback
     */
  }, {
    key: "with",
    value: function(clanIdOrName, callback) {
      var startingClan = Clan2.get(), clan = Clan2.join(clanIdOrName);
      try {
        return callback(clan);
      } finally {
        startingClan.join();
      }
    }
    /**
     * Execute callback with items from a clan stash
     * and then restore those items to the stash
     *
     * During the execution of the callback, player will not be in the stash clan
     *
     * @param clanIdOrName Clan id or name
     */
  }, {
    key: "withStash",
    value: function(clanIdOrName, items, callback) {
      return Clan2._withStash(function() {
        return Clan2.with(clanIdOrName, function(clan) {
          return clan.take(items);
        });
      }, function(borrowed) {
        return Clan2.with(clanIdOrName, function(clan) {
          return clan.put(borrowed);
        });
      }, callback);
    }
    /**
     * Get the player's current clan
     *
     * @returns Player's clan
     */
  }, {
    key: "get",
    value: function() {
      return new Clan2((0, import_kolmafia72.getClanId)(), (0, import_kolmafia72.getClanName)());
    }
    /**
     * Get list of clans to which the player is whitelisted
     *
     * @returns List of clans
     */
  }, {
    key: "getWhitelisted",
    value: function() {
      var page = (0, import_kolmafia72.visitUrl)("clan_signup.php");
      return (0, import_kolmafia72.xpath)(page, '//select[@name="whichclan"]//option').map(function(option) {
        var validHtml = "<select>".concat(option, "</select>"), id = Number.parseInt((0, import_kolmafia72.xpath)(validHtml, "//@value")[0]), name = (0, import_html_entities.decode)((0, import_kolmafia72.xpath)(validHtml, "//text()")[0]);
        return new Clan2(id, name);
      });
    }
  }]);
}();

// src/challengePaths/index.ts
init_kolmafia_polyfill();

// src/challengePaths/2014/HeavyRains.ts
var HeavyRains_exports = {};
__export(HeavyRains_exports, {
  RAIN_MONSTER_WINDOW_BEGIN: function() {
    return RAIN_MONSTER_WINDOW_BEGIN;
  },
  RAIN_MONSTER_WINDOW_END: function() {
    return RAIN_MONSTER_WINDOW_END;
  },
  canRainMan: function() {
    return canRainMan;
  },
  expectedWanderer: function() {
    return expectedWanderer;
  },
  path: function() {
    return path;
  },
  rainMan: function() {
    return rainMan;
  },
  wanderers: function() {
    return wanderers;
  }
});
init_kolmafia_polyfill();
var import_kolmafia73 = require("kolmafia");
var _templateObject505, _templateObject2130, _templateObject3119, _templateObject4103, _templateObject555, _templateObject648, _templateObject744, _templateObject836;
function _taggedTemplateLiteral68(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function rainMan(target) {
  canRainMan(target) && withChoice(970, "1&whichmonster=".concat(target.id), function() {
    return (0, import_kolmafia73.useSkill)($skill(_templateObject505 || (_templateObject505 = _taggedTemplateLiteral68(["Rain Man"]))));
  });
}
function canRainMan(target) {
  if (!have($skill(_templateObject2130 || (_templateObject2130 = _taggedTemplateLiteral68(["Rain Man"])))) || // having the skill implies you are in heavy rains path
  (0, import_kolmafia73.myRain)() < 50 || !target.copyable || target.id < 0)
    return !1;
  if ((0, import_kolmafia73.monsterFactoidsAvailable)(target, !1) > 0)
    return !0;
  var page = withChoice(970, 2, function() {
    return (0, import_kolmafia73.visitUrl)("runskillz.php?pwd&action=Skillz&whichskill=".concat($skill(_templateObject3119 || (_templateObject3119 = _taggedTemplateLiteral68(["Rain Man"]))).id, "&quantity=1"));
  });
  return page.indexOf("<option value=".concat(target.id, ">")) > 0;
}
var RAIN_MONSTER_WINDOW_BEGIN = "Rain Monster window begin", RAIN_MONSTER_WINDOW_END = "Rain Monster window end", wanderers = Object.freeze(import_kolmafia73.Monster.get(["giant isopod", "gourmet gourami", "freshwater bonefish", "alley catfish", "piranhadon", "giant tardigrade", "aquaconda", "storm cow"]));
function expectedWanderer(location) {
  var difficultyWaterLevel = location.difficultyLevel === "low" ? 1 : 2, environmentWaterLevel = location.environment === "underground" ? 4 : location.environment === "indoor" ? 2 : 1, waterLevel = (0, import_kolmafia73.numericModifier)(import_kolmafia73.Modifier.get("Water Level")) + difficultyWaterLevel + environmentWaterLevel;
  return waterLevel > 1 && waterLevel < 6 ? wanderers[waterLevel - 1] : waterLevel === 6 && location.environment === "underground" ? $monster(_templateObject4103 || (_templateObject4103 = _taggedTemplateLiteral68(["giant tardigrade"]))) : waterLevel === 6 && location.environment === "indoor" ? $monster(_templateObject555 || (_templateObject555 = _taggedTemplateLiteral68(["aquaconda"]))) : waterLevel === 6 && location.environment === "outdoor" ? $monster(_templateObject648 || (_templateObject648 = _taggedTemplateLiteral68(["storm cow"]))) : $monster(_templateObject744 || (_templateObject744 = _taggedTemplateLiteral68(["giant isopod"])));
}
var path = $path(_templateObject836 || (_templateObject836 = _taggedTemplateLiteral68(["Heavy Rains"])));

// src/challengePaths/2015/CommunityService.ts
init_kolmafia_polyfill();
var import_kolmafia74 = require("kolmafia");
var _templateObject506, _templateObject2131, _templateObject3120, _templateObject4104, _templateObject556, _templateObject649, _CommunityService, _templateObject745, _templateObject837, _templateObject930, _templateObject1026, _templateObject1124, _templateObject1223, _templateObject1321, _templateObject1419, _templateObject1516, _templateObject1616, _templateObject1716, _templateObject1816, _templateObject1914, _templateObject2014, _templateObject2132, _templateObject2216, _templateObject2315, _templateObject2414, _templateObject2513, _templateObject2612, _templateObject2712, _templateObject2810, _templateObject2910, _templateObject3010, _templateObject3121;
function _slicedToArray22(r, e) {
  return _arrayWithHoles22(r) || _iterableToArrayLimit22(r, e) || _unsupportedIterableToArray34(r, e) || _nonIterableRest22();
}
function _nonIterableRest22() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray34(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray34(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray34(r, a) : void 0;
  }
}
function _arrayLikeToArray34(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit22(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles22(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck13(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties13(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey19(o.key), o);
  }
}
function _createClass13(e, r, t) {
  return r && _defineProperties13(e.prototype, r), t && _defineProperties13(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty18(e, r, t) {
  return (r = _toPropertyKey19(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey19(t) {
  var i = _toPrimitive19(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive19(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _taggedTemplateLiteral69(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var thralls = /* @__PURE__ */ new Map([[$stat(_templateObject506 || (_templateObject506 = _taggedTemplateLiteral69(["muscle"]))), $thrall(_templateObject2131 || (_templateObject2131 = _taggedTemplateLiteral69(["Elbow Macaroni"])))], [$stat(_templateObject3120 || (_templateObject3120 = _taggedTemplateLiteral69(["moxie"]))), $thrall(_templateObject4104 || (_templateObject4104 = _taggedTemplateLiteral69(["Penne Dreadful"])))]]), statCommunityServicePredictor = function(stat) {
  return function() {
    return 60 - Math.floor(1 / 30 * ((0, import_kolmafia74.myBuffedstat)(stat) - (0, import_kolmafia74.myBasestat)(thralls.get(stat) === (0, import_kolmafia74.myThrall)() && !have($effect(_templateObject556 || (_templateObject556 = _taggedTemplateLiteral69(["Expert Oiliness"])))) ? $stat(_templateObject649 || (_templateObject649 = _taggedTemplateLiteral69(["mysticality"]))) : stat)));
  };
}, visitCouncil = function() {
  return (0, import_kolmafia74.visitUrl)("council.php");
};
function hypotheticalModifier(modifier) {
  for (var _len = arguments.length, effects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    effects[_key - 1] = arguments[_key];
  var newEffects = effects.filter(function(e) {
    return !have(e);
  });
  return (0, import_kolmafia74.numericModifier)(modifier) + sum(newEffects, function(effect2) {
    return (0, import_kolmafia74.numericModifier)(effect2, modifier);
  });
}
var CommunityService = /* @__PURE__ */ function() {
  function CommunityService2(id, stat, property, predictor, maximizeRequirements) {
    _classCallCheck13(this, CommunityService2), _defineProperty18(this, "choice", void 0), _defineProperty18(this, "stat", void 0), _defineProperty18(this, "property", void 0), _defineProperty18(this, "predictor", void 0), _defineProperty18(this, "maximizeRequirements", void 0), _defineProperty18(this, "timer", null), this.choice = id, this.stat = stat, this.property = property, this.predictor = predictor, this.maximizeRequirements = maximizeRequirements;
  }
  return _createClass13(CommunityService2, [{
    key: "id",
    get: function() {
      return this.choice;
    }
    /**
     * @returns The primary stat the test measures, used primarily as memorable shorthand in place of test names.
     */
  }, {
    key: "statName",
    get: function() {
      return this.stat;
    }
    /**
     * @returns The name of the test, used primarily as part of the string property "csServicesPerformed"
     */
  }, {
    key: "name",
    get: function() {
      return this.property;
    }
    /**
     *  @returns The predicted number of turns this test will take given your character's current state.
     */
  }, {
    key: "prediction",
    get: function() {
      return this.predictor();
    }
    /**
     * @returns A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
     */
  }, {
    key: "requirement",
    get: function() {
      return this.maximizeRequirements;
    }
    /**
     * Start the time & turn counter for the Test in question.
     */
  }, {
    key: "startTimer",
    value: function() {
      var _this$timer;
      (_this$timer = this.timer) !== null && _this$timer !== void 0 || (this.timer = {
        time: Date.now(),
        turns: (0, import_kolmafia74.myTurncount)()
      });
    }
  }, {
    key: "isDone",
    value: (
      /**
       * Checks the "csServicesPerformed" property to see whether mafia currently believes this test is complete.
       *
       * @returns Whether mafia currently believes this test is complete.
       */
      function() {
        return get("csServicesPerformed").includes(this.property);
      }
    )
    /**
     * Maximizes based on the Requirement associated with this particular test.
     */
  }, {
    key: "maximize",
    value: function() {
      this.maximizeRequirements && this.maximizeRequirements.maximize();
    }
    /**
     * Attempts to turn in the test to the Council of Loathing.
     *
     * @returns Whether mafia believes the test is complete at the end of this function.
     */
  }, {
    key: "do",
    value: function() {
      get("csServicesPerformed").trim().length === 0 && visitCouncil(), visitCouncil();
      var councilText = (0, import_kolmafia74.runChoice)(this.choice);
      return this._verifyIsDone(councilText);
    }
    /**
     * Wrapper function that prepares for a test and then completes it, adding time and turn details to the log.
     *
     * @param prepare A function that does all necessary preparations for this CS test, including choosing your outfit. Optionally returns the number of turns you expect to spend preparing for the test.
     * @param maxTurns We will run the test iff the predicted/actual turns is less than or equal to this parameter.
     * @returns "completed", "failed", or "already completed".
     */
  }, {
    key: "run",
    value: function(prepare) {
      var _this$timer2, maxTurns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0;
      if (this.isDone()) return "already completed";
      var _ref = (_this$timer2 = this.timer) !== null && _this$timer2 !== void 0 ? _this$timer2 : {
        time: Date.now(),
        turns: (0, import_kolmafia74.myTurncount)()
      }, time = _ref.time, turns2 = _ref.turns, additionalTurns;
      try {
        var result = prepare();
        additionalTurns = typeof result == "number" ? result : 0;
      } catch (e) {
        return (0, import_kolmafia74.print)("".concat(e), "red"), "failed";
      }
      var prediction = this.predictor(), council = visitCouncil(), turnCost = this._actualCost(council);
      return turnCost ? turnCost > Math.min(maxTurns, (0, import_kolmafia74.myAdventures)()) || !this.do() ? "failed" : (CommunityService2.log[this.property] = {
        predictedTurns: prediction + additionalTurns,
        turnCost: (0, import_kolmafia74.myTurncount)() - turns2,
        seconds: (Date.now() - time) / 1e3,
        type: "test"
      }, "completed") : "already completed";
    }
  }, {
    key: "_verifyIsDone",
    value: function(councilText) {
      return !councilText.includes("<input type=hidden name=option value=".concat(this.choice, ">"));
    }
    /**
     * Checks council.php to verify that a test is complete; more reliable than isDone, but requires an additional pagehit.
     *
     * @returns Whether council.php suggests that the test is complete.
     */
  }, {
    key: "verifyIsDone",
    value: function() {
      return this._verifyIsDone(visitCouncil());
    }
  }, {
    key: "_actualCost",
    value: function(councilText) {
      var match = councilText.match("<input type=hidden name=option value=".concat(this.id, ">.*?Perform Service \\((\\d+) Adventures\\)"));
      return match ? parseInt(match[1]) : 0;
    }
    /**
     * Checks council.php for the number of turns this test will take; more reliable than prediction, but requires an additional pagehit.
     *
     * @returns The number of turns to complete this test according to council.php.
     */
  }, {
    key: "actualCost",
    value: function() {
      return this._actualCost(visitCouncil());
    }
    /**
     * @param effects A spread array of Effects to consider
     * @returns The number of turns we expect to save if we start using those effects
     */
  }, {
    key: "turnsSavedBy",
    value: function() {
      var currentTurns = clamp(this.prediction, 1, 60), newTurns = clamp(this.predictor.apply(this, arguments), 1, 60);
      return currentTurns - newTurns;
    }
    /**
     * A log of the predicted turns, actual turns, and duration of each CS test performed.
     */
  }], [{
    key: "startTimer",
    value: (
      /**
       * Start the time & turn counter for the given task
       *
       * @param name The name of the task to start the counter of
       */
      function(name) {
        this.taskTimers.has(name) || this.taskTimers.set(name, {
          time: Date.now(),
          turns: (0, import_kolmafia74.myTurncount)()
        });
      }
    )
  }, {
    key: "logTask",
    value: function(name, action) {
      var _this$taskTimers$get, _action, _ref2 = (_this$taskTimers$get = this.taskTimers.get(name)) !== null && _this$taskTimers$get !== void 0 ? _this$taskTimers$get : {
        time: Date.now(),
        turns: (0, import_kolmafia74.myTurncount)()
      }, time = _ref2.time, turns2 = _ref2.turns, estimatedTurns = (_action = action()) !== null && _action !== void 0 ? _action : 0;
      CommunityService2.log[name] = {
        type: "task",
        turnCost: (0, import_kolmafia74.myTurncount)() - turns2,
        predictedTurns: estimatedTurns,
        seconds: (Date.now() - time) / 1e3
      };
    }
  }, {
    key: "printLog",
    value: (
      /**
       * Prints turncount and time details of the test in question.
       *
       * @param colour The colour (or color) you'd like the log to be printed in.
       */
      function() {
        for (var colour = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "blue", logEntries = Object.entries(CommunityService2.log), _i = 0, _logEntries = logEntries; _i < _logEntries.length; _i++) {
          var _logEntries$_i = _slicedToArray22(_logEntries[_i], 2), testName = _logEntries$_i[0], testEntry = _logEntries$_i[1], type = testEntry.type, predictedTurns = testEntry.predictedTurns, turnCost = testEntry.turnCost, seconds = testEntry.seconds;
          type === "test" ? ((0, import_kolmafia74.print)("We predicted the ".concat(testName, " test would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour), (0, import_kolmafia74.print)("".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour)) : (predictedTurns === 0 && turnCost === 0 || (0, import_kolmafia74.print)("We predicted the task ".concat(testName, " would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour), (0, import_kolmafia74.print)("The task ".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour));
        }
        var totalTime = sum(logEntries, function(_ref3) {
          var _ref4 = _slicedToArray22(_ref3, 2), testEntry2 = _ref4[1];
          return testEntry2.seconds;
        });
        (0, import_kolmafia74.print)("All together, you have spent ".concat(totalTime.toFixed(1), " seconds during this Community Service run"), colour);
      }
    )
    // Below, we have the tests themselves.
  }]);
}();
_CommunityService = CommunityService;
_defineProperty18(CommunityService, "taskTimers", /* @__PURE__ */ new Map());
_defineProperty18(CommunityService, "log", {});
_defineProperty18(CommunityService, "HP", new _CommunityService(1, "HP", "Donate Blood", function() {
  return 60 - Math.floor(((0, import_kolmafia74.myMaxhp)() - (0, import_kolmafia74.myBuffedstat)($stat(_templateObject745 || (_templateObject745 = _taggedTemplateLiteral69(["muscle"])))) - 3) / 30);
}, new Requirement(["HP"], {})));
_defineProperty18(CommunityService, "Muscle", new _CommunityService(2, "Muscle", "Feed The Children", statCommunityServicePredictor($stat(_templateObject837 || (_templateObject837 = _taggedTemplateLiteral69(["Muscle"])))), new Requirement(["Muscle"], {})));
_defineProperty18(CommunityService, "Mysticality", new _CommunityService(3, "Mysticality", "Build Playground Mazes", statCommunityServicePredictor($stat(_templateObject930 || (_templateObject930 = _taggedTemplateLiteral69(["Mysticality"])))), new Requirement(["Mysticality"], {})));
_defineProperty18(CommunityService, "Moxie", new _CommunityService(4, "Moxie", "Feed Conspirators", statCommunityServicePredictor($stat(_templateObject1026 || (_templateObject1026 = _taggedTemplateLiteral69(["Moxie"])))), new Requirement(["Moxie"], {})));
_defineProperty18(CommunityService, "FamiliarWeight", new _CommunityService(5, "Familiar Weight", "Breed More Collies", function() {
  for (var _len2 = arguments.length, effects = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
    effects[_key2] = arguments[_key2];
  return 60 - Math.floor((totalFamiliarWeight((0, import_kolmafia74.myFamiliar)(), !1) + hypotheticalModifier.apply(void 0, ["Familiar Weight"].concat(effects))) / 5);
}, new Requirement(["Familiar Weight"], {})));
_defineProperty18(CommunityService, "WeaponDamage", new _CommunityService(6, "Weapon Damage", "Reduce Gazelle Population", function() {
  for (var weaponPower = (0, import_kolmafia74.getPower)((0, import_kolmafia74.equippedItem)($slot(_templateObject1124 || (_templateObject1124 = _taggedTemplateLiteral69(["weapon"]))))), offhandPower = (0, import_kolmafia74.toSlot)((0, import_kolmafia74.equippedItem)($slot(_templateObject1223 || (_templateObject1223 = _taggedTemplateLiteral69(["off-hand"]))))) === $slot(_templateObject1321 || (_templateObject1321 = _taggedTemplateLiteral69(["weapon"]))) ? (0, import_kolmafia74.getPower)((0, import_kolmafia74.equippedItem)($slot(_templateObject1419 || (_templateObject1419 = _taggedTemplateLiteral69(["off-hand"]))))) : 0, familiarPower = (0, import_kolmafia74.toSlot)((0, import_kolmafia74.equippedItem)($slot(_templateObject1516 || (_templateObject1516 = _taggedTemplateLiteral69(["familiar"]))))) === $slot(_templateObject1616 || (_templateObject1616 = _taggedTemplateLiteral69(["weapon"]))) ? (0, import_kolmafia74.getPower)((0, import_kolmafia74.equippedItem)($slot(_templateObject1716 || (_templateObject1716 = _taggedTemplateLiteral69(["familiar"]))))) : 0, multiplier = have($effect(_templateObject1816 || (_templateObject1816 = _taggedTemplateLiteral69(["Bow-Legged Swagger"])))) ? 2 : 1, _len3 = arguments.length, effects = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
    effects[_key3] = arguments[_key3];
  return 60 - Math.floor(multiplier * (hypotheticalModifier.apply(void 0, ["Weapon Damage"].concat(effects)) - 0.15 * (weaponPower + offhandPower + familiarPower)) / 50 + 1e-3) - Math.floor(multiplier * hypotheticalModifier.apply(void 0, ["Weapon Damage Percent"].concat(effects)) / 50 + 1e-3);
}, new Requirement(["Weapon Damage", "Weapon Damage Percent"], {})));
_defineProperty18(CommunityService, "SpellDamage", new _CommunityService(7, "Spell Damage", "Make Sausage", function() {
  for (var dragonfishDamage = (0, import_kolmafia74.myFamiliar)() === $familiar(_templateObject1914 || (_templateObject1914 = _taggedTemplateLiteral69(["Magic Dragonfish"]))) ? (0, import_kolmafia74.numericModifier)($familiar(_templateObject2014 || (_templateObject2014 = _taggedTemplateLiteral69(["Magic Dragonfish"]))), "Spell Damage Percent", totalFamiliarWeight(), $item.none) : 0, _len4 = arguments.length, effects = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
    effects[_key4] = arguments[_key4];
  return 60 - Math.floor(hypotheticalModifier.apply(void 0, ["Spell Damage"].concat(effects)) / 50 + 1e-3) - Math.floor((hypotheticalModifier.apply(void 0, ["Spell Damage Percent"].concat(effects)) - dragonfishDamage) / 50 + 1e-3);
}, new Requirement(["Spell Damage", "Spell Damage Percent"], {})));
_defineProperty18(CommunityService, "Noncombat", new _CommunityService(8, "Non-Combat", "Be a Living Statue", function() {
  for (var _len5 = arguments.length, effects = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)
    effects[_key5] = arguments[_key5];
  var noncombatRate = -1 * hypotheticalModifier.apply(void 0, ["Combat Rate"].concat(effects)), unsoftcappedRate = function(rate) {
    return rate > 25 ? 25 + (rate - 25) * 5 : rate;
  }, currentFamiliarModifier = -1 * (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Combat Rate", totalFamiliarWeight(), (0, import_kolmafia74.equippedItem)($slot(_templateObject2132 || (_templateObject2132 = _taggedTemplateLiteral69(["familiar"]))))), newFamiliarModifier = -1 * (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Combat Rate", totalFamiliarWeight((0, import_kolmafia74.myFamiliar)(), !1) + hypotheticalModifier.apply(void 0, ["Familiar Weight"].concat(effects)), (0, import_kolmafia74.equippedItem)($slot(_templateObject2216 || (_templateObject2216 = _taggedTemplateLiteral69(["familiar"]))))), adjustedRate = unsoftcappedRate(noncombatRate) - unsoftcappedRate(currentFamiliarModifier) + unsoftcappedRate(newFamiliarModifier);
  return 60 - 3 * Math.floor(adjustedRate / 5);
}, new Requirement(["-combat"], {})));
_defineProperty18(CommunityService, "BoozeDrop", new _CommunityService(9, "Item Drop", "Make Margaritas", function() {
  for (var mummingCostume = MummingTrunk_exports.currentCostumes().get((0, import_kolmafia74.myFamiliar)()), mummingBuff = mummingCostume && mummingCostume[0] === "Item Drop" ? mummingCostume[1] : 0, familiarItemDrop = (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Item Drop", totalFamiliarWeight(), (0, import_kolmafia74.equippedItem)($slot(_templateObject2315 || (_templateObject2315 = _taggedTemplateLiteral69(["familiar"]))))) + mummingBuff - (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.equippedItem)($slot(_templateObject2414 || (_templateObject2414 = _taggedTemplateLiteral69(["familiar"])))), "Item Drop"), familiarBoozeDrop = (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Booze Drop", totalFamiliarWeight(), (0, import_kolmafia74.equippedItem)($slot(_templateObject2513 || (_templateObject2513 = _taggedTemplateLiteral69(["familiar"]))))) - (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.equippedItem)($slot(_templateObject2612 || (_templateObject2612 = _taggedTemplateLiteral69(["familiar"])))), "Booze Drop"), multiplier = (0, import_kolmafia74.haveEquipped)($item(_templateObject2712 || (_templateObject2712 = _taggedTemplateLiteral69(["broken champagne bottle"])))) && get("garbageChampagneCharge") > 0 ? 0.5 : 1, _len6 = arguments.length, effects = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)
    effects[_key6] = arguments[_key6];
  return 60 - Math.floor(multiplier * (hypotheticalModifier.apply(void 0, ["Item Drop"].concat(effects)) - familiarItemDrop - (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myThrall)(), "Item Drop")) / 30 + 1e-3) - Math.floor((hypotheticalModifier.apply(void 0, ["Booze Drop"].concat(effects)) - familiarBoozeDrop) / 15 + 1e-3);
}, new Requirement(["Item Drop", "2 Booze Drop"], {
  preventEquip: $items(_templateObject2810 || (_templateObject2810 = _taggedTemplateLiteral69(["broken champagne bottle"])))
})));
_defineProperty18(CommunityService, "HotRes", new _CommunityService(10, "Hot Resistance", "Clean Steam Tunnels", function() {
  for (var currentFamiliarModifier = (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Hot Resistance", totalFamiliarWeight(), (0, import_kolmafia74.equippedItem)($slot(_templateObject2910 || (_templateObject2910 = _taggedTemplateLiteral69(["familiar"]))))), _len7 = arguments.length, effects = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)
    effects[_key7] = arguments[_key7];
  var newFamiliarModifier = (0, import_kolmafia74.numericModifier)((0, import_kolmafia74.myFamiliar)(), "Hot Resistance", totalFamiliarWeight((0, import_kolmafia74.myFamiliar)(), !1) + hypotheticalModifier.apply(void 0, ["Familiar Weight"].concat(effects)), (0, import_kolmafia74.equippedItem)($slot(_templateObject3010 || (_templateObject3010 = _taggedTemplateLiteral69(["familiar"])))));
  return 60 - (hypotheticalModifier.apply(void 0, ["Hot Resistance"].concat(effects)) - currentFamiliarModifier + newFamiliarModifier);
}, new Requirement(["Hot Resistance"], {})));
_defineProperty18(CommunityService, "CoilWire", new _CommunityService(11, "Coil Wire", "Coil Wire", function() {
  return 60;
}, new Requirement([], {})));
_defineProperty18(CommunityService, "donate", function() {
  visitCouncil(), (0, import_kolmafia74.visitUrl)("choice.php?whichchoice=1089&option=30");
});
_defineProperty18(CommunityService, "path", $path(_templateObject3121 || (_templateObject3121 = _taggedTemplateLiteral69(["Community Service"]))));

// src/challengePaths/2016/NuclearAutumn.ts
var NuclearAutumn_exports = {};
__export(NuclearAutumn_exports, {
  chronoLab: function() {
    return chronoLab;
  },
  coolingTank: function() {
    return coolingTank;
  },
  path: function() {
    return path2;
  },
  spa: function() {
    return spa;
  }
});
init_kolmafia_polyfill();
var import_kolmafia75 = require("kolmafia");
var _templateObject507;
function _taggedTemplateLiteral70(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function coolingTank() {
  (0, import_kolmafia75.visitUrl)("place.php?whichplace=falloutshelter&action=vault8");
}
function spa() {
  (0, import_kolmafia75.visitUrl)("place.php?whichplace=falloutshelter&action=vault3");
}
function chronoLab() {
  (0, import_kolmafia75.visitUrl)("place.php?whichplace=falloutshelter&action=vault5");
}
var path2 = $path(_templateObject507 || (_templateObject507 = _taggedTemplateLiteral70(["Nuclear Autumn"])));

// src/diet/index.ts
init_kolmafia_polyfill();
var import_kolmafia76 = require("kolmafia");

// src/diet/knapsack.ts
init_kolmafia_polyfill();
function _toConsumableArray20(r) {
  return _arrayWithoutHoles20(r) || _iterableToArray20(r) || _unsupportedIterableToArray35(r) || _nonIterableSpread20();
}
function _nonIterableSpread20() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray20(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles20(r) {
  if (Array.isArray(r)) return _arrayLikeToArray35(r);
}
function _slicedToArray23(r, e) {
  return _arrayWithHoles23(r) || _iterableToArrayLimit23(r, e) || _unsupportedIterableToArray35(r, e) || _nonIterableRest23();
}
function _nonIterableRest23() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit23(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles23(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper10(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray35(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray35(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray35(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray35(r, a) : void 0;
  }
}
function _arrayLikeToArray35(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _defineProperties14(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey20(o.key), o);
  }
}
function _createClass14(e, r, t) {
  return r && _defineProperties14(e.prototype, r), t && _defineProperties14(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _classCallCheck14(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperty19(e, r, t) {
  return (r = _toPropertyKey20(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey20(t) {
  var i = _toPrimitive20(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive20(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var Not = /* @__PURE__ */ _createClass14(function Not2(thing) {
  _classCallCheck14(this, Not2), _defineProperty19(this, "thing", void 0), this.thing = thing;
});
function aggregate(list, isEqual) {
  var aggregatedList = [], _iterator = _createForOfIteratorHelper10(list), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var item14 = _step.value;
      if (aggregatedList.length === 0)
        aggregatedList.push([item14, 1]);
      else {
        var last = aggregatedList[aggregatedList.length - 1], _last = _slicedToArray23(last, 1), lastItem = _last[0];
        (isEqual ? isEqual(item14, lastItem) : item14 === lastItem) ? last[1]++ : aggregatedList.push([item14, 1]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return aggregatedList;
}
function knapsack(values, capacity) {
  var _ref5;
  if (!Number.isFinite(capacity))
    throw new Error("Invalid capacity.");
  var valuesInverted = values.map(function(_ref) {
    var _ref2 = _slicedToArray23(_ref, 4), thing = _ref2[0], value2 = _ref2[1], weight = _ref2[2], maximum2 = _ref2[3];
    return weight < 0 && maximum2 !== void 0 ? [new Not(thing), -value2, -weight, maximum2] : [thing, value2, weight, maximum2];
  }), capacityAdjustment = sum(values, function(_ref3) {
    var _ref4 = _slicedToArray23(_ref3, 4), weight = _ref4[2], maximum2 = _ref4[3];
    return weight < 0 && maximum2 !== void 0 ? -weight * maximum2 : 0;
  }), adjustedCapacity = capacity + capacityAdjustment;
  if (adjustedCapacity < 0)
    return [-1 / 0, []];
  for (var valuesSorted = _toConsumableArray20(valuesInverted).sort(function(x, y) {
    return x[2] - y[2];
  }), values01 = (_ref5 = []).concat.apply(_ref5, _toConsumableArray20(valuesSorted.map(function(_ref6) {
    var _ref7 = _slicedToArray23(_ref6, 4), thing = _ref7[0], value2 = _ref7[1], weight = _ref7[2], maximum2 = _ref7[3];
    if (!Number.isFinite(weight) || weight < 0)
      throw new Error("Invalid weight ".concat(weight, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    var maxQuantity = Math.floor(maximum2 != null ? maximum2 : adjustedCapacity / weight);
    if (maxQuantity < 0)
      throw new Error("Invalid max quantity ".concat(maxQuantity, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    return new Array(maxQuantity).fill([thing, value2, weight]);
  }))), memoizationTable = new Array(values01.length), i = 0; i < values01.length; i++)
    memoizationTable[i] = new Array(adjustedCapacity).fill(null);
  var _bestSolution = bestSolution(memoizationTable, values01, values01.length - 1, adjustedCapacity), _bestSolution2 = _slicedToArray23(_bestSolution, 2), value = _bestSolution2[0], invertedSolution = _bestSolution2[1], aggregatedSolution = aggregate(invertedSolution), countMap = new Map(aggregatedSolution), valueAdjustment = 0, solution = aggregatedSolution.filter(function(_ref8) {
    var _ref9 = _slicedToArray23(_ref8, 1), thingOrNot2 = _ref9[0];
    return !(thingOrNot2 instanceof Not);
  }), _iterator2 = _createForOfIteratorHelper10(valuesSorted), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var _step2$value = _slicedToArray23(_step2.value, 4), thingOrNot = _step2$value[0], _value = _step2$value[1], maximum = _step2$value[3];
      if (thingOrNot instanceof Not) {
        var _countMap$get, notCount = (_countMap$get = countMap.get(thingOrNot)) !== null && _countMap$get !== void 0 ? _countMap$get : 0;
        if (maximum === void 0)
          throw new Error("Cannot find maximum for item ".concat(thingOrNot.thing, "."));
        if (notCount > maximum)
          throw new Error("Somehow picked ".concat(notCount, " more than the maximum ").concat(notCount, " for item ").concat(thingOrNot.thing, "."));
        notCount < maximum && solution.push([thingOrNot.thing, maximum - notCount]), valueAdjustment -= maximum * _value;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return [value + valueAdjustment, solution];
}
function bestSolution(memoizationTable, values, currentIndex, remainingCapacity) {
  if (remainingCapacity < 0) return [-1 / 0, []];
  if (remainingCapacity === 0 || currentIndex < 0) return [0, []];
  var memoized = memoizationTable[currentIndex][remainingCapacity - 1];
  if (memoized !== null) return memoized;
  var _values$currentIndex = _slicedToArray23(values[currentIndex], 3), item14 = _values$currentIndex[0], value = _values$currentIndex[1], weight = _values$currentIndex[2], _bestSolution3 = bestSolution(memoizationTable, values, currentIndex - 1, remainingCapacity - weight), _bestSolution4 = _slicedToArray23(_bestSolution3, 2), valueIncludeRest = _bestSolution4[0], itemsInclude = _bestSolution4[1], valueInclude = valueIncludeRest + value, _bestSolution5 = bestSolution(memoizationTable, values, currentIndex - 1, remainingCapacity), _bestSolution6 = _slicedToArray23(_bestSolution5, 2), valueExclude = _bestSolution6[0], itemsExclude = _bestSolution6[1], result = valueInclude > valueExclude ? [valueInclude, [].concat(_toConsumableArray20(itemsInclude), [item14])] : [valueExclude, itemsExclude];
  return memoizationTable[currentIndex][remainingCapacity - 1] = result, result;
}

// src/diet/index.ts
var _templateObject508, _templateObject2133, _templateObject3122, _templateObject4105, _templateObject557, _templateObject650, _templateObject746, _templateObject838, _templateObject931, _templateObject1027, _templateObject1125, _templateObject1224, _templateObject1322, _templateObject1420, _templateObject1517, _templateObject1617, _templateObject1717, _templateObject1817, _templateObject1915, _templateObject2015, _templateObject2134, _templateObject2217, _templateObject2316, _templateObject2415, _templateObject2514, _templateObject2613, _templateObject2713, _templateObject2811, _templateObject2911, _templateObject3011, _templateObject3123, _templateObject3213, _templateObject3312, _templateObject3411, _templateObject3510, _templateObject3610, _templateObject3710, _templateObject3810, _templateObject3910, _templateObject4010, _templateObject4113, _templateObject4212, _templateObject4311, _templateObject4410, _templateObject4510, _templateObject4610, _templateObject4710, _templateObject4810, _templateObject4910, _templateObject509, _templateObject5111, _templateObject5211, _templateObject5310, _templateObject5410, _templateObject558, _templateObject564, _templateObject574, _templateObject584, _templateObject594, _templateObject604, _templateObject6110, _templateObject6210, _templateObject6310, _templateObject6410, _templateObject654, _templateObject664, _templateObject674, _templateObject684, _templateObject694, _templateObject704, _templateObject7110, _templateObject7210;
function _createForOfIteratorHelper11(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray36(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function ownKeys9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys9(Object(t), !0).forEach(function(r2) {
      _defineProperty20(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck15(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties15(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey21(o.key), o);
  }
}
function _createClass15(e, r, t) {
  return r && _defineProperties15(e.prototype, r), t && _defineProperties15(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty20(e, r, t) {
  return (r = _toPropertyKey21(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey21(t) {
  var i = _toPrimitive21(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive21(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _toConsumableArray21(r) {
  return _arrayWithoutHoles21(r) || _iterableToArray21(r) || _unsupportedIterableToArray36(r) || _nonIterableSpread21();
}
function _nonIterableSpread21() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray21(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles21(r) {
  if (Array.isArray(r)) return _arrayLikeToArray36(r);
}
function _slicedToArray24(r, e) {
  return _arrayWithHoles24(r) || _iterableToArrayLimit24(r, e) || _unsupportedIterableToArray36(r, e) || _nonIterableRest24();
}
function _nonIterableRest24() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray36(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray36(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray36(r, a) : void 0;
  }
}
function _arrayLikeToArray36(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit24(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles24(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral71(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function isMonday() {
  return get2("Muscle Percent", $item(_templateObject508 || (_templateObject508 = _taggedTemplateLiteral71(["Tuesday's ruby"])))) > 0;
}
function seasoningAdventures(item14) {
  var _getRange = getRange(item14.adventures), _getRange2 = _slicedToArray24(_getRange, 2), min = _getRange2[0], max = _getRange2[1];
  return max - min <= 1 ? 1 : 0.5;
}
function _expectedAdventures(menuItem, modifiers) {
  var _item$notes, _item$notes2, _item$notes3, _item$notes4, _item$notes5, item14 = menuItem.item;
  if (item14.adventures === "") return 0;
  var _getRange3 = getRange(item14.adventures), _getRange4 = _slicedToArray24(_getRange3, 2), min = _getRange4[0], max = _getRange4[1], interpolated = _toConsumableArray21(new Array(max - min + 1).keys()).map(function(n) {
    return n + min;
  }), forkMugMultiplier = menuItem.itemType() === "food" && (_item$notes = item14.notes) !== null && _item$notes !== void 0 && _item$notes.includes("SALAD") || menuItem.itemType() === "booze" && (_item$notes2 = item14.notes) !== null && _item$notes2 !== void 0 && _item$notes2.includes("BEER") ? 1.5 : 1.3, aioliAdventures = item14.fullness, garish = modifiers.garish && ((_item$notes3 = item14.notes) === null || _item$notes3 === void 0 ? void 0 : _item$notes3.includes("LASAGNA")) && !isMonday(), refinedPalate = modifiers.refinedPalate && ((_item$notes4 = item14.notes) === null || _item$notes4 === void 0 ? void 0 : _item$notes4.includes("WINE")), pinkyRing = modifiers.pinkyRing && ((_item$notes5 = item14.notes) === null || _item$notes5 === void 0 ? void 0 : _item$notes5.includes("WINE"));
  return sum(interpolated, function(baseAdventures) {
    var _item$notes6, _item$notes7, adventures = baseAdventures;
    return modifiers.forkMug && (adventures = Math.floor(adventures * forkMugMultiplier)), (_item$notes6 = item14.notes) !== null && _item$notes6 !== void 0 && _item$notes6.includes("SAUCY") && modifiers.saucemaven && (adventures += (0, import_kolmafia76.myPrimestat)() === $stat(_templateObject2133 || (_templateObject2133 = _taggedTemplateLiteral71(["Mysticality"]))) ? 5 : 3), garish && (adventures += 5), refinedPalate && (adventures = Math.floor(adventures * 1.25)), pinkyRing && (adventures = Math.round(adventures * 1.125)), (_item$notes7 = item14.notes) !== null && _item$notes7 !== void 0 && _item$notes7.includes("MARTINI") && modifiers.tuxedoShirt && (adventures += 2), menuItem.itemType() === "food" && modifiers.mayoflex && adventures++, menuItem.itemType() === "food" && modifiers.seasoning && (adventures += seasoningAdventures(item14)), menuItem.itemType() === "food" && modifiers.aioli && (adventures += aioliAdventures), menuItem.itemType() === "food" && modifiers.whetStone && adventures++, adventures;
  }) / interpolated.length;
}
var MenuItem = /* @__PURE__ */ function() {
  function MenuItem2(item14) {
    var _MenuItem$defaultOpti, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck15(this, MenuItem2), _defineProperty20(this, "item", void 0), _defineProperty20(this, "organ", void 0), _defineProperty20(this, "size", void 0), _defineProperty20(this, "maximum", void 0), _defineProperty20(this, "additionalValue", void 0), _defineProperty20(this, "effect", void 0), _defineProperty20(this, "priceOverride", void 0), _defineProperty20(this, "mayo", void 0), _defineProperty20(this, "data", void 0), _defineProperty20(this, "priceCached", void 0), _defineProperty20(this, "itemTypeCached", void 0);
    var _options = _objectSpread9(_objectSpread9({}, options), (_MenuItem$defaultOpti = MenuItem2.defaultOptions().get(item14)) !== null && _MenuItem$defaultOpti !== void 0 ? _MenuItem$defaultOpti : {}), size = _options.size, organ = _options.organ, maximum = _options.maximum, additionalValue = _options.additionalValue, effect2 = _options.effect, priceOverride = _options.priceOverride, mayo = _options.mayo, data = _options.data;
    if (this.item = item14, notNullish(maximum) && (this.maximum = maximum === "auto" ? item14.dailyusesleft : maximum), notNullish(additionalValue) && (this.additionalValue = additionalValue), notNullish(effect2) && (this.effect = effect2), notNullish(priceOverride) && (this.priceOverride = priceOverride), notNullish(mayo) && (this.mayo = mayo), notNullish(data) && (this.data = data), notNullish(organ))
      this.organ = organ;
    else {
      var typ = (0, import_kolmafia76.itemType)(this.item);
      isOrgan(typ) && (this.organ = typ);
    }
    this.size = size != null ? size : this.organ === "food" ? this.item.fullness : this.organ === "booze" ? this.item.inebriety : this.organ === "spleen item" ? this.item.spleen : 0;
  }
  return _createClass15(MenuItem2, [{
    key: "equals",
    value: function(other) {
      return this.item === other.item && this.effect === other.effect;
    }
  }, {
    key: "toString",
    value: function() {
      return this.effect ? "".concat(this.item, ":").concat(this.effect) : this.item.toString();
    }
  }, {
    key: "price",
    value: function() {
      if (!this.priceCached) {
        var _this$priceOverride;
        this.priceCached = (_this$priceOverride = this.priceOverride) !== null && _this$priceOverride !== void 0 ? _this$priceOverride : MenuItem2.defaultPriceFunction(this.item);
      }
      return this.priceCached;
    }
  }, {
    key: "itemType",
    value: function() {
      return this.itemTypeCached || (this.itemTypeCached = (0, import_kolmafia76.itemType)(this.item)), this.itemTypeCached;
    }
  }], [{
    key: "defaultOptions",
    value: function() {
      return /* @__PURE__ */ new Map([[$item(_templateObject3122 || (_templateObject3122 = _taggedTemplateLiteral71(["distention pill"]))), {
        organ: "food",
        maximum: !have($item(_templateObject4105 || (_templateObject4105 = _taggedTemplateLiteral71(["distention pill"])))) || get("_distentionPillUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject557 || (_templateObject557 = _taggedTemplateLiteral71(["synthetic dog hair pill"]))), {
        organ: "booze",
        maximum: !have($item(_templateObject650 || (_templateObject650 = _taggedTemplateLiteral71(["synthetic dog hair pill"])))) || get("_syntheticDogHairPillUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject746 || (_templateObject746 = _taggedTemplateLiteral71(["cuppa Voraci tea"]))), {
        organ: "food",
        maximum: get("_voraciTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject838 || (_templateObject838 = _taggedTemplateLiteral71(["cuppa Sobrie tea"]))), {
        organ: "booze",
        maximum: get("_sobrieTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject931 || (_templateObject931 = _taggedTemplateLiteral71(["mojo filter"]))), {
        organ: "spleen item",
        maximum: 3 - get("currentMojoFilters"),
        size: -1
      }], [$item(_templateObject1027 || (_templateObject1027 = _taggedTemplateLiteral71(["spice melange"]))), {
        maximum: get("spiceMelangeUsed") ? 0 : 1
      }], [$item(_templateObject1125 || (_templateObject1125 = _taggedTemplateLiteral71(["Ultra Mega Sour Ball"]))), {
        maximum: get("_ultraMegaSourBallUsed") ? 0 : 1
      }], [$item(_templateObject1224 || (_templateObject1224 = _taggedTemplateLiteral71(["The Plumber's mushroom stew"]))), {
        maximum: get("_plumbersMushroomStewEaten") ? 0 : 1
      }], [$item(_templateObject1322 || (_templateObject1322 = _taggedTemplateLiteral71(["The Mad Liquor"]))), {
        maximum: get("_madLiquorDrunk") ? 0 : 1
      }], [$item(_templateObject1420 || (_templateObject1420 = _taggedTemplateLiteral71(["Doc Clock's thyme cocktail"]))), {
        maximum: get("_docClocksThymeCocktailDrunk") ? 0 : 1
      }], [$item(_templateObject1517 || (_templateObject1517 = _taggedTemplateLiteral71(["Mr. Burnsger"]))), {
        maximum: get("_mrBurnsgerEaten") ? 0 : 1
      }], [$item(_templateObject1617 || (_templateObject1617 = _taggedTemplateLiteral71(["Calzone of Legend"]))), {
        maximum: get("calzoneOfLegendEaten") ? 0 : 1
      }], [$item(_templateObject1717 || (_templateObject1717 = _taggedTemplateLiteral71(["Deep Dish of Legend"]))), {
        maximum: get("deepDishOfLegendEaten") ? 0 : 1
      }], [$item(_templateObject1817 || (_templateObject1817 = _taggedTemplateLiteral71(["Pizza of Legend"]))), {
        maximum: get("pizzaOfLegendEaten") ? 0 : 1
      }], [$item(_templateObject1915 || (_templateObject1915 = _taggedTemplateLiteral71(["jar of fermented pickle juice"]))), {
        maximum: get("_pickleJuiceDrunk") ? 0 : 1
      }], [$item(_templateObject2015 || (_templateObject2015 = _taggedTemplateLiteral71(["extra-greasy slider"]))), {
        maximum: get("_extraGreasySliderEaten") ? 0 : 1
      }], [$item(_templateObject2134 || (_templateObject2134 = _taggedTemplateLiteral71(["voodoo snuff"]))), {
        maximum: get("_voodooSnuffUsed") ? 0 : 1
      }], [$item(_templateObject2217 || (_templateObject2217 = _taggedTemplateLiteral71(["Ol' Scratch's salad fork"]))), {
        maximum: get("_saladForkUsed") ? 0 : 1
      }], [$item(_templateObject2316 || (_templateObject2316 = _taggedTemplateLiteral71(["Frosty's frosty mug"]))), {
        maximum: get("_frostyMugUsed") ? 0 : 1
      }], [$item(_templateObject2415 || (_templateObject2415 = _taggedTemplateLiteral71(["tin cup of mulligan stew"]))), {
        maximum: get("_mulliganStewEaten") ? 0 : 1
      }], [$item(_templateObject2514 || (_templateObject2514 = _taggedTemplateLiteral71(["Hodgman's blanket"]))), {
        maximum: get("_hodgmansBlanketDrunk") ? 0 : 1
      }]]);
    }
  }]);
}();
_defineProperty20(MenuItem, "defaultPriceFunction", function(item14) {
  return (0, import_kolmafia76.npcPrice)(item14) > 0 ? (0, import_kolmafia76.npcPrice)(item14) : (0, import_kolmafia76.mallPrice)(item14);
});
var organs = ["food", "booze", "spleen item"];
function isOrgan(x) {
  return organs.includes(x);
}
var DietPlanner = /* @__PURE__ */ function() {
  function DietPlanner2(mpa, menu) {
    var _this2 = this;
    var _this = this;
    _classCallCheck15(this, DietPlanner2), _defineProperty20(this, "mpa", void 0), _defineProperty20(this, "menu", void 0), _defineProperty20(this, "mayoLookup", void 0), _defineProperty20(this, "fork", void 0), _defineProperty20(this, "mug", void 0), _defineProperty20(this, "seasoning", void 0), _defineProperty20(this, "whetStone", void 0), _defineProperty20(this, "aioli", void 0), _defineProperty20(this, "spleenValue", 0), _defineProperty20(this, "baseDefaultModifiers", {
      forkMug: !1,
      seasoning: !1,
      whetStone: !1,
      aioli: !1,
      mayoflex: !1,
      refinedPalate: have($effect(_templateObject2613 || (_templateObject2613 = _taggedTemplateLiteral71(["Refined Palate"])))),
      garish: have($effect(_templateObject2713 || (_templateObject2713 = _taggedTemplateLiteral71(["Gar-ish"])))),
      saucemaven: have($skill(_templateObject2811 || (_templateObject2811 = _taggedTemplateLiteral71(["Saucemaven"])))),
      pinkyRing: have($item(_templateObject2911 || (_templateObject2911 = _taggedTemplateLiteral71(["mafia pinky ring"])))) && (0, import_kolmafia76.canEquip)($item(_templateObject3011 || (_templateObject3011 = _taggedTemplateLiteral71(["mafia pinky ring"])))),
      tuxedoShirt: have($item(_templateObject3123 || (_templateObject3123 = _taggedTemplateLiteral71(["tuxedo shirt"])))) && (0, import_kolmafia76.canEquip)($item(_templateObject3213 || (_templateObject3213 = _taggedTemplateLiteral71(["tuxedo shirt"]))))
    }), this.mpa = mpa;
    var fork = menu.find(function(item14) {
      return item14.item === $item(_templateObject3312 || (_templateObject3312 = _taggedTemplateLiteral71(["Ol' Scratch's salad fork"])));
    });
    fork && (this.fork = fork);
    var mug = menu.find(function(item14) {
      return item14.item === $item(_templateObject3411 || (_templateObject3411 = _taggedTemplateLiteral71(["Frosty's frosty mug"])));
    });
    mug && (this.mug = mug);
    var seasoning = menu.find(function(item14) {
      return item14.item === $item(_templateObject3510 || (_templateObject3510 = _taggedTemplateLiteral71(["Special Seasoning"])));
    });
    seasoning && (this.seasoning = seasoning);
    var whetStone = menu.find(function(item14) {
      return item14.item === $item(_templateObject3610 || (_templateObject3610 = _taggedTemplateLiteral71(["whet stone"])));
    });
    whetStone && (this.whetStone = whetStone);
    var aioli = menu.find(function(item14) {
      return item14.item === $item(_templateObject3710 || (_templateObject3710 = _taggedTemplateLiteral71(["mini kiwi aioli"])));
    });
    if (aioli && (this.aioli = aioli), this.mayoLookup = /* @__PURE__ */ new Map(), installed3())
      for (var _loop = function() {
        var mayo = _arr[_i], menuItem = menu.find(function(item14) {
          return item14.item === mayo;
        });
        menuItem && _this.mayoLookup.set(mayo, menuItem);
      }, _i = 0, _arr = [Mayo.flex, Mayo.zapine]; _i < _arr.length; _i++)
        _loop();
    this.menu = menu.filter(function(item14) {
      return item14.organ;
    }), menu.filter(function(item14) {
      return (0, import_kolmafia76.historicalPrice)(item14.item) === 0 || (0, import_kolmafia76.historicalAge)(item14.item) >= 1;
    }).length > 100 && ((0, import_kolmafia76.mallPrices)("food"), (0, import_kolmafia76.mallPrices)("booze"));
    var spleenItems = menu.filter(function(item14) {
      return (0, import_kolmafia76.itemType)(item14.item) === "spleen item";
    });
    if (spleenItems.sort(function(x, y) {
      return -(_this2.consumptionValue(x) / x.item.spleen - _this2.consumptionValue(y) / y.item.spleen);
    }), spleenItems.length > 0) {
      var bestMarginalSpleenItem = spleenItems.find(function(spleenItem) {
        return spleenItem.maximum === void 0 || spleenItem.maximum * spleenItem.size >= (0, import_kolmafia76.spleenLimit)() - (0, import_kolmafia76.mySpleenUse)();
      });
      bestMarginalSpleenItem && (this.spleenValue = Math.max(0, this.consumptionValue(bestMarginalSpleenItem) / bestMarginalSpleenItem.size));
    }
  }
  return _createClass15(DietPlanner2, [{
    key: "consumptionValue",
    value: function(menuItem) {
      return this.consumptionHelpersAndValue(menuItem, {})[1];
    }
    /**
     * Determine which helpers will be used with a menu item and its resulting value.
     *
     * @param menuItem Menu item to check.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair [array of helpers and base menu item, value].
     */
  }, {
    key: "consumptionHelpersAndValue",
    value: function(menuItem, overrideModifiers) {
      var _menuItem$additionalV, _menuItem$additionalV2, helpers = [];
      if (menuItem.itemType() === "food" && this.mayoLookup.size) {
        var mayo = menuItem.mayo ? this.mayoLookup.get(menuItem.mayo) : this.mayoLookup.get(Mayo.flex);
        mayo && helpers.push(mayo);
      }
      var defaultModifiers = _objectSpread9(_objectSpread9({}, this.baseDefaultModifiers), {}, {
        mayoflex: this.mayoLookup.size ? helpers.some(function(item14) {
          return item14.item === Mayo.flex;
        }) : !1
      }, overrideModifiers);
      this.seasoning && menuItem.itemType() === "food" && this.mpa * seasoningAdventures(menuItem.item) > this.seasoning.price() && helpers.push(this.seasoning), this.whetStone && menuItem.itemType() === "food" && this.mpa > this.whetStone.price() && helpers.push(this.whetStone), this.aioli && menuItem.itemType() === "food" && this.mpa * menuItem.item.fullness > this.aioli.price() && helpers.push(this.aioli);
      var forkMug = menuItem.itemType() === "food" ? this.fork : menuItem.itemType() === "booze" ? this.mug : null, forkMugPrice = forkMug ? forkMug.price() : 1 / 0, baseCost = menuItem.price() + sum(helpers, function(item14) {
        return item14.price();
      }), valueRaw = _expectedAdventures(menuItem, defaultModifiers) * this.mpa - baseCost + ((_menuItem$additionalV = menuItem.additionalValue) !== null && _menuItem$additionalV !== void 0 ? _menuItem$additionalV : 0), valueForkMug = _expectedAdventures(menuItem, _objectSpread9(_objectSpread9({}, defaultModifiers), {}, {
        forkMug: !0
      })) * this.mpa - baseCost - forkMugPrice + ((_menuItem$additionalV2 = menuItem.additionalValue) !== null && _menuItem$additionalV2 !== void 0 ? _menuItem$additionalV2 : 0), valueSpleen = $items(_templateObject3810 || (_templateObject3810 = _taggedTemplateLiteral71(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item) ? 5 * this.spleenValue : 0;
      return forkMug && valueForkMug > valueRaw ? [[].concat(helpers, [forkMug, menuItem]), valueForkMug + valueSpleen] : [[].concat(helpers, [menuItem]), valueRaw + valueSpleen];
    }
    /**
     * Plan an individual organ.
     *
     * @param organ Organ to plan
     * @param capacity Organ capacity.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgan",
    value: function(organ, capacity) {
      var _this = this;
      var overrideModifiers = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, submenu = this.menu.filter(function(menuItem) {
        return menuItem.organ === organ && (0, import_kolmafia76.myLevel)() >= menuItem.item.levelreq;
      }), knapsackValues = submenu.map(function(menuItem) {
        return [].concat(_toConsumableArray21(_this.consumptionHelpersAndValue(menuItem, overrideModifiers)), [menuItem.size, menuItem.maximum]);
      });
      return knapsack(knapsackValues, capacity);
    }
    /**
     * Plan organs.
     *
     * @param organCapacities Organ capacities.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgans",
    value: function(organCapacities) {
      var _this = this;
      var _ref5, overrideModifiers = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, valuePlans = organCapacities.map(function(_ref) {
        var _ref2 = _slicedToArray24(_ref, 2), organ = _ref2[0], capacity = _ref2[1];
        return _this.planOrgan(organ, capacity, overrideModifiers);
      });
      return [sum(valuePlans, function(_ref3) {
        var _ref4 = _slicedToArray24(_ref3, 1), value = _ref4[0];
        return value;
      }), (_ref5 = []).concat.apply(_ref5, _toConsumableArray21(valuePlans.map(function(_ref6) {
        var _ref7 = _slicedToArray24(_ref6, 2), plan = _ref7[1];
        return plan;
      })))];
    }
    /**
     * Plan organs, retrying with and without each trial item. Runtime is
     * proportional to 2 ^ trialItems.length.
     *
     * @param organCapacities Organ capacities.
     * @param trialItems Items to rerun solver with and without.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgansWithTrials",
    value: function(organCapacities, trialItems, overrideModifiers) {
      if (trialItems.length === 0)
        return this.planOrgans(organCapacities, overrideModifiers);
      var _trialItems$ = _slicedToArray24(trialItems[0], 2), trialItem = _trialItems$[0], organSizes = _trialItems$[1];
      if (trialItem.maximum !== void 0 && trialItem.maximum <= 0)
        return this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers);
      var organCapacitiesWithMap = new Map(organCapacities), _iterator = _createForOfIteratorHelper11(organSizes), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray24(_step.value, 2), organ = _step$value[0], size = _step$value[1], current2 = organCapacitiesWithMap.get(organ);
          if (current2 === void 0)
            return this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers);
          organCapacitiesWithMap.set(organ, current2 - size);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var organCapacitiesWith = _toConsumableArray21(organCapacitiesWithMap), isRefinedPalate = trialItem.item === $item(_templateObject3910 || (_templateObject3910 = _taggedTemplateLiteral71(["pocket wish"]))) && trialItem.effect === $effect(_templateObject4010 || (_templateObject4010 = _taggedTemplateLiteral71(["Refined Palate"]))) || trialItem.item === $item(_templateObject4113 || (_templateObject4113 = _taggedTemplateLiteral71(["toasted brie"]))), isGarish = trialItem.item === $item(_templateObject4212 || (_templateObject4212 = _taggedTemplateLiteral71(["pocket wish"]))) && trialItem.effect === $effect(_templateObject4311 || (_templateObject4311 = _taggedTemplateLiteral71(["Gar-ish"]))) || trialItem.item === $item(_templateObject4410 || (_templateObject4410 = _taggedTemplateLiteral71(["potion of the field gar"]))), _this$planOrgansWithT = this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers), _this$planOrgansWithT2 = _slicedToArray24(_this$planOrgansWithT, 2), valueWithout = _this$planOrgansWithT2[0], planWithout = _this$planOrgansWithT2[1], _this$planOrgansWithT3 = this.planOrgansWithTrials(organCapacitiesWith, trialItems.slice(1), _objectSpread9(_objectSpread9(_objectSpread9({}, overrideModifiers), isRefinedPalate ? {
        refinedPalate: !0
      } : {}), isGarish ? {
        garish: !0
      } : {})), _this$planOrgansWithT4 = _slicedToArray24(_this$planOrgansWithT3, 2), valueWith = _this$planOrgansWithT4[0], planWith = _this$planOrgansWithT4[1], _this$consumptionHelp = this.consumptionHelpersAndValue(trialItem, {}), _this$consumptionHelp2 = _slicedToArray24(_this$consumptionHelp, 2), helpersAndItem = _this$consumptionHelp2[0], value = _this$consumptionHelp2[1];
      return valueWithout > valueWith + value ? [valueWithout, planWithout] : [valueWith + value, [].concat(_toConsumableArray21(planWith), [[helpersAndItem, 1]])];
    }
  }]);
}(), interactingItems = [[$item(_templateObject4510 || (_templateObject4510 = _taggedTemplateLiteral71(["spice melange"]))), [["food", -3], ["booze", -3]]], [$item(_templateObject4610 || (_templateObject4610 = _taggedTemplateLiteral71(["Ultra Mega Sour Ball"]))), [["food", -3], ["booze", -3]]], [$item(_templateObject4710 || (_templateObject4710 = _taggedTemplateLiteral71(["The Plumber's mushroom stew"]))), [["food", 3], ["booze", -1]]], [$item(_templateObject4810 || (_templateObject4810 = _taggedTemplateLiteral71(["The Mad Liquor"]))), [["food", -1], ["booze", 3]]], [$item(_templateObject4910 || (_templateObject4910 = _taggedTemplateLiteral71(["Doc Clock's thyme cocktail"]))), [["food", -2], ["booze", 4]]], [$item(_templateObject509 || (_templateObject509 = _taggedTemplateLiteral71(["Mr. Burnsger"]))), [["food", 4], ["booze", -2]]], [$effect(_templateObject5111 || (_templateObject5111 = _taggedTemplateLiteral71(["Refined Palate"]))), []], [$item(_templateObject5211 || (_templateObject5211 = _taggedTemplateLiteral71(["toasted brie"]))), [["food", 2]]], [$effect(_templateObject5310 || (_templateObject5310 = _taggedTemplateLiteral71(["Gar-ish"]))), []], [$item(_templateObject5410 || (_templateObject5410 = _taggedTemplateLiteral71(["potion of the field gar"]))), []]];
function planDiet(mpa, menu) {
  var organCapacities = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [["food", null], ["booze", null], ["spleen item", null]], resolvedOrganCapacities = organCapacities.map(function(_ref8) {
    var _ref9 = _slicedToArray24(_ref8, 2), organ = _ref9[0], size = _ref9[1];
    return [organ, size != null ? size : organ === "food" ? (0, import_kolmafia76.fullnessLimit)() - (0, import_kolmafia76.myFullness)() : organ === "booze" ? (0, import_kolmafia76.inebrietyLimit)() - (0, import_kolmafia76.myInebriety)() : organ === "spleen item" ? (0, import_kolmafia76.spleenLimit)() - (0, import_kolmafia76.mySpleenUse)() : 0];
  }), includedInteractingItems = menu.map(function(menuItem) {
    var interacting = interactingItems.find(function(_ref10) {
      var _ref11 = _slicedToArray24(_ref10, 1), itemOrEffect = _ref11[0];
      return menuItem.item === itemOrEffect || menuItem.item === $item(_templateObject558 || (_templateObject558 = _taggedTemplateLiteral71(["pocket wish"]))) && menuItem.effect === itemOrEffect;
    });
    if (interacting) {
      var _interacting = _slicedToArray24(interacting, 2), organSizes = _interacting[1];
      return [menuItem, organSizes];
    } else
      return null;
  }).filter(function(value) {
    return value !== null;
  }), dietPlanner = new DietPlanner(mpa, menu.filter(function(menuItem) {
    return !includedInteractingItems.some(function(_ref12) {
      var _ref13 = _slicedToArray24(_ref12, 1), interacting = _ref13[0];
      return interacting === menuItem;
    });
  })), _dietPlanner$planOrga = dietPlanner.planOrgansWithTrials(resolvedOrganCapacities.filter(function(_ref14) {
    var _ref15 = _slicedToArray24(_ref14, 2), organ = _ref15[0], capacity = _ref15[1];
    return ["food", "booze"].includes(organ) && capacity >= 0;
  }), includedInteractingItems, {}), _dietPlanner$planOrga2 = _slicedToArray24(_dietPlanner$planOrga, 2), planFoodBooze = _dietPlanner$planOrga2[1], spleenCapacity = resolvedOrganCapacities.find(function(_ref16) {
    var _ref17 = _slicedToArray24(_ref16, 1), organ = _ref17[0];
    return organ === "spleen item";
  });
  if (spleenCapacity) {
    var additionalSpleen = sum(planFoodBooze, function(_ref18) {
      var _ref19 = _slicedToArray24(_ref18, 2), items = _ref19[0], number = _ref19[1];
      return items.some(function(menuItem) {
        return $items(_templateObject564 || (_templateObject564 = _taggedTemplateLiteral71(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item);
      }) ? 5 * number : 0;
    }), _spleenCapacity = _slicedToArray24(spleenCapacity, 2), availableSpleen = _spleenCapacity[1], _dietPlanner$planOrga3 = dietPlanner.planOrgan("spleen item", availableSpleen + additionalSpleen), _dietPlanner$planOrga4 = _slicedToArray24(_dietPlanner$planOrga3, 2), planSpleen = _dietPlanner$planOrga4[1];
    return [].concat(_toConsumableArray21(planFoodBooze), _toConsumableArray21(planSpleen));
  } else
    return planFoodBooze;
}
var DietEntry = /* @__PURE__ */ function() {
  function DietEntry2(menuItems, quantity) {
    _classCallCheck15(this, DietEntry2), _defineProperty20(this, "quantity", void 0), _defineProperty20(this, "menuItems", void 0), this.menuItems = Object.freeze(menuItems), this.quantity = quantity;
  }
  return _createClass15(DietEntry2, [{
    key: "target",
    value: function() {
      return this.menuItems[this.menuItems.length - 1];
    }
  }, {
    key: "helpers",
    value: function() {
      return this.menuItems.length > 1 ? this.menuItems.slice(0, -1) : [];
    }
  }, {
    key: "expectedAdventures",
    value: function(diet) {
      {
        if (this.menuItems.length === 0 || this.quantity === 0)
          return 0;
        var items = this.menuItems.map(function(m) {
          return m.item;
        }), targetItem = this.menuItems[this.menuItems.length - 1].item, fork = (0, import_kolmafia76.itemType)(targetItem) === "food" && items.includes($item(_templateObject574 || (_templateObject574 = _taggedTemplateLiteral71(["Ol' Scratch's salad fork"])))), mug = (0, import_kolmafia76.itemType)(targetItem) === "booze" && items.includes($item(_templateObject584 || (_templateObject584 = _taggedTemplateLiteral71(["Frosty's frosty mug"]))));
        return this.quantity * _expectedAdventures(this.menuItems[this.menuItems.length - 1], {
          forkMug: fork || mug,
          seasoning: items.includes($item(_templateObject594 || (_templateObject594 = _taggedTemplateLiteral71(["Special Seasoning"])))),
          whetStone: items.includes($item(_templateObject604 || (_templateObject604 = _taggedTemplateLiteral71(["whet stone"])))),
          aioli: items.includes($item(_templateObject6110 || (_templateObject6110 = _taggedTemplateLiteral71(["mini kiwi aioli"])))),
          mayoflex: items.includes(Mayo.flex),
          refinedPalate: diet.refinedPalate,
          garish: diet.garish,
          saucemaven: diet.saucemaven,
          pinkyRing: diet.pinkyRing,
          tuxedoShirt: diet.tuxedoShirt
        });
      }
    }
  }, {
    key: "expectedValue",
    value: function(mpa, diet) {
      var method = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "gross", gross = mpa * this.expectedAdventures(diet) + this.quantity * sum(this.menuItems, function(menuItem) {
        var _menuItem$additionalV3;
        return (_menuItem$additionalV3 = menuItem.additionalValue) !== null && _menuItem$additionalV3 !== void 0 ? _menuItem$additionalV3 : 0;
      });
      return method === "gross" ? gross : gross - this.expectedPrice();
    }
  }, {
    key: "expectedPrice",
    value: function() {
      return this.quantity * sum(this.menuItems, function(menuItem) {
        return menuItem.price();
      });
    }
  }]);
}(), Diet = /* @__PURE__ */ function() {
  function Diet2() {
    var entries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck15(this, Diet2), _defineProperty20(this, "entries", void 0), this.entries = entries;
  }
  return _createClass15(Diet2, [{
    key: "refinedPalate",
    get: function() {
      return this.entries.some(function(dietEntry) {
        return dietEntry.menuItems.some(function(trialItem) {
          return trialItem.item === $item(_templateObject6210 || (_templateObject6210 = _taggedTemplateLiteral71(["pocket wish"]))) && trialItem.effect === $effect(_templateObject6310 || (_templateObject6310 = _taggedTemplateLiteral71(["Refined Palate"]))) || trialItem.item === $item(_templateObject6410 || (_templateObject6410 = _taggedTemplateLiteral71(["toasted brie"])));
        });
      });
    }
  }, {
    key: "garish",
    get: function() {
      return this.entries.some(function(dietEntry) {
        return dietEntry.menuItems.some(function(trialItem) {
          return trialItem.item === $item(_templateObject654 || (_templateObject654 = _taggedTemplateLiteral71(["pocket wish"]))) && trialItem.effect === $effect(_templateObject664 || (_templateObject664 = _taggedTemplateLiteral71(["Gar-ish"]))) || trialItem.item === $item(_templateObject674 || (_templateObject674 = _taggedTemplateLiteral71(["potion of the field gar"])));
        });
      });
    }
  }, {
    key: "saucemaven",
    get: function() {
      return have($skill(_templateObject684 || (_templateObject684 = _taggedTemplateLiteral71(["Saucemaven"]))));
    }
  }, {
    key: "tuxedoShirt",
    get: function() {
      return have($item(_templateObject694 || (_templateObject694 = _taggedTemplateLiteral71(["tuxedo shirt"])))) && (0, import_kolmafia76.canEquip)($item(_templateObject704 || (_templateObject704 = _taggedTemplateLiteral71(["tuxedo shirt"]))));
    }
  }, {
    key: "pinkyRing",
    get: function() {
      return have($item(_templateObject7110 || (_templateObject7110 = _taggedTemplateLiteral71(["mafia pinky ring"])))) && (0, import_kolmafia76.canEquip)($item(_templateObject7210 || (_templateObject7210 = _taggedTemplateLiteral71(["mafia pinky ring"]))));
    }
  }, {
    key: "expectedAdventures",
    value: function() {
      var _this = this;
      return sum(this.entries, function(dietEntry) {
        return dietEntry.expectedAdventures(_this);
      });
    }
  }, {
    key: "expectedValue",
    value: function(mpa) {
      var _this = this;
      var method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "gross";
      return sum(this.entries, function(dietEntry) {
        return dietEntry.expectedValue(mpa, _this, method);
      });
    }
  }, {
    key: "expectedPrice",
    value: function() {
      return sum(this.entries, function(dietEntry) {
        return dietEntry.expectedPrice();
      });
    }
  }, {
    key: "copy",
    value: function() {
      return new Diet2(_toConsumableArray21(this.entries));
    }
  }], [{
    key: "from",
    value: function(rawDiet) {
      var diet = rawDiet.map(function(item14) {
        var _item = _slicedToArray24(item14, 2), menuItems = _item[0], quantity = _item[1];
        return new DietEntry(menuItems, quantity);
      });
      return new Diet2(diet);
    }
  }, {
    key: "plan",
    value: function(mpa, menu) {
      var organCapacities = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        food: "auto",
        booze: "auto",
        spleen: "auto"
      }, food = organCapacities.food, booze = organCapacities.booze, spleen = organCapacities.spleen, plannerCapacity = [];
      return food && plannerCapacity.push(["food", food === "auto" ? null : food]), booze && plannerCapacity.push(["booze", booze === "auto" ? null : booze]), spleen && plannerCapacity.push(["spleen item", spleen === "auto" ? null : spleen]), Diet2.from(planDiet(mpa, menu, plannerCapacity));
    }
  }]);
}();

// src/Dungeon.ts
init_kolmafia_polyfill();
var import_kolmafia77 = require("kolmafia");
var _templateObject559, _templateObject2135, _templateObject3124;
function _taggedTemplateLiteral72(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _createForOfIteratorHelper12(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray37(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray22(r) {
  return _arrayWithoutHoles22(r) || _iterableToArray22(r) || _unsupportedIterableToArray37(r) || _nonIterableSpread22();
}
function _nonIterableSpread22() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray37(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray37(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray37(r, a) : void 0;
  }
}
function _iterableToArray22(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles22(r) {
  if (Array.isArray(r)) return _arrayLikeToArray37(r);
}
function _arrayLikeToArray37(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck16(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties16(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey22(o.key), o);
  }
}
function _createClass16(e, r, t) {
  return r && _defineProperties16(e.prototype, r), t && _defineProperties16(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty21(e, r, t) {
  return (r = _toPropertyKey22(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey22(t) {
  var i = _toPrimitive22(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive22(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var Dungeon = /* @__PURE__ */ function() {
  function Dungeon2(name_, loot, openAction, closeAction, openCost, openImage, closedImage) {
    _classCallCheck16(this, Dungeon2), _defineProperty21(this, "name_", void 0), _defineProperty21(this, "loot", void 0), _defineProperty21(this, "openAction", void 0), _defineProperty21(this, "closeAction", void 0), _defineProperty21(this, "openCost", void 0), _defineProperty21(this, "openImage", void 0), _defineProperty21(this, "closedImage", void 0), this.name_ = name_, this.loot = loot, this.openAction = openAction, this.closeAction = closeAction, this.openCost = openCost, this.openImage = openImage, this.closedImage = closedImage;
  }
  return _createClass16(Dungeon2, [{
    key: "possibleLoot",
    get: function() {
      return _toConsumableArray22(this.loot);
    }
  }, {
    key: "name",
    get: function() {
      return this.name_;
    }
  }, {
    key: "distribute",
    value: function(idOrname_) {
      var _this = this;
      var loot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.loot, distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !(loot instanceof Map), player = getPlayerFromIdOrName(idOrname_), lootList = loot instanceof Map ? countedMapToArray(loot) : Array.isArray(loot) ? loot : [loot], badLoot = lootList.find(function(lootItem) {
        return !_this.loot.includes(lootItem);
      });
      if (badLoot)
        throw new Error("".concat(badLoot, " is not a valid piece of dungeon loot"));
      var pageText = (0, import_kolmafia77.visitUrl)("clan_basement.php");
      if (!pageText.match(new RegExp(player.name, "i")))
        throw new Error("".concat(player.name, " cannot be distributed loot from ").concat((0, import_kolmafia77.getClanName)()));
      var itemname_s = (0, import_kolmafia77.xpath)(pageText, "//tr/td[2]/b/text()"), whichLoots = (0, import_kolmafia77.xpath)(pageText, '//form[@action="clan_basement.php"]//input[@type="hidden"][@name_="whichloot"]/@value');
      itemname_s.forEach(function(itemname_, index) {
        lootList.includes((0, import_kolmafia77.toItem)(itemname_)) && ((0, import_kolmafia77.visitUrl)("clan_basement.php?whichloot=".concat(whichLoots[index], "&recipient=").concat(player.id)), distributeAllOfAGivenItem || lootList.splice(lootList.indexOf((0, import_kolmafia77.toItem)(itemname_))));
      });
    }
    /**
     * Close this dungeon
     *
     * @returns Whether the dungeon is now closed
     */
  }, {
    key: "close",
    value: function() {
      (0, import_kolmafia77.visitUrl)("clan_basement.php?action=".concat(this.closeAction, "&confirm=true"), !0);
      var pageText = (0, import_kolmafia77.visitUrl)("clan_basement.php");
      return pageText.includes(this.closedImage);
    }
    /**
     * Open an instance of this dungeon
     *
     * @param paymentPolicy How much meat should we put into the clan stash to open this dungeon?
     * @returns Whether the dungeon is now open
     */
  }, {
    key: "open",
    value: function() {
      var paymentPolicy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Difference", pageText = (0, import_kolmafia77.visitUrl)("clan_basement.php");
      if (pageText.includes(this.openImage)) return !0;
      var clan = Clan.get();
      if (paymentPolicy === "All")
        clan.putMeatInCoffer(this.openCost);
      else {
        var stashMeat = clan.getMeatInCoffer(), payDifference = this.openCost - stashMeat;
        if (payDifference > 0) {
          if (paymentPolicy === "None") return !1;
          clan.putMeatInCoffer(payDifference);
        }
      }
      return (0, import_kolmafia77.visitUrl)("clan_basement.php?action=".concat(this.openAction), !0), (0, import_kolmafia77.visitUrl)("clan_basement.php").includes(this.openImage);
    }
    /**
     * @returns A counted map of all loot from this dungeon eligible for distribution
     */
  }, {
    key: "findLoot",
    value: function() {
      var result = /* @__PURE__ */ new Map(), pageText = (0, import_kolmafia77.visitUrl)("clan_basement.php"), _iterator = _createForOfIteratorHelper12(this.loot), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _pageText$match$lengt, _pageText$match, lootItem = _step.value;
          result.set(lootItem, (_pageText$match$lengt = (_pageText$match = pageText.match(new RegExp(lootItem.name, "g"))) === null || _pageText$match === void 0 ? void 0 : _pageText$match.length) !== null && _pageText$match$lengt !== void 0 ? _pageText$match$lengt : 0);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
  }]);
}(), Dreadsylvania = new Dungeon("Dreadsylvania", $items(_templateObject559 || (_templateObject559 = _taggedTemplateLiteral72(["Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce"]))), "translatemap", "foldmap", 1e6, "dvmap.gif", "foldmap.gif"), Hobopolis = new Dungeon("Hobopolis", $items(_templateObject2135 || (_templateObject2135 = _taggedTemplateLiteral72(["Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster"]))), "cleansewer", "floodsewer", 1e6, "opengrate.gif", "sewergrate.gif"), SlimeTube = new Dungeon("The Slime Tube", $items(_templateObject3124 || (_templateObject3124 = _taggedTemplateLiteral72(["slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants"]))), "cleanspot", "sealtube", 25e4, "slimehole.gif", "greasespot.gif");

// src/mood.ts
init_kolmafia_polyfill();
var import_kolmafia78 = require("kolmafia");
var _OscusSoda, _templateObject560, _templateObject2136, _MagicalSausages, _templateObject3125, _templateObject4106, _templateObject561, _templateObject651, _templateObject747, _templateObject839, _templateObject933, _templateObject1028;
function ownKeys10(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread10(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys10(Object(t), !0).forEach(function(r2) {
      _defineProperty22(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys10(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _createForOfIteratorHelper13(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray38(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray38(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray38(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray38(r, a) : void 0;
  }
}
function _arrayLikeToArray38(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _taggedTemplateLiteral73(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _callSuper4(t, o, e) {
  return o = _getPrototypeOf4(o), _possibleConstructorReturn4(t, _isNativeReflectConstruct4() ? Reflect.construct(o, e || [], _getPrototypeOf4(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn4(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized4(t);
}
function _assertThisInitialized4(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _isNativeReflectConstruct4() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct4 = function() {
    return !!t;
  })();
}
function _getPrototypeOf4(t) {
  return _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf4(t);
}
function _inherits5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf5(t, e);
}
function _setPrototypeOf5(t, e) {
  return _setPrototypeOf5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf5(t, e);
}
function _defineProperty22(e, r, t) {
  return (r = _toPropertyKey23(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _classCallCheck17(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties17(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey23(o.key), o);
  }
}
function _createClass17(e, r, t) {
  return r && _defineProperties17(e.prototype, r), t && _defineProperties17(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey23(t) {
  var i = _toPrimitive23(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive23(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var MpSource = /* @__PURE__ */ function() {
  function MpSource2() {
    _classCallCheck17(this, MpSource2);
  }
  return _createClass17(MpSource2, [{
    key: "usesRemaining",
    value: function() {
      return 0;
    }
  }, {
    key: "availableMpMax",
    value: function() {
      return this.availableMpMin();
    }
  }]);
}(), OscusSoda = /* @__PURE__ */ function(_MpSource) {
  function OscusSoda2() {
    return _classCallCheck17(this, OscusSoda2), _callSuper4(this, OscusSoda2, arguments);
  }
  return _inherits5(OscusSoda2, _MpSource), _createClass17(OscusSoda2, [{
    key: "available",
    value: function() {
      return have($item(_templateObject560 || (_templateObject560 = _taggedTemplateLiteral73(["Oscus's neverending soda"]))));
    }
  }, {
    key: "usesRemaining",
    value: function() {
      return get("oscusSodaUsed") ? 0 : 1;
    }
  }, {
    key: "availableMpMin",
    value: function() {
      return this.available() && this.usesRemaining() > 0 ? 200 : 0;
    }
  }, {
    key: "availableMpMax",
    value: function() {
      return this.available() && this.usesRemaining() > 0 ? 300 : 0;
    }
  }, {
    key: "execute",
    value: function() {
      (0, import_kolmafia78.use)($item(_templateObject2136 || (_templateObject2136 = _taggedTemplateLiteral73(["Oscus's neverending soda"]))));
    }
  }]);
}(MpSource);
_OscusSoda = OscusSoda;
_defineProperty22(OscusSoda, "instance", new _OscusSoda());
var MagicalSausages = /* @__PURE__ */ function(_MpSource2) {
  function MagicalSausages2() {
    return _classCallCheck17(this, MagicalSausages2), _callSuper4(this, MagicalSausages2, arguments);
  }
  return _inherits5(MagicalSausages2, _MpSource2), _createClass17(MagicalSausages2, [{
    key: "available",
    value: function() {
      return have($item(_templateObject3125 || (_templateObject3125 = _taggedTemplateLiteral73(["Kramco Sausage-o-Matic\u2122"]))));
    }
  }, {
    key: "usesRemaining",
    value: function() {
      var maxSausages = (0, import_kolmafia78.availableAmount)($item(_templateObject4106 || (_templateObject4106 = _taggedTemplateLiteral73(["magical sausage"])))) + (0, import_kolmafia78.availableAmount)($item(_templateObject561 || (_templateObject561 = _taggedTemplateLiteral73(["magical sausage casing"]))));
      return this.available() ? clamp(23 - get("_sausagesEaten"), 0, maxSausages) : 0;
    }
  }, {
    key: "availableMpMin",
    value: function() {
      return this.available() ? Math.min((0, import_kolmafia78.myMaxmp)(), 999) * this.usesRemaining() : 0;
    }
  }, {
    key: "execute",
    value: function() {
      var mpSpaceAvailable = (0, import_kolmafia78.myMaxmp)() - (0, import_kolmafia78.myMp)();
      if (!(mpSpaceAvailable < 700)) {
        var maxSausages = Math.min(this.usesRemaining(), Math.floor(((0, import_kolmafia78.myMaxmp)() - (0, import_kolmafia78.myMp)()) / Math.min((0, import_kolmafia78.myMaxmp)() - (0, import_kolmafia78.myMp)(), 999)));
        (0, import_kolmafia78.retrieveItem)(maxSausages, $item(_templateObject651 || (_templateObject651 = _taggedTemplateLiteral73(["magical sausage"])))), (0, import_kolmafia78.eat)(maxSausages, $item(_templateObject747 || (_templateObject747 = _taggedTemplateLiteral73(["magical sausage"]))));
      }
    }
  }]);
}(MpSource);
_MagicalSausages = MagicalSausages;
_defineProperty22(MagicalSausages, "instance", new _MagicalSausages());
var MoodElement = /* @__PURE__ */ function() {
  function MoodElement2() {
    _classCallCheck17(this, MoodElement2);
  }
  return _createClass17(MoodElement2, [{
    key: "mpCostPerTurn",
    value: function() {
      return 0;
    }
  }, {
    key: "turnIncrement",
    value: function() {
      return 1;
    }
  }]);
}(), SkillMoodElement = /* @__PURE__ */ function(_MoodElement) {
  function SkillMoodElement2(skill) {
    var _this;
    return _classCallCheck17(this, SkillMoodElement2), _this = _callSuper4(this, SkillMoodElement2), _defineProperty22(_this, "skill", void 0), _this.skill = skill, _this;
  }
  return _inherits5(SkillMoodElement2, _MoodElement), _createClass17(SkillMoodElement2, [{
    key: "mpCostPerTurn",
    value: function() {
      var turns2 = (0, import_kolmafia78.turnsPerCast)(this.skill);
      return turns2 > 0 ? (0, import_kolmafia78.mpCost)(this.skill) / turns2 : 0;
    }
  }, {
    key: "turnIncrement",
    value: function() {
      return (0, import_kolmafia78.turnsPerCast)(this.skill);
    }
  }, {
    key: "execute",
    value: function(mood, ensureTurns) {
      var effect2 = (0, import_kolmafia78.toEffect)(this.skill), initialTurns = (0, import_kolmafia78.haveEffect)(effect2);
      if (!(0, import_kolmafia78.haveSkill)(this.skill)) return !1;
      if (initialTurns >= ensureTurns) return !0;
      if (mood.options.songSlots.length > 0 && isSong(this.skill) && !have(effect2)) {
        var activeSongs = getActiveSongs(), _iterator = _createForOfIteratorHelper13(activeSongs), _step;
        try {
          var _loop = function() {
            var song2 = _step.value, slot = mood.options.songSlots.find(function(slot2) {
              return slot2.includes(song2);
            });
            if (!slot || slot.includes(effect2))
              return (0, import_kolmafia78.cliExecute)("shrug ".concat(song2)), 1;
          };
          for (_iterator.s(); !(_step = _iterator.n()).done && !_loop(); )
            ;
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      for (var oldRemainingCasts = -1, remainingCasts = Math.ceil((ensureTurns - (0, import_kolmafia78.haveEffect)(effect2)) / (0, import_kolmafia78.turnsPerCast)(this.skill)); remainingCasts > 0 && oldRemainingCasts !== remainingCasts; ) {
        var maxCasts = void 0;
        if ((0, import_kolmafia78.hpCost)(this.skill) > 0)
          maxCasts = Math.max(0, Math.floor(((0, import_kolmafia78.myHp)() - 1) / (0, import_kolmafia78.hpCost)(this.skill)));
        else {
          var cost = (0, import_kolmafia78.mpCost)(this.skill);
          if (maxCasts = Math.floor(Math.min(mood.availableMp(), (0, import_kolmafia78.myMp)()) / cost), maxCasts < remainingCasts) {
            var bestMp = Math.min(remainingCasts * (0, import_kolmafia78.mpCost)(this.skill), (0, import_kolmafia78.myMaxmp)());
            mood.moreMp(bestMp), maxCasts = Math.floor(Math.min(mood.availableMp(), (0, import_kolmafia78.myMp)()) / cost);
          }
        }
        var casts = clamp(remainingCasts, 0, Math.min(100, maxCasts));
        (0, import_kolmafia78.useSkill)(casts, this.skill), oldRemainingCasts = remainingCasts, remainingCasts = Math.ceil((ensureTurns - (0, import_kolmafia78.haveEffect)(effect2)) / (0, import_kolmafia78.turnsPerCast)(this.skill));
      }
      return (0, import_kolmafia78.haveEffect)(effect2) > ensureTurns;
    }
  }]);
}(MoodElement), PotionMoodElement = /* @__PURE__ */ function(_MoodElement2) {
  function PotionMoodElement2(potion, maxPricePerTurn) {
    var _this2;
    return _classCallCheck17(this, PotionMoodElement2), _this2 = _callSuper4(this, PotionMoodElement2), _defineProperty22(_this2, "potion", void 0), _defineProperty22(_this2, "maxPricePerTurn", void 0), _this2.potion = potion, _this2.maxPricePerTurn = maxPricePerTurn, _this2;
  }
  return _inherits5(PotionMoodElement2, _MoodElement2), _createClass17(PotionMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      var effect2 = (0, import_kolmafia78.effectModifier)(this.potion, "Effect"), effectTurns = (0, import_kolmafia78.haveEffect)(effect2), turnsPerUse = (0, import_kolmafia78.numericModifier)(this.potion, "Effect Duration");
      if ((0, import_kolmafia78.mallPrice)(this.potion) > this.maxPricePerTurn * turnsPerUse)
        return !1;
      if (effectTurns < ensureTurns) {
        var uses = Math.floor((ensureTurns - effectTurns) / turnsPerUse), quantityToBuy = clamp(uses - (0, import_kolmafia78.availableAmount)(this.potion), 0, 100);
        (0, import_kolmafia78.buy)(quantityToBuy, this.potion, Math.floor(this.maxPricePerTurn * turnsPerUse));
        var quantityToUse = clamp(uses, 0, (0, import_kolmafia78.availableAmount)(this.potion));
        (0, import_kolmafia78.use)(quantityToUse, this.potion);
      }
      var remainingDifference = ensureTurns - (0, import_kolmafia78.haveEffect)(effect2);
      if (remainingDifference > 0) {
        var maxPrice = Math.floor(this.maxPricePerTurn * remainingDifference);
        (0, import_kolmafia78.mallPrice)(this.potion) <= maxPrice && ((0, import_kolmafia78.availableAmount)(this.potion) || (0, import_kolmafia78.buy)(1, this.potion, maxPrice)) && (0, import_kolmafia78.use)(1, this.potion);
      }
      return (0, import_kolmafia78.haveEffect)(effect2) >= ensureTurns;
    }
  }]);
}(MoodElement), GenieMoodElement = /* @__PURE__ */ function(_MoodElement3) {
  function GenieMoodElement2(effect2) {
    var _this3;
    return _classCallCheck17(this, GenieMoodElement2), _this3 = _callSuper4(this, GenieMoodElement2), _defineProperty22(_this3, "effect", void 0), _this3.effect = effect2, _this3;
  }
  return _inherits5(GenieMoodElement2, _MoodElement3), _createClass17(GenieMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      if ((0, import_kolmafia78.haveEffect)(this.effect) >= ensureTurns) return !0;
      var neededWishes = Math.ceil(((0, import_kolmafia78.haveEffect)(this.effect) - ensureTurns) / 20), wishesToBuy = clamp(neededWishes - (0, import_kolmafia78.availableAmount)($item(_templateObject839 || (_templateObject839 = _taggedTemplateLiteral73(["pocket wish"])))), 0, 20);
      (0, import_kolmafia78.buy)(wishesToBuy, $item(_templateObject933 || (_templateObject933 = _taggedTemplateLiteral73(["pocket wish"]))), 5e4);
      for (var wishesToUse = clamp(neededWishes, 0, (0, import_kolmafia78.availableAmount)($item(_templateObject1028 || (_templateObject1028 = _taggedTemplateLiteral73(["pocket wish"]))))); wishesToUse > 0; wishesToUse--)
        (0, import_kolmafia78.cliExecute)("genie effect ".concat(this.effect.name));
      return (0, import_kolmafia78.haveEffect)(this.effect) >= ensureTurns;
    }
  }]);
}(MoodElement), CustomMoodElement = /* @__PURE__ */ function(_MoodElement4) {
  function CustomMoodElement2(effect2, gainEffect) {
    var _this4;
    return _classCallCheck17(this, CustomMoodElement2), _this4 = _callSuper4(this, CustomMoodElement2), _defineProperty22(_this4, "effect", void 0), _defineProperty22(_this4, "gainEffect", void 0), _this4.effect = effect2, _this4.gainEffect = gainEffect != null ? gainEffect : function() {
      return (0, import_kolmafia78.cliExecute)(effect2.default);
    }, _this4;
  }
  return _inherits5(CustomMoodElement2, _MoodElement4), _createClass17(CustomMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      for (var currentTurns = (0, import_kolmafia78.haveEffect)(this.effect), lastCurrentTurns = -1; currentTurns < ensureTurns && currentTurns !== lastCurrentTurns; )
        this.gainEffect(), lastCurrentTurns = currentTurns, currentTurns = (0, import_kolmafia78.haveEffect)(this.effect);
      return (0, import_kolmafia78.haveEffect)(this.effect) > ensureTurns;
    }
  }]);
}(MoodElement), AsdonMoodElement = /* @__PURE__ */ function(_MoodElement5) {
  function AsdonMoodElement2(effect2) {
    var _this5, preferInventory = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return _classCallCheck17(this, AsdonMoodElement2), _this5 = _callSuper4(this, AsdonMoodElement2), _defineProperty22(_this5, "effect", void 0), _defineProperty22(_this5, "preferInventory", void 0), _this5.effect = effect2, _this5.preferInventory = preferInventory, _this5;
  }
  return _inherits5(AsdonMoodElement2, _MoodElement5), _createClass17(AsdonMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      return AsdonMartin_exports.drive(this.effect, ensureTurns, this.preferInventory);
    }
  }]);
}(MoodElement), Mood = /* @__PURE__ */ function() {
  function Mood2() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck17(this, Mood2), _defineProperty22(this, "options", void 0), _defineProperty22(this, "elements", []), this.options = _objectSpread10(_objectSpread10({}, Mood2.defaultOptions), options);
  }
  return _createClass17(Mood2, [{
    key: "availableMp",
    value: function() {
      return this.options.useNativeRestores ? 1 / 0 : sum(this.options.mpSources, function(mpSource) {
        return mpSource.availableMpMin();
      }) + Math.max((0, import_kolmafia78.myMp)() - this.options.reserveMp, 0);
    }
  }, {
    key: "moreMp",
    value: function(minimumTarget) {
      if (!((0, import_kolmafia78.myMp)() >= minimumTarget)) {
        var _iterator2 = _createForOfIteratorHelper13(this.options.mpSources), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var mpSource = _step2.value;
            if (mpSource.usesRemaining() > 0 && (mpSource.execute(), (0, import_kolmafia78.myMp)() >= minimumTarget))
              break;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.options.useNativeRestores && (0, import_kolmafia78.restoreMp)(minimumTarget);
      }
    }
    /**
     * Add a skill to the mood.
     *
     * @param skill Skill to add.
     * @returns This mood to enable chaining
     */
  }, {
    key: "skill",
    value: function(_skill) {
      return this.elements.push(new SkillMoodElement(_skill)), this;
    }
    /**
     * Add an effect to the mood, with casting based on {effect.default}.
     *
     * @param effect Effect to add.
     * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
     * @returns This mood to enable chaining
     */
  }, {
    key: "effect",
    value: function(_effect, gainEffect) {
      var skill = (0, import_kolmafia78.toSkill)(_effect);
      return !gainEffect && skill !== $skill.none ? this.skill(skill) : this.elements.push(new CustomMoodElement(_effect, gainEffect)), this;
    }
    /**
     * Add a potion to the mood.
     *
     * @param potion Potion to add.
     * @param maxPricePerTurn Maximum price to pay per turn of the effect.
     * @returns This mood to enable chaining
     */
  }, {
    key: "potion",
    value: function(_potion, maxPricePerTurn) {
      return this.elements.push(new PotionMoodElement(_potion, maxPricePerTurn)), this;
    }
    /**
     * Add an effect to acquire via pocket wishes to the mood.
     *
     * @param effect Effect to wish for in the mood.
     * @returns This mood to enable chaining
     */
  }, {
    key: "genie",
    value: function(effect2) {
      return this.elements.push(new GenieMoodElement(effect2)), this;
    }
    /**
     * Add an Asdon Martin driving style to the mood.
     *
     * @param effect Driving style to add to the mood.
     * @returns This mood to enable chaining
     */
  }, {
    key: "drive",
    value: function(effect2) {
      return Object.values(AsdonMartin_exports.Driving).includes(effect2) && AsdonMartin_exports.installed() && this.elements.push(new AsdonMoodElement(effect2)), this;
    }
    /**
     * Execute the mood, trying to ensure {ensureTurns} of each effect.
     *
     * @param ensureTurns Turns of each effect to try and achieve.
     * @returns Whether or not we successfully got this many turns of every effect in the mood.
     */
  }, {
    key: "execute",
    value: function() {
      var ensureTurns = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, availableMp = this.availableMp(), totalMpPerTurn = sum(this.elements, function(element2) {
        return element2.mpCostPerTurn();
      }), potentialTurns = Math.floor(availableMp / totalMpPerTurn), completeSuccess = !0, _iterator3 = _createForOfIteratorHelper13(this.elements), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var element = _step3.value, elementTurns = ensureTurns;
          if (element.mpCostPerTurn() > 0) {
            var elementPotentialTurns = Math.floor(potentialTurns / element.turnIncrement()) * element.turnIncrement();
            elementTurns = Math.min(ensureTurns, elementPotentialTurns);
          }
          completeSuccess = element.execute(this, elementTurns) && completeSuccess;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return this.moreMp(this.options.reserveMp), completeSuccess;
    }
  }], [{
    key: "setDefaultOptions",
    value: (
      /**
       * Set default options for new Mood instances.
       *
       * @param options Default options for new Mood instances.
       */
      function(options) {
        Mood2.defaultOptions = _objectSpread10(_objectSpread10({}, Mood2.defaultOptions), options);
      }
    )
  }]);
}();
_defineProperty22(Mood, "defaultOptions", {
  songSlots: [],
  mpSources: [MagicalSausages.instance, OscusSoda.instance],
  reserveMp: 0,
  useNativeRestores: !1
});

// src/since.ts
init_kolmafia_polyfill();
var import_kolmafia79 = require("kolmafia");
function _defineProperties18(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey24(o.key), o);
  }
}
function _createClass18(e, r, t) {
  return r && _defineProperties18(e.prototype, r), t && _defineProperties18(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey24(t) {
  var i = _toPrimitive24(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive24(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _classCallCheck18(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper5(t, o, e) {
  return o = _getPrototypeOf5(o), _possibleConstructorReturn5(t, _isNativeReflectConstruct5() ? Reflect.construct(o, e || [], _getPrototypeOf5(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn5(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized5(t);
}
function _assertThisInitialized5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf6(t, e);
}
function _wrapNativeSuper4(t) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper4 = function(t2) {
    if (t2 === null || !_isNativeFunction4(t2)) return t2;
    if (typeof t2 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r !== void 0) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct4(t2, arguments, _getPrototypeOf5(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf6(Wrapper, t2);
  }, _wrapNativeSuper4(t);
}
function _construct4(t, e, r) {
  if (_isNativeReflectConstruct5()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf6(p, r.prototype), p;
}
function _isNativeReflectConstruct5() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct5 = function() {
    return !!t;
  })();
}
function _isNativeFunction4(t) {
  try {
    return Function.toString.call(t).indexOf("[native code]") !== -1;
  } catch (n) {
    return typeof t == "function";
  }
}
function _setPrototypeOf6(t, e) {
  return _setPrototypeOf6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf6(t, e);
}
function _getPrototypeOf5(t) {
  return _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf5(t);
}
var KolmafiaVersionError = /* @__PURE__ */ function(_Error) {
  function KolmafiaVersionError2(message) {
    var _this;
    return _classCallCheck18(this, KolmafiaVersionError2), _this = _callSuper5(this, KolmafiaVersionError2, [message]), Object.setPrototypeOf(_this, KolmafiaVersionError2.prototype), _this;
  }
  return _inherits6(KolmafiaVersionError2, _Error), _createClass18(KolmafiaVersionError2);
}(/* @__PURE__ */ _wrapNativeSuper4(Error));
KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
function getScriptName() {
  var _require$main, scriptName = (_require$main = require.main) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision))
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  var currentRevision = (0, import_kolmafia79.getRevision)();
  if (currentRevision > 0 && currentRevision < revision)
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0, import_kolmafia79.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
}
function sinceKolmafiaVersion(majorVersion, minorVersion) {
  if (!((0, import_kolmafia79.getRevision)() >= 25720)) {
    if (!Number.isInteger(majorVersion))
      throw new TypeError("Invalid major version number ".concat(majorVersion, " (must be an integer)"));
    if (!Number.isInteger(minorVersion))
      throw new TypeError("Invalid minor version number ".concat(minorVersion, " (must be an integer)"));
    if (majorVersion > 21 || majorVersion === 20 && minorVersion > 9)
      throw new Error("There were no versions released after 21.09. This command will always fail");
    var versionStr = (0, import_kolmafia79.getVersion)(), versionStrMatch = /v(\d+)\.(\d+)/.exec(versionStr);
    if (!versionStrMatch)
      throw new Error('Unexpected KoLmafia version string: "'.concat(versionStr, '". You may need to update the script.'));
    var currentMajorVersion = Number(versionStrMatch[1]), currentMinorVersion = Number(versionStrMatch[2]);
    if (currentMajorVersion < majorVersion || currentMajorVersion === majorVersion && currentMinorVersion < minorVersion)
      throw new KolmafiaVersionError("".concat(getScriptName(), " requires version ").concat(majorVersion, ".").concat(minorVersion, " of kolmafia or higher (current: ").concat(currentMajorVersion, ".").concat(currentMinorVersion, "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}

// src/Kmail.ts
init_kolmafia_polyfill();
var import_html_entities2 = __toESM(require_lib(), 1), import_kolmafia81 = require("kolmafia");

// src/url.ts
init_kolmafia_polyfill();
var import_kolmafia80 = require("kolmafia");
function _toConsumableArray23(r) {
  return _arrayWithoutHoles23(r) || _iterableToArray23(r) || _unsupportedIterableToArray39(r) || _nonIterableSpread23();
}
function _nonIterableSpread23() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray23(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles23(r) {
  if (Array.isArray(r)) return _arrayLikeToArray39(r);
}
function _slicedToArray25(r, e) {
  return _arrayWithHoles25(r) || _iterableToArrayLimit25(r, e) || _unsupportedIterableToArray39(r, e) || _nonIterableRest25();
}
function _nonIterableRest25() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit25(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles25(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper14(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray39(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray39(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray39(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray39(r, a) : void 0;
  }
}
function _arrayLikeToArray39(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var EMPTY_VALUE = Symbol("empty");
function fetchUrl(path3) {
  var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _options$method = options.method, method = _options$method === void 0 ? "POST" : _options$method, url = buildUrl(path3, query);
  return (0, import_kolmafia80.visitUrl)(url, method === "POST", !0);
}
function buildUrl(path3) {
  var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], urlParams = Array.isArray(query) ? query : Object.entries(query);
  if (urlParams.length === 0)
    return path3;
  var chunks = [path3], sep = path3.includes("?") ? "&" : "?", _iterator = _createForOfIteratorHelper14(urlParams), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var param = _step.value;
      if (param.length !== 2)
        throw new Error("Query parameter array may only contain pair elements");
      var _param = _slicedToArray25(param, 2), _key = _param[0], _value = _param[1];
      chunks.push(sep), sep = "&", chunks.push(encodeURIComponent(_key)), _value !== EMPTY_VALUE && (chunks.push("="), chunks.push(encodeURIComponent(_value)));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return chunks.join("");
}
function combineQuery() {
  for (var _len = arguments.length, queries = new Array(_len), _key2 = 0; _key2 < _len; _key2++)
    queries[_key2] = arguments[_key2];
  if (queries.length === 1)
    return queries[0];
  for (var result = [], _i = 0, _queries = queries; _i < _queries.length; _i++) {
    var query = _queries[_i];
    Array.isArray(query) ? result.push.apply(result, _toConsumableArray23(query)) : result.push.apply(result, _toConsumableArray23(Object.entries(query)));
  }
  return result;
}

// src/Kmail.ts
function _createForOfIteratorHelper15(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray40(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray24(r) {
  return _arrayWithoutHoles24(r) || _iterableToArray24(r) || _unsupportedIterableToArray40(r) || _nonIterableSpread24();
}
function _nonIterableSpread24() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray24(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles24(r) {
  if (Array.isArray(r)) return _arrayLikeToArray40(r);
}
function _slicedToArray26(r, e) {
  return _arrayWithHoles26(r) || _iterableToArrayLimit26(r, e) || _unsupportedIterableToArray40(r, e) || _nonIterableRest26();
}
function _nonIterableRest26() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray40(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray40(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray40(r, a) : void 0;
  }
}
function _arrayLikeToArray40(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit26(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles26(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck19(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties19(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey25(o.key), o);
  }
}
function _createClass19(e, r, t) {
  return r && _defineProperties19(e.prototype, r), t && _defineProperties19(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty23(e, r, t) {
  return (r = _toPropertyKey25(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey25(t) {
  var i = _toPrimitive25(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive25(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
var Kmail = /* @__PURE__ */ function() {
  function Kmail2(rawKmail) {
    _classCallCheck19(this, Kmail2), _defineProperty23(this, "id", void 0), _defineProperty23(this, "date", void 0), _defineProperty23(this, "type", void 0), _defineProperty23(this, "senderId", void 0), _defineProperty23(this, "senderName", void 0), _defineProperty23(this, "rawMessage", void 0), _defineProperty23(this, "_parsedMessageParts", void 0), this.id = Number(rawKmail.id), this.date = new Date(Number(rawKmail.azunixtime) * 1e3), this.type = rawKmail.type, this.senderId = Number(rawKmail.fromid), this.senderName = rawKmail.fromname, this.rawMessage = rawKmail.message;
  }
  return _createClass19(Kmail2, [{
    key: "delete",
    value: function() {
      return Kmail2.delete([this]) === 1;
    }
  }, {
    key: "_messageParts",
    get: function() {
      var _this$_parsedMessageP;
      return (_this$_parsedMessageP = this._parsedMessageParts) !== null && _this$_parsedMessageP !== void 0 ? _this$_parsedMessageP : this._parsedMessageParts = this._parseMessageParts();
    }
  }, {
    key: "_parseMessageParts",
    value: function() {
      var text = this.rawMessage, insideText;
      if (this.type === "normal") {
        if (text.startsWith("<center>")) {
          var endIdx = text.indexOf("</center>");
          text = text.slice(endIdx + 9);
        }
      } else if (this.type === "giftshop") {
        var _text$split = text.split("<p>Inside Note:<p>"), _text$split2 = _slicedToArray26(_text$split, 2);
        text = _text$split2[0], insideText = _text$split2[1];
      }
      var split = function(s) {
        var idx = s.indexOf("<");
        return idx === -1 ? [s] : [s.slice(0, idx), s.slice(idx)];
      }, _split = split(text), _split2 = _slicedToArray26(_split, 2), outsideNote = _split2[0], _split2$ = _split2[1], outsideAttachments = _split2$ === void 0 ? null : _split2$, _ref = insideText !== void 0 ? split(insideText) : [], _ref2 = _slicedToArray26(_ref, 2), _ref2$ = _ref2[0], insideNote = _ref2$ === void 0 ? null : _ref2$, _ref2$2 = _ref2[1], insideAttachments = _ref2$2 === void 0 ? null : _ref2$2;
      return {
        outsideNote: (0, import_html_entities2.decode)(outsideNote),
        outsideAttachments: outsideAttachments,
        insideNote: insideNote && (0, import_html_entities2.decode)(insideNote),
        insideAttachments: insideAttachments
      };
    }
    /**
     * Get message contents without any HTML from items or meat
     *
     * @returns Cleaned message contents
     */
  }, {
    key: "message",
    get: function() {
      var _this$_messageParts = this._messageParts, outsideNote = _this$_messageParts.outsideNote, insideNote = _this$_messageParts.insideNote;
      return insideNote !== null ? "".concat(outsideNote, "\n\nInside Note:\n").concat(insideNote) : outsideNote;
    }
    /**
     * Get the note on the outside of the gift. If the kmail is not a gift,
     * this will be the entire message.
     *
     * @returns Note on the outside of the gift, or the entire message for non-gifts
     */
  }, {
    key: "outsideNote",
    get: function() {
      return this._messageParts.outsideNote;
    }
    /**
     * Get the note on the inside of the gift
     *
     * @returns Note on the inside of the gift
     */
  }, {
    key: "insideNote",
    get: function() {
      return this._messageParts.insideNote;
    }
    /**
     * Get items attached to the kmail
     *
     * @returns Map of items attached to the kmail and their quantities
     */
  }, {
    key: "items",
    value: function() {
      var _this$_messageParts2 = this._messageParts, outsideAttachments = _this$_messageParts2.outsideAttachments, insideAttachments = _this$_messageParts2.insideAttachments;
      return extractItems("".concat(outsideAttachments).concat(insideAttachments));
    }
    /**
     * Get items attached to the outside of the gift, which should be
     * just the gift wrapper for giftshop items, and all items for normal kmails
     *
     * @returns Map of items attached to the kmail and their quantities
     */
  }, {
    key: "outsideItems",
    value: function() {
      var outsideAttachments = this._messageParts.outsideAttachments;
      return outsideAttachments ? extractItems(outsideAttachments) : /* @__PURE__ */ new Map();
    }
    /**
     * Get items attached to the inside of the gift
     *
     * @returns Map of items attached to the kmail and their quantities
     */
  }, {
    key: "insideItems",
    value: function() {
      var insideAttachments = this._messageParts.insideAttachments;
      return insideAttachments ? extractItems(insideAttachments) : /* @__PURE__ */ new Map();
    }
    /**
     * Get meat attached to the kmail
     *
     * @returns Meat attached to the kmail
     */
  }, {
    key: "meat",
    value: function() {
      var _this$_messageParts3 = this._messageParts, outsideAttachments = _this$_messageParts3.outsideAttachments, insideAttachments = _this$_messageParts3.insideAttachments;
      return !outsideAttachments && !insideAttachments ? 0 : (0, import_kolmafia81.extractMeat)("".concat(outsideAttachments).concat(insideAttachments));
    }
    /**
     * Reply to kmail
     *
     * @param message Message with which to reply
     * @param items Items to send
     * @param meat Meat to send
     * @see Kmail.send
     * @returns True if the kmail was successfully sent
     */
  }, {
    key: "reply",
    value: function() {
      var message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", items = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], meat = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      return Kmail2.send(this.senderId, message, items, meat);
    }
  }], [{
    key: "parse",
    value: (
      /**
       * Parses a kmail from KoL's native format
       *
       * @param rawKmail Kmail in the format supplies by api.php
       * @returns Parsed kmail
       */
      function(rawKmail) {
        return new Kmail2(rawKmail);
      }
    )
    /**
     * Returns all of the player's kmails
     *
     * @param count Number of kmails to fetch
     * @returns Parsed kmails
     */
  }, {
    key: "inbox",
    value: function() {
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
      return JSON.parse((0, import_kolmafia81.visitUrl)("api.php?what=kmail&for=libram&count=".concat(count))).map(Kmail2.parse);
    }
    /**
     * Bulk delete kmails
     *
     * @param kmails Kmails to delete
     * @returns Number of kmails deleted
     */
  }, {
    key: "delete",
    value: function(kmails) {
      var _results$match$, _results$match, results = fetchUrl("messages.php", [["the_action", "delete"], ["box", "Inbox"], ["pwd", EMPTY_VALUE]].concat(_toConsumableArray24(kmails.map(function(k) {
        return ["sel".concat(k.id), "on"];
      }))));
      return Number((_results$match$ = (_results$match = results.match(/<td>(\d) messages? deleted.<\/td>/)) === null || _results$match === void 0 ? void 0 : _results$match[1]) !== null && _results$match$ !== void 0 ? _results$match$ : 0);
    }
  }, {
    key: "_genericSend",
    value: function(to, message, items, meat, chunkSize, constructUrl, successString) {
      var m = meat, sendableItems = _toConsumableArray24(arrayToCountedMap(items).entries()).filter(function(_ref3) {
        var _ref4 = _slicedToArray26(_ref3, 1), item14 = _ref4[0];
        return (0, import_kolmafia81.isGiftable)(item14);
      }), result = !0, chunks = chunk(sendableItems, chunkSize), _iterator = _createForOfIteratorHelper15(chunks.length > 0 ? chunks : [null]), _step;
      try {
        var _loop = function() {
          var _c$length, c = _step.value, itemsQuery = {};
          c !== null && c.forEach(function(_ref5, i) {
            var _ref6 = _slicedToArray26(_ref5, 2), item14 = _ref6[0], quantity = _ref6[1];
            itemsQuery["whichitem".concat(i + 1)] = item14.id, itemsQuery["howmany".concat(i + 1)] = quantity;
          });
          var _constructUrl = constructUrl({
            meat: m,
            chunkSize: (_c$length = c == null ? void 0 : c.length) !== null && _c$length !== void 0 ? _c$length : 0
          }), path3 = _constructUrl.path, query = _constructUrl.query, r = fetchUrl(path3, combineQuery(query, itemsQuery));
          if (r.includes("That player cannot receive Meat or items"))
            return {
              v: Kmail2.gift(to, message, items, meat)
            };
          m = 0, result && (result = r.includes(successString));
        }, _ret;
        for (_iterator.s(); !(_step = _iterator.n()).done; )
          if (_ret = _loop(), _ret) return _ret.v;
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
    /**
     * Sends a kmail to a player
     *
     * Sends multiple kmails if more than 11 unique item types are attached.
     * Ignores any ungiftable items.
     * Sends a gift package to players in run
     *
     * @param to The player name or id to receive the kmail
     * @param message The text contents of the message
     * @param items The items to be attached
     * @param meat The quantity of meat to be attached
     * @returns True if the kmail was successfully sent
     */
  }, {
    key: "send",
    value: function(to) {
      var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", items = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], meat = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
      return Kmail2._genericSend(to, message, items, meat, 11, function(_ref7) {
        var meat2 = _ref7.meat;
        return {
          path: "sendmessage.php",
          query: {
            action: "send",
            pwd: EMPTY_VALUE,
            towho: to,
            message: message,
            sendmeat: meat2
          }
        };
      }, ">Message sent.</");
    }
    /**
     * Sends a gift to a player
     *
     * Sends multiple kmails if more than 3 unique item types are attached.
     * Ignores any ungiftable items.
     *
     * @param to The player name or id to receive the gift
     * @param message Message to send
     * @param items The items to be attached
     * @param meat The quantity of meat to be attached
     * @param insideNote The note on the inside of the gift
     * @returns True if the gift was successfully sent
     */
  }, {
    key: "gift",
    value: function(to) {
      var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", items = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], meat = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, insideNote = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "";
      return Kmail2._genericSend(to, message, items, meat, 3, function(_ref8) {
        var meat2 = _ref8.meat, chunkSize = _ref8.chunkSize;
        return {
          path: "town_sendgift.php",
          query: {
            action: "Yep.",
            pwd: EMPTY_VALUE,
            fromwhere: 0,
            note: message,
            insidenote: insideNote,
            towho: to,
            whichpackage: chunkSize,
            sendmeat: meat2
          }
        };
      }, ">Package sent.</");
    }
  }]);
}();

// src/console.ts
var console_exports = {};
__export(console_exports, {
  error: function() {
    return error;
  },
  info: function() {
    return info;
  },
  log: function() {
    return log;
  },
  warn: function() {
    return warn;
  }
});
init_kolmafia_polyfill();
var import_kolmafia82 = require("kolmafia"), logColor = function(color) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
      args[_key] = arguments[_key];
    var output = args.map(function(x) {
      return x.toString();
    }).join(" ");
    color ? (0, import_kolmafia82.print)(output, color) : (0, import_kolmafia82.print)(output);
  };
}, log = logColor(), info = logColor("blue"), warn = logColor("red"), error = logColor("red");

// src/session.ts
init_kolmafia_polyfill();
var import_kolmafia83 = require("kolmafia");
var _templateObject565, _templateObject2137, _templateObject3126, _templateObject4107, _templateObject566, _templateObject655, _templateObject748, _templateObject840, _templateObject934, _templateObject1029, _templateObject1126, _templateObject1225, _templateObject1323, _templateObject1421, _templateObject1518, _templateObject1618, _templateObject1718, _templateObject1818, _templateObject1916, _templateObject2016, _templateObject2138, _templateObject2218, _templateObject2317, _templateObject2416, _templateObject2515, _templateObject2614, _templateObject2714, _templateObject2812, _templateObject2912, _templateObject3012, _templateObject3127, _templateObject3214, _templateObject3313;
function _classCallCheck20(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties20(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey26(o.key), o);
  }
}
function _createClass20(e, r, t) {
  return r && _defineProperties20(e.prototype, r), t && _defineProperties20(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _defineProperty24(e, r, t) {
  return (r = _toPropertyKey26(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function _toPropertyKey26(t) {
  var i = _toPrimitive26(t, "string");
  return typeof i == "symbol" ? i : i + "";
}
function _toPrimitive26(t, r) {
  if (typeof t != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _createForOfIteratorHelper16(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray41(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _slicedToArray27(r, e) {
  return _arrayWithHoles27(r) || _iterableToArrayLimit27(r, e) || _unsupportedIterableToArray41(r, e) || _nonIterableRest27();
}
function _nonIterableRest27() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit27(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles27(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral74(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function _toConsumableArray25(r) {
  return _arrayWithoutHoles25(r) || _iterableToArray25(r) || _unsupportedIterableToArray41(r) || _nonIterableSpread25();
}
function _nonIterableSpread25() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray41(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray41(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray41(r, a) : void 0;
  }
}
function _iterableToArray25(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function _arrayWithoutHoles25(r) {
  if (Array.isArray(r)) return _arrayLikeToArray41(r);
}
function _arrayLikeToArray41(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function mySessionItemsWrapper() {
  var sessionOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, manyToOne = function(primary, mapped) {
    return mapped.map(function(target) {
      return [target, primary];
    });
  }, foldable = function(item15) {
    return manyToOne(item15, getFoldGroup(item15));
  }, itemMappings = new Map([].concat(_toConsumableArray25(foldable($item(_templateObject565 || (_templateObject565 = _taggedTemplateLiteral74(["liar's pants"]))))), _toConsumableArray25(foldable($item(_templateObject2137 || (_templateObject2137 = _taggedTemplateLiteral74(["ice pick"]))))), _toConsumableArray25(manyToOne($item(_templateObject3126 || (_templateObject3126 = _taggedTemplateLiteral74(["Spooky Putty sheet"]))), [$item(_templateObject4107 || (_templateObject4107 = _taggedTemplateLiteral74(["Spooky Putty monster"])))].concat(_toConsumableArray25(getFoldGroup($item(_templateObject566 || (_templateObject566 = _taggedTemplateLiteral74(["Spooky Putty sheet"])))))))), _toConsumableArray25(foldable($item(_templateObject655 || (_templateObject655 = _taggedTemplateLiteral74(["stinky cheese sword"]))))), _toConsumableArray25(foldable($item(_templateObject748 || (_templateObject748 = _taggedTemplateLiteral74(["naughty paper shuriken"]))))), _toConsumableArray25(foldable($item(_templateObject840 || (_templateObject840 = _taggedTemplateLiteral74(["Loathing Legion knife"]))))), _toConsumableArray25(foldable($item(_templateObject934 || (_templateObject934 = _taggedTemplateLiteral74(["deceased crimbo tree"]))))), _toConsumableArray25(foldable($item(_templateObject1029 || (_templateObject1029 = _taggedTemplateLiteral74(["makeshift turban"]))))), _toConsumableArray25(foldable($item(_templateObject1126 || (_templateObject1126 = _taggedTemplateLiteral74(["turtle wax shield"]))))), _toConsumableArray25(foldable($item(_templateObject1225 || (_templateObject1225 = _taggedTemplateLiteral74(["metallic foil bow"]))))), _toConsumableArray25(foldable($item(_templateObject1323 || (_templateObject1323 = _taggedTemplateLiteral74(["ironic moustache"]))))), _toConsumableArray25(foldable($item(_templateObject1421 || (_templateObject1421 = _taggedTemplateLiteral74(["bugged balaclava"]))))), _toConsumableArray25(foldable($item(_templateObject1518 || (_templateObject1518 = _taggedTemplateLiteral74(["toggle switch (Bartend)"]))))), _toConsumableArray25(foldable($item(_templateObject1618 || (_templateObject1618 = _taggedTemplateLiteral74(["mushroom cap"]))))), _toConsumableArray25(manyToOne($item(_templateObject1718 || (_templateObject1718 = _taggedTemplateLiteral74(["can of Rain-Doh"]))), $items(_templateObject1818 || (_templateObject1818 = _taggedTemplateLiteral74(["empty Rain-Doh can"]))))), _toConsumableArray25(manyToOne($item(_templateObject1916 || (_templateObject1916 = _taggedTemplateLiteral74(["meteorite fragment"]))), $items(_templateObject2016 || (_templateObject2016 = _taggedTemplateLiteral74(["meteorite earring, meteorite necklace, meteorite ring"]))))), _toConsumableArray25(manyToOne($item(_templateObject2138 || (_templateObject2138 = _taggedTemplateLiteral74(["Sneaky Pete's leather jacket"]))), $items(_templateObject2218 || (_templateObject2218 = _taggedTemplateLiteral74(["Sneaky Pete's leather jacket (collar popped)"]))))), _toConsumableArray25(manyToOne($item(_templateObject2317 || (_templateObject2317 = _taggedTemplateLiteral74(["Boris's Helm"]))), $items(_templateObject2416 || (_templateObject2416 = _taggedTemplateLiteral74(["Boris's Helm (askew)"]))))), _toConsumableArray25(manyToOne($item(_templateObject2515 || (_templateObject2515 = _taggedTemplateLiteral74(["Jarlsberg's pan"]))), $items(_templateObject2614 || (_templateObject2614 = _taggedTemplateLiteral74(["Jarlsberg's pan (Cosmic portal mode)"]))))), _toConsumableArray25(manyToOne($item(_templateObject2714 || (_templateObject2714 = _taggedTemplateLiteral74(["tiny plastic sword"]))), $items(_templateObject2812 || (_templateObject2812 = _taggedTemplateLiteral74(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), _toConsumableArray25(manyToOne($item(_templateObject2912 || (_templateObject2912 = _taggedTemplateLiteral74(["earthenware muffin tin"]))), $items(_templateObject3012 || (_templateObject3012 = _taggedTemplateLiteral74(["blueberry muffin, bran muffin, chocolate chip muffin"]))))), _toConsumableArray25(manyToOne($item(_templateObject3127 || (_templateObject3127 = _taggedTemplateLiteral74(["ChibiBuddy\u2122 (on)"]))), $items(_templateObject3214 || (_templateObject3214 = _taggedTemplateLiteral74(["ChibiBuddy\u2122 (off)"]))))))), inventory = /* @__PURE__ */ new Map(), invLocations = sessionOnly ? [import_kolmafia83.mySessionItems] : [import_kolmafia83.mySessionItems, import_kolmafia83.getCloset, import_kolmafia83.getDisplay, import_kolmafia83.getStorage];
  if (!sessionOnly)
    for (var _i = 0, _Object$entries = Object.entries((0, import_kolmafia83.getCampground)()); _i < _Object$entries.length; _i++) {
      var _itemMappings$get, _inventory$get, _Object$entries$_i = _slicedToArray27(_Object$entries[_i], 2), itemStr = _Object$entries$_i[0], quantity = _Object$entries$_i[1];
      if (quantity) {
        var item14 = (0, import_kolmafia83.toItem)(itemStr);
        if (item14 !== $item(_templateObject3313 || (_templateObject3313 = _taggedTemplateLiteral74(["big rock"])))) {
          var mappedItem = (_itemMappings$get = itemMappings.get(item14)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : item14;
          inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
        }
      }
    }
  for (var _i2 = 0, _invLocations = invLocations; _i2 < _invLocations.length; _i2++)
    for (var inventoryFunc = _invLocations[_i2], _i3 = 0, _Object$entries2 = Object.entries(inventoryFunc()); _i3 < _Object$entries2.length; _i3++) {
      var _itemMappings$get2, _inventory$get2, _Object$entries2$_i = _slicedToArray27(_Object$entries2[_i3], 2), _itemStr = _Object$entries2$_i[0], _quantity = _Object$entries2$_i[1];
      if (_quantity) {
        var _item = (0, import_kolmafia83.toItem)(_itemStr), _mappedItem = (_itemMappings$get2 = itemMappings.get(_item)) !== null && _itemMappings$get2 !== void 0 ? _itemMappings$get2 : _item;
        inventory.set(_mappedItem, _quantity + ((_inventory$get2 = inventory.get(_mappedItem)) !== null && _inventory$get2 !== void 0 ? _inventory$get2 : 0)), inventory.get(_mappedItem) === 0 && inventory.delete(_mappedItem);
      }
    }
  return inventory;
}
function inventoryOperation(a, b, op) {
  var difference = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper16(new Set([].concat(_toConsumableArray25(a.keys()), _toConsumableArray25(b.keys())))), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _a$get, _b$get, item14 = _step.value;
      difference.set(item14, op((_a$get = a.get(item14)) !== null && _a$get !== void 0 ? _a$get : 0, (_b$get = b.get(item14)) !== null && _b$get !== void 0 ? _b$get : 0));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var diffEntries = _toConsumableArray25(difference.entries());
  return new Map(diffEntries.filter(function(_ref) {
    var _ref2 = _slicedToArray27(_ref, 2), value = _ref2[1];
    return value !== 0;
  }));
}
var Session = /* @__PURE__ */ function() {
  function Session2(meat, items, totalTurns) {
    _classCallCheck20(this, Session2), _defineProperty24(this, "meat", void 0), _defineProperty24(this, "items", void 0), _defineProperty24(this, "totalTurns", void 0), this.meat = meat, this.items = items, this.totalTurns = totalTurns;
  }
  return _createClass20(Session2, [{
    key: "register",
    value: function(target, quantity) {
      if (target === "meat")
        this.meat += quantity;
      else {
        var _this$items$get;
        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this session
     *
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */
  }, {
    key: "value",
    value: function(itemValue) {
      var turns2 = this.totalTurns, meat = Math.floor(this.meat), itemDetails = _toConsumableArray25(this.items.entries()).map(function(_ref3) {
        var _ref4 = _slicedToArray27(_ref3, 2), item14 = _ref4[0], quantity = _ref4[1];
        return {
          item: item14,
          quantity: quantity,
          // only run itemValue if quantity is nonzero
          value: quantity ? itemValue(item14) * quantity : 0
        };
      }), items = Math.floor(sum(itemDetails, "value"));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails,
        turns: turns2
      };
    }
    /**
     * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param other the session from which to pull values to remove from this session
     * @returns a new session representing the difference between this session and the other session
     */
  }, {
    key: "diff",
    value: function(other) {
      return new Session2(this.meat - other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a - b;
      }), this.totalTurns - other.totalTurns);
    }
    /**
     * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param a the session from which to subtract elements
     * @param b the session from which to add elements
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "add",
    value: (
      /**
       * Generate a new session combining multiple sessions together
       *
       * @param other the session from which to add elements to this set
       * @returns a new session representing the addition of other to this
       */
      function(other) {
        return new Session2(this.meat + other.meat, inventoryOperation(this.items, other.items, function(a, b) {
          return a + b;
        }), this.totalTurns + other.totalTurns);
      }
    )
    /**
     * Combine the contents of sessions
     *
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "toFile",
    value: (
      /**
       * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
       *
       * @param filename The file into which to export
       */
      function(filename) {
        var val = {
          meat: this.meat,
          items: Object.fromEntries(this.items),
          totalTurns: this.totalTurns
        };
        (0, import_kolmafia83.bufferToFile)(JSON.stringify(val), Session2.getFilepath(filename));
      }
    )
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     *
     * @param filename The file from which to import
     * @returns the session represented by the file
     */
  }, {
    key: "computeMPA",
    value: (
      /**
       * @param other the session to diff against this session when computing MPA
       * @param options options for computing MPA
       * @param options.value a function to compute the meat value of a given item
       * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
       * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
       * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
       * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
       * @returns an analysis of the effective MPA for the given session
       */
      function(other, options) {
        return Session2.computeMPA(this, other, options);
      }
    )
  }], [{
    key: "diff",
    value: function(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++)
        sessions[_key] = arguments[_key];
      return sessions.reduce(function(previousSession, currentSession) {
        return previousSession.add(currentSession);
      });
    }
  }, {
    key: "getFilepath",
    value: function(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0, import_kolmafia83.myName)(), "/").concat((0, import_kolmafia83.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function(filename) {
      var fileValue = (0, import_kolmafia83.fileToBuffer)(Session2.getFilepath(filename));
      if (fileValue.length > 0) {
        var _val$totalTurns, val = JSON.parse(fileValue), parsedItems = Object.entries(val.items).map(function(_ref5) {
          var _ref6 = _slicedToArray27(_ref5, 2), itemStr = _ref6[0], quantity = _ref6[1];
          return [(0, import_kolmafia83.toItem)(itemStr), quantity];
        });
        return new Session2(val.meat, new Map(parsedItems), (_val$totalTurns = val.totalTurns) !== null && _val$totalTurns !== void 0 ? _val$totalTurns : 0);
      } else
        return new Session2(0, /* @__PURE__ */ new Map(), 0);
    }
    /**
     * Return the meat and items for the current session
     *
     * @param sessionOnly should closet, DC, and storage be ignored for the session calculation
     * @returns current session
     */
  }, {
    key: "current",
    value: function() {
      var sessionOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, meat = sessionOnly ? [import_kolmafia83.mySessionMeat] : [import_kolmafia83.mySessionMeat, import_kolmafia83.myClosetMeat, import_kolmafia83.myStorageMeat];
      return new Session2(sum(meat, function(f) {
        return f();
      }), mySessionItemsWrapper(sessionOnly), (0, import_kolmafia83.totalTurnsPlayed)());
    }
    /**
     * @param baseline the base session to use when computing MPA
     * @param full the full session to use when computing MPA
     * @param options options for computing MPA
     * @param options.value a function to compute the meat value of a given item
     * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
     * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
     * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
     * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
     * @returns an analysis of the effective MPA for the given session
     */
  }, {
    key: "computeMPA",
    value: function(baseline, full, options) {
      var _options$excludeValue, _excludeValue$meat, _excludeValue$item, value = options.value, excludeValue = (_options$excludeValue = options.excludeValue) !== null && _options$excludeValue !== void 0 ? _options$excludeValue : {
        meat: 0,
        item: 0
      }, isOutlier = options.isOutlier, result = full.diff(baseline).value(value), meatValue = result.meat - ((_excludeValue$meat = excludeValue.meat) !== null && _excludeValue$meat !== void 0 ? _excludeValue$meat : 0), outlierItems = isOutlier ? result.itemDetails.filter(isOutlier) : [], outliersValue = sum(outlierItems, function(detail) {
        return detail.value;
      }), itemValue = result.items - outliersValue - ((_excludeValue$item = excludeValue.item) !== null && _excludeValue$item !== void 0 ? _excludeValue$item : 0), turns2 = result.turns;
      return {
        mpa: {
          effective: (meatValue + itemValue) / turns2,
          total: (meatValue + itemValue + outliersValue) / turns2,
          meat: meatValue / turns2,
          items: itemValue / turns2
        },
        values: {
          effective: meatValue + itemValue,
          total: meatValue + itemValue + outliersValue,
          meat: meatValue,
          items: itemValue
        },
        outlierItems: outlierItems,
        turns: turns2
      };
    }
  }]);
}();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bounties,
  $bounty,
  $class,
  $classes,
  $coinmaster,
  $coinmasters,
  $effect,
  $effects,
  $element,
  $elements,
  $familiar,
  $familiars,
  $item,
  $items,
  $location,
  $locations,
  $modifier,
  $modifiers,
  $monster,
  $monsters,
  $path,
  $paths,
  $phyla,
  $phylum,
  $servant,
  $servants,
  $skill,
  $skills,
  $slot,
  $slots,
  $stat,
  $stats,
  $thrall,
  $thralls,
  ActionSource,
  AprilingBandHelmet,
  AscendError,
  AscensionPrepError,
  AsdonMartin,
  AugustScepter,
  AutumnAton,
  Bandersnatch,
  BarrelShrine,
  BatWings,
  BeachComb,
  BurningLeaves,
  CampAway,
  Cartography,
  ChateauMantegna,
  ChestMimic,
  CinchoDeMayo,
  Clan,
  ClosedCircuitPayphone,
  CombatLoversLocket,
  CommaChameleon,
  CommunityService,
  ConspiracyIsland,
  Counter,
  CrimboShrub,
  CrownOfThrones,
  CrystalBall,
  CursedMonkeyPaw,
  DNALab,
  DaylightShavings,
  DeckOfEveryCard,
  Diet,
  Dinseylandfill,
  Dreadsylvania,
  Dungeon,
  EnsureError,
  Environment,
  EverfullDarts,
  FloristFriar,
  GingerBread,
  GreyGoose,
  Guzzlr,
  HeavyRains,
  Hobopolis,
  Horsery,
  InvalidMacroError,
  JuneCleaver,
  JungMan,
  Kmail,
  KolGender,
  KolmafiaVersionError,
  Latte,
  Lifestyle,
  LookingGlass,
  Macro,
  MagicalSausages,
  MayamCalendar,
  MayoClinic,
  MenuItem,
  Mood,
  MpSource,
  MummingTrunk,
  NuclearAutumn,
  ObtuseAngel,
  OscusSoda,
  Pantogram,
  PocketProfessor,
  PropertiesManager,
  RainDoh,
  RainDohBlackBox,
  ReagnimatedGnome,
  Requirement,
  RetroCape,
  Robortender,
  Session,
  SlimeTube,
  Snapper,
  SongBoom,
  SourceTerminal,
  Spacegate,
  SpookyPutty,
  SpookyPuttySheet,
  Stickers,
  StillSuit,
  StompingBoots,
  StrictMacro,
  TakerSpace,
  TearawayPants,
  TrainSet,
  TunnelOfLove,
  Wanderer,
  WinterGarden,
  Witchess,
  actionSourcesAvailable,
  adventureMacro,
  adventureMacroAuto,
  applyModes,
  arrayContains,
  arrayEquals,
  arrayToCountedMap,
  ascend,
  bestLibramToCast,
  booleanModifiers,
  booleanProperties,
  bulkAutosell,
  bulkPutCloset,
  bulkPutDisplay,
  bulkPutShop,
  bulkPutStash,
  bulkRepriceShop,
  bulkSell,
  bulkTakeCloset,
  bulkTakeDisplay,
  bulkTakeShop,
  bulkTakeStash,
  bulkTakeStorage,
  byClass,
  byStat,
  canRememberSong,
  canUse,
  canVisitUrl,
  chunk,
  clamp,
  clearMaximizerCache,
  console,
  couldUseRainDohBlackBox,
  couldUseSpookyPuttySheet,
  countedMapToArray,
  countedMapToString,
  damageTakenByElement,
  directlyUse,
  ensureBanish,
  ensureEffect,
  ensureFreeKill,
  ensureFreeRun,
  examine,
  expectedLibramSummon,
  extractItems,
  familiarProperties,
  familiarTags,
  findActionSource,
  findFairyMultiplier,
  findLeprechaunMultiplier,
  flat,
  freeCrafts,
  gameDay,
  get,
  getActiveEffects,
  getActiveSongs,
  getAverage,
  getAverageAdventures,
  getBanishedMonsters,
  getCombatFlags,
  getCurrentModes,
  getFamiliarTags,
  getFamiliarWandererChance,
  getFoldGroup,
  getKramcoWandererChance,
  getMacroId,
  getModifier,
  getMonsterLocations,
  getPlayerFromIdOrName,
  getPlayerIdFromName,
  getPlayerNameFromId,
  getRange,
  getRemainingLiver,
  getRemainingSpleen,
  getRemainingStomach,
  getSaleValue,
  getScalingCap,
  getScalingRate,
  getSongCount,
  getSongLimit,
  getTodaysHolidayWanderers,
  getTotalModifier,
  getTotalPuttyLikeCopiesMade,
  getWandererChance,
  getZapGroup,
  have,
  haveCounter,
  haveInCampground,
  haveIntrinsic,
  haveWandererCounter,
  holidayWanderers,
  invertMap,
  isBooleanProperty,
  isCurrentFamiliar,
  isFamiliarProperty,
  isLocationProperty,
  isMonsterProperty,
  isNumericOrStringProperty,
  isNumericProperty,
  isPhylumProperty,
  isSong,
  isStatProperty,
  isStringProperty,
  isVoteWandererNow,
  isWandererNow,
  lgrCurrencies,
  locationProperties,
  logger,
  makeByXFunction,
  maxBy,
  maximizeCached,
  mergeMaximizeOptions,
  modeableItems,
  modeableState,
  monsterProperties,
  multiSplit,
  noneToNull,
  notNull,
  notNullish,
  numericModifiers,
  numericOrStringProperties,
  numericProperties,
  parseNumber,
  permedSkills,
  phylumProperties,
  possibleLibramSummons,
  prepareAscension,
  property,
  propertyTypes,
  questStep,
  random,
  realmAvailable,
  realmCurrency,
  realmTypes,
  set,
  setCombatFlags,
  setDefaultMaximizeOptions,
  setEqual,
  setProperties,
  signIdToName,
  signNameToId,
  sinceKolmafiaRevision,
  sinceKolmafiaVersion,
  splitByCommasWithEscapes,
  statProperties,
  stringModifiers,
  stringProperties,
  sum,
  sumNumbers,
  tc,
  telescope,
  totalFamiliarWeight,
  tryFindBanish,
  tryFindFreeKill,
  tryFindFreeRun,
  tuple,
  undelay,
  uneffect,
  unequip,
  withBatch,
  withChoice,
  withChoices,
  withCombatFlags,
  withProperties,
  withProperty
});
