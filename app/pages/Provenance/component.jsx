import React from 'react';

import { Grid, Row, Col, Panel, Tab, Tabs } from 'react-bootstrap';

import DAGView from './dagContainer';
import SelectionView from './selectionContainer';
import Citations from './citations';


const Pane = ({ children }) => (
    <div style={{ height: '100%', overflow: 'auto', position: 'relative' }}>
        { children }
    </div>
);


class CytoTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = { key: 1 };
        this.cyNode = null;
    }

    handleSelect(key) {
        this.setState({ key });
        if (this.cyNode !== null) {
            window.setTimeout(() => this.cyNode.getWrappedInstance().cy.resize(), 50);
        }
    }

    render() {
        return (
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="proveanance"
                animation={false}
            >
                <Tab eventKey={1} title="Provenance Graph">
                    <DAGView ref={(node) => { this.cyNode = node; }} />
                </Tab>
                <Tab eventKey={2} title="Citations">
                    <Citations />
                </Tab>
            </Tabs>
        );
    }
}

export default ({ viewTitle }) => (
    <Grid>
        <Row style={{ marginTop: '30px' }}>
            <Col md={7}>
                <CytoTabs />
            </Col>
            <Col md={5}>
                <Panel header={(<h3>{ viewTitle }</h3>)}>
                    <Pane><SelectionView /></Pane>
                </Panel>
            </Col>
        </Row>
    </Grid>
);
