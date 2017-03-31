/**
 * Extends target with source, ovverriding identical keys of source with target
 */
function objectExtend(target, source) {
    var extended = target;
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            extended[key] = source[key];
        }                
    }
    return extended;
}

/**
 * Extends target with source, preserving identical keys contents from both
 */
function objectExtendSoft(target, source) {
    var extended = target;
    for (var key in source) {
        // avoid same key override (preserve mode)
        if (extended.hasOwnProperty(key)) {
            extended[key] = objectExtendSoft(extended[key], source[key]);
        } else {
            // add key to extended
            if (source.hasOwnProperty(key)) {
                extended[key] = source[key];
            }
        }                
    }
    return extended;
}

module.exports.objectExtend = objectExtend;
module.exports.objectExtendSoft = objectExtendSoft;