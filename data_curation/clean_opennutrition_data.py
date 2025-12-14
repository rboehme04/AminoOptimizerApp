#!/usr/bin/env python3
"""
Script to clean opennutrition_foods.tsv by keeping only specific columns:
id, name, nutrition_100g
"""

import csv
import sys
from pathlib import Path


def clean_tsv_file(input_file, output_file=None):
    """
    Clean TSV file by keeping only specified columns: id, name, nutrition_100g.

    Args:
        input_file: Path to input TSV file
        output_file: Path to output TSV file (default: input_file with '_cleaned' suffix)
    """
    input_path = Path(input_file)

    if not input_path.exists():
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    if output_file is None:
        # Create output filename by adding '_cleaned' before extension
        output_path = input_path.parent / \
            f"{input_path.stem}_cleaned{input_path.suffix}"
    else:
        output_path = Path(output_file)

    # Columns to keep
    required_columns = ['id', 'name', 'nutrition_100g']

    print(f"Reading from: {input_path}")
    print(f"Writing to: {output_path}")
    print(f"Keeping columns: {', '.join(required_columns)}")

    rows_processed = 0
    rows_written = 0

    try:
        with open(input_path, 'r', encoding='utf-8') as infile, \
                open(output_path, 'w', encoding='utf-8', newline='') as outfile:

            reader = csv.DictReader(infile, delimiter='\t')

            # Verify all required columns exist
            available_columns = reader.fieldnames
            missing_columns = [
                col for col in required_columns if col not in available_columns]

            if missing_columns:
                print(
                    f"Error: Required columns not found: {', '.join(missing_columns)}")
                print(f"Available columns: {', '.join(available_columns)}")
                sys.exit(1)

            # Create writer with only required columns
            writer = csv.DictWriter(outfile, fieldnames=required_columns, delimiter='\t',
                                    extrasaction='ignore')
            writer.writeheader()

            # Process rows
            for row in reader:
                rows_processed += 1

                # Write only the required columns
                filtered_row = {col: row[col] for col in required_columns}
                writer.writerow(filtered_row)
                rows_written += 1

                # Progress indicator for large files
                if rows_processed % 10000 == 0:
                    print(f"Processed {rows_processed:,} rows...", end='\r')

        print(f"\n✓ Successfully processed {rows_processed:,} rows")
        print(f"✓ Written {rows_written:,} rows to {output_path}")
        print(
            f"✓ File size: {output_path.stat().st_size / (1024*1024):.2f} MB")

    except Exception as e:
        print(f"Error processing file: {e}")
        sys.exit(1)


if __name__ == "__main__":
    # Default input file path
    default_input = Path(__file__).parent / "assets" / \
        "opennutrition_foods.tsv"

    # Allow command line argument for input file, or use default
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        input_file = str(default_input)

    # Optional output file as second argument
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    clean_tsv_file(input_file, output_file)
