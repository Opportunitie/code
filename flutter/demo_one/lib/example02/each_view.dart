import 'package:flutter/material.dart';

class EachView extends StatefulWidget {
  String title;
  EachView(this.title, {Key? key}) : super(key: key);
  @override
  _EachViewState createState() => _EachViewState();
}

class _EachViewState extends State<EachView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text(widget.title),
      // ),
      body: Center(
        child: Text(widget.title),
      ),
    );
  }
}
