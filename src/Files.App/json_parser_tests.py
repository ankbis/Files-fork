import unittest
from json_parser import JsonParser


class JsonParserTests(unittest.TestCase):
    def setUp(self):
        self.parser = JsonParser()

    def test_parse_valid_json(self):
        json_string = '{"name": "John", "age": 30, "isStudent": true, "scores": [80, 90, 85]}'
        expected_output = {"name": "John", "age": 30, "isStudent": True, "scores": [80, 90, 85]}
        self.assertEqual(self.parser.parse(json_string), expected_output)

    def test_parse_invalid_json(self):
        invalid_json_string = '{"name": "John", "age": 30, "isStudent": true, "scores": [80, 90, 85]'
        with self.assertRaises(ValueError):
            self.parser.parse(invalid_json_string)

    def test_serialize_valid_data(self):
        data = {"name": "John", "age": 30, "isStudent": True, "scores": [80, 90, 85]}
        expected_output = '{"name": "John", "age": 30, "isStudent": true, "scores": [80, 90, 85]}'
        self.assertEqual(self.parser.serialize(data), expected_output)

    def test_serialize_invalid_data(self):
        invalid_data = JsonParser()
        with self.assertRaises(ValueError):
            self.parser.serialize(invalid_data)


if __name__ == '__main__':
    unittest.main()

