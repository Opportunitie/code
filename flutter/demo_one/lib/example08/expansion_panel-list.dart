import 'package:flutter/material.dart';

class ExpansionPanleListDemo extends StatefulWidget {
  const ExpansionPanleListDemo({Key? key}) : super(key: key);

  @override
  _ExpansionPanleListDemoState createState() => _ExpansionPanleListDemoState();
}

class _ExpansionPanleListDemoState extends State<ExpansionPanleListDemo> {
  List<int> mList = [];
  List<ExpandStateBean> expandStateList = [];

  _ExpansionPanleListDemoState() {
    for (int i = 0; i < 10; i++) {
      mList.add(i);
      expandStateList.add(ExpandStateBean(i, false));
    }
  }

  _setCurrentIndex(int index, isExpand) {
    setState(() {
      expandStateList.forEach((item) {
        if (item.index == index) {
          item.isOpen = !isExpand;
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("ExpandTileList"),
      ),
      // ExpansionPanleList一定要放到可滑动的控件中
      body: SingleChildScrollView(
        child: ExpansionPanelList(
          expansionCallback: (panelIndex, isExpanded) =>
              {_setCurrentIndex(panelIndex, isExpanded)},
          children: mList
              .map(
                (index) => ExpansionPanel(
                    headerBuilder: (context, isExpanded) {
                      return ListTile(
                        title: Text("This is No $index"),
                      );
                    },
                    body: ListTile(
                      title: Text("expansion no.$index"),
                    ),
                    isExpanded: expandStateList[index].isOpen),
              )
              .toList(),
        ),
      ),
    );
  }
}

class ExpandStateBean {
  var isOpen = false;
  var index = 0;
  ExpandStateBean(this.index, this.isOpen);
}
