
// O(d) time | O(1) space 
function younngestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
    let depthOne = getDepth(topAncestor, descendantOne);
    let depthTwo = getDepth(topAncestor, descendantTwo);
    if (depthOne > depthTwo) {
        return backTrackAncestral(descendantOne, descendantTwo, depthOne - depthTwo)
    } else {
        return backTrackAncestral(descendantOne, descendantTwo, depthTwo - depthOne)
    }
}

function getDepth(topAncestor, descendant) {
    let depth = 0
    while (topAncestor != descendant) {
        descendant = descendant.ancestor
        depth++;
    }
    return depth
}

function backTrackAncestral(lowerDescendant, higherDescendant, diff) {
    while (diff > 0) {
        lowerDescendant = lowerDescendant.ancestor;
        diff--
    }
    while (lowDescendant != higherDescendant) {
        lowerDescendant = lowerDescendant.ancestor
        higherDescendant = higherDescendant.ancestor
    }
    return lowerDescendant
}

