import json


class JsonParser:
    def parse(self, json_string: str) -> dict:
        try:
            return json.loads(json_string)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON string: {e}")

    def serialize(self, data: dict) -> str:
        try:
            return json.dumps(data)
        except TypeError as e:
            raise ValueError(f"Invalid data for serialization: {e}")


