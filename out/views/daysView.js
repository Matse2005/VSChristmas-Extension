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
exports.DaysView = void 0;
const vscode = __importStar(require("vscode"));
class DaysView {
    constructor(context, daysLeft) {
        const view = vscode.window.createTreeView('daysUntilChristmas', { treeDataProvider: aNodeWithIdTreeDataProvider(), showCollapseAll: true });
        context.subscriptions.push(view);
        vscode.commands.registerCommand('daysUntilChristmas.reveal', async () => {
            const key = await vscode.window.showInputBox({ placeHolder: 'Type the label of the item to reveal' });
            if (key) {
                await view.reveal({ key }, { focus: true, select: false, expand: true });
            }
        });
        vscode.commands.registerCommand('daysUntilChristmas.changeTitle', async () => {
            const title = await vscode.window.showInputBox({ prompt: 'Type the new title for the Test View', placeHolder: view.title });
            if (title) {
                view.title = title;
            }
        });
    }
}
exports.DaysView = DaysView;
const tree = {
    '': {}
};
const nodes = {};
function aNodeWithIdTreeDataProvider() {
    return {
        getChildren: (element) => {
            return getChildren(element ? element.key : undefined).map(key => getNode(key));
        },
        getTreeItem: (element) => {
            const treeItem = getTreeItem(element.key);
            treeItem.id = element.key;
            return treeItem;
        },
        getParent: ({ key }) => {
            const parentKey = key.substring(0, key.length - 1);
            return parentKey ? new Key(parentKey) : undefined;
        }
    };
}
function getChildren(key) {
    if (!key) {
        return Object.keys(tree);
    }
    const treeElement = getTreeElement(key);
    if (treeElement) {
        return Object.keys(treeElement);
    }
    return [];
}
function getTreeItem(key) {
    const treeElement = getTreeElement(key);
    // An example of how to use codicons in a MarkdownString in a tree item tooltip.
    const tooltip = new vscode.MarkdownString(`$(hat-santa) Tooltip for ${key}`, true);
    return {
        label: /**vscode.TreeItemLabel**/ { label: key, highlights: key.length > 1 ? [[key.length - 2, key.length - 1]] : void 0 },
        tooltip,
        collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
    };
}
function getTreeElement(element) {
    let parent = tree;
    for (let i = 0; i < element.length; i++) {
        parent = parent[element.substring(0, i + 1)];
        if (!parent) {
            return null;
        }
    }
    return parent;
}
function getNode(key) {
    if (!nodes[key]) {
        nodes[key] = new Key(key);
    }
    return nodes[key];
}
class Key {
    key;
    constructor(key) {
        this.key = key;
    }
}
//# sourceMappingURL=daysView.js.map