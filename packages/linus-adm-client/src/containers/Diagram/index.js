import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/diagramActions';
import {getActiveDialogs, getActiveRules, getRemovedNodes, getUpdatedNodes} from '../../reducers'

import _ from 'lodash';
import _random from 'lodash/random';
import _bindAll from 'lodash/bindAll';
import * as RJD from 'storm-react-diagrams';
import * as Dialog from '../../components/DiagramElements/DialogNode';
import * as Rule from '../../components/DiagramElements/RuleNode';
import {Dimmer, Loader} from 'semantic-ui-react';
import LinkFactoryExt from '../../components/DiagramElements/Extension/LinkFactoryExt';
import LinkModelExt from '../../components/DiagramElements/Extension/LinkModelExt';
import DiagramWidgetExt from '../../components/DiagramElements/Extension/DiagramWidgetExt';
import Alert from 'react-s-alert';
import {Container, Button, Modal, Header, Icon, Message} from 'semantic-ui-react';
import ModalDialog from '../../components/Dialog/ModalDialog.js';
import ModalRule from '../../components/Rule/ModalRule.js';
import './style.css';

class Diagram extends Component {
  static defaultColors = {
    'actionOut': 'rgba(0,0,0,0.3)',
    'dialog': '#0CC4AF'
  };

  constructor(props) {
    super(props);
    this.state = {
      'botId': null,
      'dialogs': null,
      'rules': null,
      'diagramProcess': null,
      'postProcess': null,
      'modalDeleteOpen': false,
      'dialogEdit': undefined,
      'ruleEdit': undefined,
    };
    // this.onEditDialog = props.onEditDialog;
    // this.onEditRule = props.onEditRule;
    this.window = window;
    this.pendingDelete = {dialogs: [], rules: []};

    this.defaultDiagramZoom = 100;
    this._setupDiagram();
    //lazy build in method _buildDiagramModel;
    this.dialogEntryIndex = {};
    this.ruleEntryIndex = {};

    _bindAll(this, ['_loadBotNodes', '_handleClickSalvar', 'getDiagramCenter',
      '_handleConfirmDelete', 'renderDiagram', '_buidDialogNodes', '_handleClickAddDialog',
      'onEditDialog', 'onCloseEditDialog', 'onEditRule', 'onCloseEditRule', '_handleChange',
      'handleActionStoppedFiring'
    ]);
  }

  _setupDiagram() {
    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine();
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory());
    this.engine.registerNodeFactory(new Dialog.DialogNodeFactory());
    this.engine.registerNodeFactory(new Rule.RuleNodeFactory());
    // this.engine.registerLinkFactory(new RJD.DefaultLinkFactory());
    this.engine.registerLinkFactory(new LinkFactoryExt());
    this.engine.addListener(
      {repaintCanvas:()=>console.log('repaintCanvas')}
    )

    //setup diagram model
    this.model = new RJD.DiagramModel();
    this.model.setZoomLevel(this.defaultDiagramZoom);

    this.model.addListener({
      actionStoppedFiring: () => {
        console.log('actionStoppedFiring')
      },
    });


    //build event function map
    this.eventMap = {
      'items-moved': this._handleChangeItemsMoved,
      'node-moved': this._handleChangeNodeMoved,
      'items-drag-selected': () => console.log('Diagram::event.items-drag-selected called'),
      'items-deleted': this._handleDeleteItems,
      'canvas-drag': () => {
      },
      'canvas-click': (data, e) => {
        console.log(data, e.event.clientX)
      },
      '__default': (model, action) => console.trace('Atenção! Nennhum handler para evento encontrado em "' + action.type + '".')
      // '__default':(a)=>(a),
    };
  }

  onEditRule(rule) {
    this.setState({'ruleEdit': rule});
  }

  onCloseEditRule() {
    this.setState({'ruleEdit': undefined});
  }

  onEditDialog(dialog) {
    this.setState({'dialogEdit': dialog});
  }

  onCloseEditDialog() {
    this.setState({'dialogEdit': undefined});
  }

  componentDidMount() {
    this._loadBotNodes();
  }

  componentWillUpdate() {
    const {offsetX, offsetY, zoom} = this.model;
    // console.log(this.model);
    this.model = new RJD.DiagramModel();

    this.model.setOffset(offsetX, offsetY);
    this.model.setZoomLevel(zoom);
  };

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.savedTime !== prevState.savedTime) {
    //   if (this.state.postProcess === DiagramStore.POST_PROCESS.ERROR) {
    //     Alert.error('Ocorreu um erro ao salvar as alterações. Tente novamente!', {
    //       position: 'top-right',
    //       effect: 'slide'
    //     });
    //   } else if (this.state.postProcess === DiagramStore.POST_PROCESS.SUCCESS) {
    //     Alert.success('Alteração salva com sucesso!', {
    //       position: 'top-right',
    //       effect: 'slide'
    //     });
    //   }
    //   // DiagramActions.setPostProcess(DiagramStore.PROCESS.IDLE); não precisa
    // }
    // if (this.props.botId !== prevProps.botId){
    //   this._loadBotNodes();
    // }
  }

  _loadBotNodes() {
    // const {botId} = this.props;
    // console.log('Diagram:::',this.props.match.params.botId);
    this.props.getAllNodes(this.props.match.params.botId);

    // DiagramActions.setActiveBot(botId);
    // DiagramActions.loadNodes(botId);
  }

  getDiagramCenter() {
    let windowCenter = {'x': this.window.innerWidth / 2, 'y': this.window.innerHeight / 2};
    let diagram = this.engine.diagramModel;
    return {'x': windowCenter.x - diagram.offsetX, 'y': windowCenter.y - diagram.offsetY};
  }

  _handleDeleteItems(diagram, event) {
    // console.log("_handleDeleteItems::items=", event.items);
    let rules = event.items
      .filter((i) => i.nodeType === 'rule')
      .map((i) => i.source);
    // console.log("_handleDeleteItems::rule=", rules);
    let dialogs = event.items
      .filter((i) => i.nodeType === 'dialog')
      .map((i) => i.source);
    this.pendingDelete = {rules, dialogs};
    this.setState({'modalDeleteOpen': true});
  };

  _handleConfirmDelete() {
    // console.lo
    this.setState({'modalDeleteOpen': false},
      () => {
        if (this.pendingDelete.rules) {
          this.props.removeRules(this.pendingDelete.rules);
          // DiagramActions.deleteRules(this.pendingDelete.rules)
        }
        if (this.pendingDelete.dialogs) {
          this.props.removeDialogs(this.pendingDelete.dialogs);
          // DiagramActions.deleteDialogs(this.pendingDelete.dialogs)
        }
      });
  };

  _handleCancelDelete() {
    this.setState({'modalDeleteOpen': false});
  };

  _handleClickSalvar() {
    // console.log('Diagram.js::_handleClickSalvar: init..');
    const {toPersist, toRemove, botId} = this.props;
    this.props.saveAndReloadDiagram({toPersist, toRemove, botId});
  };

  _handleClickAddDialog() {
    let center = this.getDiagramCenter();
    const {botId} = this.props;
    this.props.createDialog({botId, x: center.x + _random(0, 150), 'y': center.y + _.random(0, 150)});
  }

  _handleClickAddRule() {
    const {botId} = this.props;
    let center = this.getDiagramCenter();
    this.props.createRule({botId, x: center.x + _random(0, 150), 'y': center.y + _.random(0, 150)});
  }

  _handleChange(model, action) {
    console.log({model, action});
    (this.eventMap[action.type] || this.eventMap['__default']).call(this, model, action);
  }

  _handleChangeItemsMoved(model, action) {
    let changed = {
      'dialog': [],
      'rule': []
    };
    action.items.forEach((item) => {
      let nodeType = item.nodeType;
      let el = item.source;
      el.meta.x = item.x;
      el.meta.y = item.y;
      changed[nodeType].push(el);
    });

    this.props.updateDialogs(changed['dialog']);
    this.props.updateRules(changed['rule']);
  }


  _handleChangeNodeMoved(model, action) {
    console.log('_handleChangeNodeMoved', {model, action});
    let {source, nodeType, x, y} = action.model;
    source.meta.x = x;
    source.meta.y = y;
    let funcMap = {
      'dialog': this.props.updateDialogs,
      'rule': this.props.updateRules
    };

    funcMap[nodeType]([source]);

  }

  _addPort(node, options) {
    const {isInput, id, name} = options;
    return node.addPort(new RJD.DefaultPortModel(isInput, id, name));
  }

  _curryEditDialog(dialog) {
    return () => {
      // console.log(this.diagramWidget);
      // this.diagramWidget.selectAll(false);
      this.onEditDialog(dialog)
    };
  }

  _curryEditRule(rule) {
    return () => {
      // console.log(this.diagramWidget);
      // this.diagramWidget.selectAll(false);
      this.onEditRule(rule)
    };
  }

  _buidDialogNodes() {
    let dialogEntryIndex = {};
    let defaultColor = Diagram.defaultColors.dialog;
    let dialogEntryArr = this.props.dialogs.map((dialog) => {
      let node = new Dialog.DialogNodeModel(dialog.id, (dialog.meta.color || defaultColor), this._curryEditDialog(dialog));
      node.x = dialog.meta.x;
      node.y = dialog.meta.y;
      node.source = dialog;

      let inPort = this._addPort(node, {
        isInput: true,
        id: "IN_" + dialog.id,
        name: 'In'
      });
      let outPort = this._addPort(node, {
        isInput: false,
        id: "OUT_" + dialog.id,
        name: 'Out'
      });
      let obj = {id: dialog.id, node, inPort, outPort, dialog};
      dialogEntryIndex[obj.id] = obj;

      node.addListener({
        // selectionChanged: (node, isSelected) => {
        //   console.info('selectionChanged', node);
        //   console.info('isSelected', isSelected);
        // },
        lockChanged:()=>{console.log('lockChanged')},
        entityRemoved:(node) => {
          console.info('entityRemoved', node);
        },
      });
      return obj;
    });
    return {dialogEntryIndex, dialogEntryArr};
  };

  _buildRulesNodes() {
    let ruleEntryIndex = {};
    let defaultColor = Diagram.defaultColors.dialog;
    let ruleEntryArr = this.props.rules.map((rule) => {
      let nodeColor = defaultColor;
      let dialogEntry = this._getDialogEntryById(rule.dialog);
      // if(!dialogEntry) throw new Error("dialog entry not found:"+rule.dialog);
      if (dialogEntry) nodeColor = (dialogEntry.dialog.meta.color || defaultColor);
      let node = new Rule.RuleNodeModel(rule.id, nodeColor, this._curryEditRule(rule));
      node.x = rule.meta.x;
      node.y = rule.meta.y;
      node.source = rule;

      let __error = (!dialogEntry);
      let inPort = node.addPort(new Rule.RulePortModel(true, 'IN_' + rule.id, 'In', __error));
      let outPorts = (!rule.actions ? [] : rule.actions.map((action, ind) => {
          let __error = false;
          if (action.goToDialog) {
            let actionDialogEntry = this._getDialogEntryById(action.goToDialog);
            __error = (!actionDialogEntry);
          }
          return node.addPort(new Rule.RulePortModel(false, 'OUT_' + rule.id + "_" + ind, `Action [${ind}]`, __error));
        })
      );
      let obj = {id: rule.id, outPorts, inPort, node, rule};
      ruleEntryIndex[obj.id] = obj;
      return obj;
    });
    return {ruleEntryIndex, ruleEntryArr};
  };

  _linkNodes(port1, port2, color) {
    const link = new LinkModelExt();
    link.setSourcePort(port1);
    link.setTargetPort(port2);
    link.setColor(color || "#000");
    return link;
  }

  _buildLinks({model, ruleEntryArr}) {
    ruleEntryArr.forEach((re) => {
      if (re.rule.actions) {
        //montar links das actions para os dialogos
        re.rule.actions.forEach((a, i) => {
          if (a.goToDialog) {
            let dialogEntry = this._getDialogEntryById(a.goToDialog);
            // if(!dialogEntry) throw new Error("dialogo destino não existente: "+a.goToDialog+"@"+re.rule.id+".actions["+i+"]");
            if (!dialogEntry) {
              a.__error = true;
              console.warn("Target dialog does not exists: " + a.goToDialog + "@" + re.rule.id + ".actions[" + i + "]");
            } else {
              //montar link
              model.addLink(this._linkNodes(re.outPorts[i], dialogEntry.inPort, (dialogEntry.dialog.meta.color || Diagram.defaultColors.dialog)))
            }

          }
        });

        let dialogEntry = this._getDialogEntryById(re.rule.dialog);
        // if(!dialogEntry) throw new Error("dialogo origem não existente: "+re.rule.dialog+"@"+re.rule.id);
        if (!dialogEntry) {
          re.rule._error = true;
          console.warn("Source dialog does not exists: " + re.rule.dialog + "@" + re.rule.id, re, this.dialogEntryIndex);
        } else {
          //montar link dos dialogos para as regras
          model.addLink(this._linkNodes(dialogEntry.outPort, re.inPort, (dialogEntry.dialog.meta.color || Diagram.defaultColors.dialog)))
        }

      }
    });
  }

  _getDialogEntryById(id) {
    return this.dialogEntryIndex[id];
  }

  _getRuleEntryById(id) {
    return this.ruleEntryIndex[id];
  }

  _buildDiagramModel() {
    const {engine, model} = this;
    //build dialogs
    let {dialogEntryIndex, dialogEntryArr} = this._buidDialogNodes();
    this.dialogEntryIndex = dialogEntryIndex;

    //build rules
    let {ruleEntryIndex, ruleEntryArr} = this._buildRulesNodes();
    this.ruleEntryIndex = ruleEntryIndex;

    //insert dialog nodes in model
    dialogEntryArr.forEach((e) => model.addNode(e.node));
    //inser rules node in model
    ruleEntryArr.forEach((e) => model.addNode(e.node));
    this._buildLinks({model, ruleEntryArr});

    engine.setDiagramModel(model);
  };

  renderLoading() {
    return (
      <div>
        <Dimmer active inverted>
          <Loader inverted>carregando</Loader>
        </Dimmer>
      </div>
    );
  }

  renderError() {
    return (
      <div className="alert-login">
        <Message negative as='h2' icon textAlign='center'>
          <Icon name='warning' circular/>
          <Header.Content>
            <h2>Ocorreu um erro ao carregar:</h2>
            {this.props.lastFetchingMessage}
          </Header.Content>
        </Message>
      </div>
    )
  }

  handleActionStoppedFiring(action,evt){
    if(!evt) return;
    const nameClick = (evt.target.dataset.role==='node-name');
    console.log({action,target:evt.target, role:evt.target.dataset.role,nameClick});


    if(action instanceof RJD.MoveItemsAction){
      if(!nameClick){
        console.log('NOT NAME CLICK!!!');
        const models = action.selectionModels.map((e)=>e.model);
        const dialogs = models.filter((e)=>e.nodeType==='dialog').map((e)=>({...e.source,meta:{...e.source.meta,x:e.x,y:e.y}}));
        const rules = models.filter((e)=>e.nodeType==='rule').map((e)=>({...e.source,meta:{...e.source.meta,x:e.x,y:e.y}}));
        this.props.updateRules(rules);
        this.props.updateDialogs(dialogs);
      }else{
        console.log('NAME CLICK!!!');
        const models = action.selectionModels.map((e)=>e.model);
        const node = models.find((e)=>(e.nodeType==='dialog'||e.nodeType==='rule'));
        if(node){
          ({
            'dialog':this.onEditDialog,
            'rule':this.onEditRule
          }[node.nodeType])(node.source);
        }
      }
    }
  }

  renderDiagram() {
    const {engine} = this;
    this._buildDiagramModel();
    return (
      <div className="diagram-container">
        <DiagramWidgetExt
          ref={(e) => this.diagramWidget = e}
          diagramEngine={engine}
          actions={{
            copy: false,
            paste: false
          }}
          actionStoppedFiring={this.handleActionStoppedFiring}
          />
      </div>
    )
  }

  render() {
    const {botId, isFetching, lastFetchingStatus, isSaving, dialogs, rules} = this.props;

    const {dialogEdit, ruleEdit} = this.state;

    if (isFetching) {
      return this.renderLoading();
    } else if (lastFetchingStatus === 'error') {
      return this.renderError();
    } else {
      return (<Container className='diagram'>
        <Alert stack={{limit: 3, spacing: 50}} timeout={5000}/>
        {this.renderDiagram()}
        <div className="float-actions">
          <Button circular
                  color='blue'
                  content='+D'
                  onClick={this._handleClickAddDialog.bind(this)}
          />
          <Button circular
                  color='violet'
                  content='+R'
                  onClick={this._handleClickAddRule.bind(this)}
          />
          <Button circular
                  className={(isSaving ? 'loading' : '')}
                  color='green'
                  icon='save'
                  onClick={this._handleClickSalvar}
          />
        </div>

        <Modal open={this.state.modalDeleteOpen} basic size='small'>
          <Header icon='trash' content='Excluir elementos'/>
          <Modal.Content>
            <p>Tem certeza que deseja remover estes elementos?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted onClick={this._handleCancelDelete.bind(this)}>
              <Icon name='remove'/> Cancelar
            </Button>
            <Button color='red' inverted onClick={this._handleConfirmDelete.bind(this)}>
              <Icon name='trash'/> Remover
            </Button>
          </Modal.Actions>
        </Modal>

        {dialogEdit
          ? <ModalDialog
            activeDialog={dialogEdit}
            onClose={this.onCloseEditDialog}
            onSave={this.props.updateDialogs}
          />
          : null}

        {ruleEdit
          ? <ModalRule
            activeRule={ruleEdit}
            onClose={this.onCloseEditRule}
            onSave={this.props.updateRules}/>
          : null}
      </Container>);
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state.diagram,
    rules: getActiveRules(state),
    dialogs: getActiveDialogs(state),
    toPersist: getUpdatedNodes(state),
    toRemove: getRemovedNodes(state),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
