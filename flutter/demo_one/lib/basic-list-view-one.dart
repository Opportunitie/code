import "package:flutter/material.dart";

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "ListView Widger",
        home: Scaffold(
          appBar: AppBar(title: const Text('ListView Widget')),
          body: ListView(
            children: <Widget>[
              const ListTile(
                leading: Icon(Icons.perm_camera_mic),
                title: Text('perm_camera_mic'),
              ),
              const ListTile(
                leading: Icon(Icons.add_call),
                title: Text('perm_camera_mic'),
              ),
              const ListTile(
                leading: Icon(Icons.access_time),
                title: Text('perm_camera_mic'),
              ),
              Image.network(
                  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F945cad7c7105d352aa3c513c94846bb0c2f1a61342067-OWFZcE_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639213461&t=65af5e105c83b678a93f2f7bdb6bb662'),
              Image.network(
                  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F945cad7c7105d352aa3c513c94846bb0c2f1a61342067-OWFZcE_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639213461&t=65af5e105c83b678a93f2f7bdb6bb662'),
              Image.network(
                  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F945cad7c7105d352aa3c513c94846bb0c2f1a61342067-OWFZcE_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639213461&t=65af5e105c83b678a93f2f7bdb6bb662'),
            ],
          ),
        ));
  }
}