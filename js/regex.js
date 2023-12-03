// Regex:
// /.../    = scope dari regex
// /^       = parameter karakter pertama
// $/       = parameter karakter terakhir
// []       = scope karakter
// [^...]   = scope untuk mengecualikan karakter
// -        = untuk range/interval karakter
// \s       = parameter white space
// /.../g   = global, parameter untuk mencocokkan keseluruhan string
// /.../i   = case-insensitive, parameter untuk mengabaikan huruf besar atau kecil

function checkName(input) {
    // ^[^\s]       = karakter pertama tidak boleh white space
    // [a-z0-9\s]*  = karakter berikutnya harus huruf atau angka dan boleh mengandung white space
    // [^\s]$       = karakter terakhir tidak boleh white space
    let regex = /^[^\s][a-z0-9\s]*[^\s]$/gi;
    return input.match(regex);
}

function checkAddress(input) {
    // ^[^\s]       = karakter pertama tidak boleh white space
    // [a-z0-9\s/"':._,()#&-]*  = karakter berikutnya berupa huruf atau angka, serta boleh mengandung white space dan simbol (/"':._,()#&-)
    // [^\s]$       = karakter terakhir tidak boleh white space
    let regex = /^[^\s][a-z0-9\s/"':._,()#&-]*[^\s]$/gi;
    return input.match(regex);
}

function checkPhone(input) {
    // ^([0-9]*)$   = karakter harus berupa angka, serta tidak boleh mengandung white space
    let regex = /^([0-9]*)$/g;
    return input.match(regex);
}

function checkSymbol(input) {
    // [^a-z0-9\s]  = karakter harus berupa huruf atau angka, serta tidak boleh mengandung white space
    let regex = /[^a-z0-9\s]/gi;
    return input.match(regex);
}

function checkWhiteSpace(input) {
    // [\s]         = check semua white space di dalam suatu string
    let regex = /[\s]/g;
    return input.match(regex);
}

function checkNumber(input) {
    // [0-9]        = check semua angka di dalam suatu string
    let regex = /[0-9]/g;
    return input.match(regex);
}

function checkString(input) {
    // [0-9]        = check semua angka di dalam suatu string
    let regex = /[a-z]/gi;
    return input.match(regex);
}

function checkEmail(email) {
    // ^[^\s]       = karakter pertama tidak boleh white space
    // ^[a-z0-9.]+  = karakter pertama harus diawali dengan angka atau huruf atau tanda titik (.)
    // @            = karakter berikutnya harus simbol @
    // [a-z.]+      = karakter berikutnya harus berupa huruf
    // \.           = karakter berikutnya adalah tanda titik (.)
    // [a-z]{2,3}$  = karakter terakhir harus berupa huruf dengan minimal 2 dan maksimal 3
    let regex = /^[^\s][a-z0-9.]+@[a-z.]+\.[a-z]{2,3}$/gi;
    return email.match(regex);
}
