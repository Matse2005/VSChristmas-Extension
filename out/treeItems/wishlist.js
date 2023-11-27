"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cwt = void 0;
const vscode = __importStar(require("vscode"));
// lets put all in a cwt namespace
var cwt;
(function (cwt) {
    // this represents an item and it's children (like nested items)
    // we implement the item later
    class tree_item extends vscode.TreeItem {
        children;
    }
    // tree_view will created in our entry point
    class tree_view {
        // will hold our tree view data
        m_data = [];
        // in the constructor we register a refresh and item clicked function
        constructor() {
            vscode.commands.registerCommand('cwt_cucumber_view.item_clicked', r => this.item_clicked(r));
            vscode.commands.registerCommand('cwt_cucumber_view.refresh', () => this.refresh());
        }
        item_clicked(item) {
            // this will be executed when we click an item
        }
        refresh() {
            // this will be clicked when we refresh the view
        }
        getTreeItem(element) {
            // we need to provide getTreeItem
        }
        getChildren(element) {
            // same for getChildren
        }
    }
    cwt.tree_view = tree_view;
})(cwt || (exports.cwt = cwt = {}));
//# sourceMappingURL=wishlist.js.map