import 'package:flutter/material.dart';

class ToolTipDemo extends StatelessWidget {
  const ToolTipDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Tooltip(
        message: "Don't touch me!",
        child: Image.network(
          'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0901%2F5b48601dj00qyqv0d004uc000go00yjc.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
          scale: 1.0,
          width: 422,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
