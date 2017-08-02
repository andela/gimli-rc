import React, { Component, PropTypes} from "react";
import { EditContainer } from "/imports/plugins/core/ui/client/containers";
import { Divider, Translation } from "/imports/plugins/core/ui/client/components";
import { ChildVariant } from "./";

class VariantList extends Component {

  componentDidMount = () => {
    if ($("body").find((".owl-carousel")).length > 0) {
      $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
      });
    }
  }

  handleVariantEditClick = (event, editButtonProps) => {
    if (this.props.onEditVariant) {
      return this.props.onEditVariant(event, editButtonProps.data);
    }
    return true;
  }

  handleVariantVisibilityClick = (event, editButtonProps) => {
    if (this.props.onVariantVisibiltyToggle) {
      const isVariantVisible = !editButtonProps.data.isVisible;
      this.props.onVariantVisibiltyToggle(event, editButtonProps.data, isVariantVisible);
    }
  }

  handleChildleVariantClick = (event, variant) => {
    if (this.props.onVariantClick) {
      this.props.onVariantClick(event, variant, 1);
    }
  }

  handleChildVariantEditClick = (event, editButtonProps) => {
    if (this.props.onEditVariant) {
      return this.props.onEditVariant(event, editButtonProps.data, 1);
    }
    return true;
  }

  isSoldOut(variant) {
    if (this.props.isSoldOut) {
      return this.props.isSoldOut(variant);
    }

    return false;
  }

  renderVariants() {
    if (this.props.variants) {
      return this.props.variants.map((variant, index) => {
        return (
          <EditContainer
            data={variant}
            disabled={this.props.editable === false}
            editView="variantForm"
            i18nKeyLabel="productDetailEdit.editVariant"
            key={index}
            label={<span>Click to add price and variants </span>}
            onEditButtonClick={this.handleVariantEditClick}
            onVisibilityButtonClick={this.handleVariantVisibilityClick}
            permissions={["createProduct"]}
            showsVisibilityButton={true}
          />
        );
      });
    }

    return (
      <li>
        <a href="#" id="create-variant">
          {"+"} <Translation defaultValue="Create Variant" i18nKey="variantList.createVariant" />
        </a>
      </li>
    );
  }

  renderChildVariants() {
    if (this.props.childVariants) {
      return this.props.childVariants.map((childVariant, index) => {
        const media = this.props.childVariantMedia.filter((mediaItem) => {
          if (mediaItem.metadata.variantId === childVariant._id) {
            return true;
          }
          return false;
        });

        return (
          <EditContainer
            data={childVariant}
            disabled={this.props.editable === false}
            editView="variantForm"
            i18nKeyLabel="productDetailEdit.editVariant"
            key={index}
            label="Edit Variant"
            onEditButtonClick={this.handleChildVariantEditClick}
            onVisibilityButtonClick={this.handleVariantVisibilityClick}
            permissions={["createProduct"]}
            showsVisibilityButton={true}
          >
            <ChildVariant
              isSelected={this.props.variantIsSelected(childVariant._id)}
              media={media}
              onClick={this.handleChildleVariantClick}
              variant={childVariant}
            />
          </EditContainer>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <div className="product-variants">
        {/** <Divider
          i18nKeyLabel="productDetail.options"
          label="Options"
        /> **/}
        <Divider
          i18nKeyLabel="productDetail.availableOptions"
          label="Available Options"
        />
        <div className="row variant-product-options">
          <ul className="variant-list list-unstyled" id="variant-list">
            <span style={{float: "right"}}>{this.renderVariants()}</span>
          </ul>
          <div className="owl-carousel">
            {this.renderChildVariants()}
          </div>
        </div>
      </div>
    );
  }
}

VariantList.propTypes = {
  childVariantMedia: PropTypes.arrayOf(PropTypes.any),
  childVariants: PropTypes.arrayOf(PropTypes.object),
  displayPrice: PropTypes.func,
  editable: PropTypes.bool,
  isSoldOut: PropTypes.func,
  onEditVariant: PropTypes.func,
  onMoveVariant: PropTypes.func,
  onVariantClick: PropTypes.func,
  onVariantVisibiltyToggle: PropTypes.func,
  variantIsSelected: PropTypes.func,
  variants: PropTypes.arrayOf(PropTypes.object)
};

export default VariantList;
