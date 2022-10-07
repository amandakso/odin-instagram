export default function alphabetizeUsernames(arr) {
    arr = arr.sort(
        (a, b) => a.displayName.localeCompare(b.displayName),
    );
    return arr;
};