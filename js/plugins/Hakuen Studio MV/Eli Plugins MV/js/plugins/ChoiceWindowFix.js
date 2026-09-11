{

    const Window_ChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows
    Window_ChoiceList.prototype.numVisibleRows = function() {
        if(this._messageWindow && this._messageWindow.isOpen()){
            return Window_ChoiceList_numVisibleRows.call(this)
        }else{
            return $gameMessage.choices().length
        }
    }

    const Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement
    Window_ChoiceList.prototype.updatePlacement = function() {
        if(this._messageWindow && this._messageWindow.isOpen()){
            Window_ChoiceList_updatePlacement.call(this)
        }else{
            var positionType = $gameMessage.choicePositionType();
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            switch (positionType) {
            case 0:
                this.x = 0;
                break;
            case 1:
                this.x = (Graphics.boxWidth - this.width) / 2;
                break;
            case 2:
                this.x = Graphics.boxWidth - this.width;
                break;
            }
            this.y = (Graphics.boxHeight - this.height)/2
        }
        
    }
    
}