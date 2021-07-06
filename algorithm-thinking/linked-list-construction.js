//
//
class linkedListConstruction{
    constructor(){
        this.head = null
        this.tail = null
    }
    setHead(self,node){

    }
    setTail(self,node){

    }
    indertBefore(self,node,nodeToInsert){
        
    }
    indertAfter(self,node,nodeToInsert){

    }
    indertAtPosition(self,position,nodeToInsert){

    }
    removeNodesWithValue(self,value){

    }
    remove(self,node){

    }

    containsNodeWithValue(self,value){
        node = self.head
        if(node && node.value !== value){
            node = node.next
        }
        return !!node
    }

}