#!/usr/bin/env python3
"""
Script to expand nutrition_100g JSON column into separate columns.
Each key in the nutrition_100g JSON object becomes its own column.
"""

import csv
import json
import sys
from collections import OrderedDict
from pathlib import Path


def expand_nutrition_columns(input_file, output_file=None):
    """
    Expand nutrition_100g JSON column into separate columns.

    Args:
        input_file: Path to input TSV file
        output_file: Path to output TSV file (default: input_file with '_expanded' suffix)
    """
    input_path = Path(input_file)

    if not input_path.exists():
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    if output_file is None:
        # Create output filename by adding '_expanded' before extension
        output_path = input_path.parent / \
            f"{input_path.stem}_expanded{input_path.suffix}"
    else:
        output_path = Path(output_file)

    print(f"Reading from: {input_path}")
    print(f"Writing to: {output_path}")

    # First pass: collect all nutrition keys to determine all columns
    print("Scanning nutrition keys...")
    nutrition_keys = set()
    rows_processed = 0

    with open(input_path, 'r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile, delimiter='\t')

        for row in reader:
            rows_processed += 1
            nutrition_json = row.get('nutrition_100g', '{}')

            try:
                # Handle double-escaped quotes in TSV
                nutrition_json = nutrition_json.replace('""', '"')
                nutrition_data = json.loads(nutrition_json)
                nutrition_keys.update(nutrition_data.keys())
            except (json.JSONDecodeError, ValueError) as e:
                if rows_processed <= 5:  # Only warn for first few errors
                    print(
                        f"Warning: Could not parse nutrition_100g in row {rows_processed}: {e}")

            if rows_processed % 10000 == 0:
                print(f"  Scanned {rows_processed:,} rows...", end='\r')

    # Sort nutrition keys for consistent column order
    sorted_nutrition_keys = sorted(nutrition_keys)
    print(f"\nFound {len(sorted_nutrition_keys)} unique nutrition keys")

    # Define column order: base columns first, then nutrition columns
    base_columns = ['id', 'name']
    all_columns = base_columns + sorted_nutrition_keys

    print(f"Total columns: {len(all_columns)}")
    print(f"  Base columns: {len(base_columns)}")
    print(f"  Nutrition columns: {len(sorted_nutrition_keys)}")

    # Second pass: write expanded data
    print("\nExpanding and writing data...")
    rows_written = 0

    with open(input_path, 'r', encoding='utf-8') as infile, \
            open(output_path, 'w', encoding='utf-8', newline='') as outfile:

        reader = csv.DictReader(infile, delimiter='\t')
        writer = csv.DictWriter(
            outfile, fieldnames=all_columns, delimiter='\t')
        writer.writeheader()

        for row in reader:
            rows_written += 1

            # Start with base columns
            expanded_row = {
                'id': row.get('id', ''),
                'name': row.get('name', '')
            }

            # Parse and expand nutrition_100g
            nutrition_json = row.get('nutrition_100g', '{}')
            try:
                nutrition_json = nutrition_json.replace('""', '"')
                nutrition_data = json.loads(nutrition_json)

                # Add each nutrition value as a separate column
                for key in sorted_nutrition_keys:
                    expanded_row[key] = nutrition_data.get(key, '')
            except (json.JSONDecodeError, ValueError):
                # If parsing fails, set all nutrition columns to empty
                for key in sorted_nutrition_keys:
                    expanded_row[key] = ''

            writer.writerow(expanded_row)

            if rows_written % 10000 == 0:
                print(f"  Processed {rows_written:,} rows...", end='\r')

    print(f"\n✓ Successfully processed {rows_written:,} rows")
    print(f"✓ Written to {output_path}")
    print(f"✓ File size: {output_path.stat().st_size / (1024*1024):.2f} MB")
    print(f"✓ Total columns: {len(all_columns)}")


if __name__ == "__main__":
    # Default input file path
    default_input = Path(__file__).parent / "assets" / \
        "opennutrition_foods_cleaned.tsv"

    # Allow command line argument for input file, or use default
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        input_file = str(default_input)

    # Optional output file as second argument
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    expand_nutrition_columns(input_file, output_file)
